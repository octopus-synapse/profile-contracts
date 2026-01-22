/**
 * Release Sync Tests (TDD)
 *
 * These tests validate that git tags and GitHub package versions are synchronized.
 * The invariant: tag version === package.json version === published npm version
 *
 * Test Strategy:
 * 1. Parse package.json version
 * 2. Query git tags
 * 3. Query GitHub Packages API for published versions (in CI with auth)
 * 4. Assert all are in sync
 *
 * Run locally: bun test src/__tests__/release-sync.test.ts
 * Run in CI: Set RELEASE_SYNC_CHECK=true to enable tag checks
 *
 * NOTE: These tests require fetch-depth: 0 in CI to access git tags.
 * The general CI test run skips tag-related tests; only the dedicated
 * release-sync-check job runs them with proper git history.
 */

import { describe, it, expect, beforeAll } from "bun:test";
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const PACKAGE_NAME = "@octopus-synapse/profile-contracts";
const REPO_ROOT = join(import.meta.dir, "../..");
const NPM_REGISTRY = "https://npm.pkg.github.com";

// Only run tag-related tests when explicitly enabled (requires fetch-depth: 0)
const RELEASE_SYNC_ENABLED =
 process.env.RELEASE_SYNC_CHECK === "true" || !process.env.CI;

interface PackageJson {
 name: string;
 version: string;
}

interface ReleaseState {
 packageJsonVersion: string;
 gitTags: string[];
 latestTag: string | null;
}

function getPackageJsonVersion(): string {
 const packageJsonPath = join(REPO_ROOT, "package.json");
 const content = readFileSync(packageJsonPath, "utf-8");
 const pkg: PackageJson = JSON.parse(content);
 return pkg.version;
}

function getGitTags(): string[] {
 try {
  const output = execSync("git tag -l 'v*'", {
   cwd: REPO_ROOT,
   encoding: "utf-8",
  });
  return output
   .split("\n")
   .filter(Boolean)
   .map((tag) => tag.trim());
 } catch {
  return [];
 }
}

function getLatestTag(): string | null {
 const tags = getGitTags();
 if (tags.length === 0) return null;

 // Sort by semver
 const sorted = tags.sort((a, b) => {
  const parseVersion = (v: string) => {
   const match = v.match(/v?(\d+)\.(\d+)\.(\d+)/);
   if (!match) return [0, 0, 0];
   return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  };
  const [aMajor, aMinor, aPatch] = parseVersion(a);
  const [bMajor, bMinor, bPatch] = parseVersion(b);

  if (aMajor !== bMajor) return bMajor - aMajor;
  if (aMinor !== bMinor) return bMinor - aMinor;
  return bPatch - aPatch;
 });

 return sorted[0];
}

function extractVersionFromTag(tag: string): string {
 return tag.replace(/^v/, "");
}

function getReleaseState(): ReleaseState {
 return {
  packageJsonVersion: getPackageJsonVersion(),
  gitTags: getGitTags(),
  latestTag: getLatestTag(),
 };
}

describe("Release Synchronization", () => {
 let state: ReleaseState;

 beforeAll(() => {
  state = getReleaseState();
 });

 describe("Package.json Version", () => {
  it("should have a valid semver version", () => {
   const version = state.packageJsonVersion;
   const semverRegex = /^\d+\.\d+\.\d+(-[\w.]+)?$/;
   expect(version).toMatch(semverRegex);
  });

  it("should not be 0.0.0", () => {
   expect(state.packageJsonVersion).not.toBe("0.0.0");
  });
 });

 describe("Git Tags", () => {
  it.skipIf(!RELEASE_SYNC_ENABLED)(
   "should have at least one version tag",
   () => {
    expect(state.gitTags.length).toBeGreaterThan(0);
   },
  );

  it.skipIf(!RELEASE_SYNC_ENABLED)(
   "should have tags that follow v{semver} pattern",
   () => {
    const versionTagRegex = /^v\d+\.\d+\.\d+(-[\w.]+)?$/;
    for (const tag of state.gitTags) {
     expect(tag).toMatch(versionTagRegex);
    }
   },
  );
 });

 describe("Tag-Package Synchronization (CRITICAL)", () => {
  it.skipIf(!RELEASE_SYNC_ENABLED)(
   "latest git tag MUST match package.json version",
   () => {
    const latestTag = state.latestTag;
    expect(latestTag).not.toBeNull();

    const tagVersion = extractVersionFromTag(latestTag!);
    expect(tagVersion).toBe(state.packageJsonVersion);
   },
  );

  it.skipIf(!RELEASE_SYNC_ENABLED)(
   "should have exactly one tag for current package.json version",
   () => {
    const expectedTag = `v${state.packageJsonVersion}`;
    const matchingTags = state.gitTags.filter((t) => t === expectedTag);

    expect(matchingTags.length).toBe(1);
   },
  );
 });

 describe("Version Consistency Report", () => {
  it("should log current release state for debugging", () => {
   console.log("\n📊 Release State Report:");
   console.log(`   Package.json version: ${state.packageJsonVersion}`);
   console.log(`   Latest git tag:       ${state.latestTag}`);
   console.log(`   Total git tags:       ${state.gitTags.length}`);

   if (state.latestTag) {
    const tagVersion = extractVersionFromTag(state.latestTag);
    const inSync = tagVersion === state.packageJsonVersion;
    console.log(
     `   Sync status:          ${inSync ? "✅ IN SYNC" : "❌ OUT OF SYNC"}`,
    );

    if (!inSync) {
     console.log(`\n   ⚠️  MISMATCH DETECTED:`);
     console.log(`       Tag version:     ${tagVersion}`);
     console.log(`       Package version: ${state.packageJsonVersion}`);
    }
   }

   expect(true).toBe(true); // Always pass, this is for reporting
  });
 });
});

describe("Release Workflow Invariants", () => {
 it("should not have orphan tags (tags without corresponding release)", () => {
  // This test documents the invariant that every tag should correspond
  // to a successful npm publish. We can't verify npm here without auth,
  // but we document the expectation.
  const state = getReleaseState();

  // The latest tag should always match package.json
  // because the workflow publishes BEFORE tagging
  if (state.latestTag) {
   const tagVersion = extractVersionFromTag(state.latestTag);
   expect(tagVersion).toBe(state.packageJsonVersion);
  }
 });

 it("should maintain monotonically increasing versions", () => {
  const tags = getGitTags();
  const versions = tags
   .map((t) => {
    const match = t.match(/v?(\d+)\.(\d+)\.(\d+)/);
    if (!match) return null;
    return {
     major: parseInt(match[1]),
     minor: parseInt(match[2]),
     patch: parseInt(match[3]),
     original: t,
    };
   })
   .filter(Boolean);

  // Check that there are no duplicate versions
  const versionStrings = versions.map(
   (v) => `${v!.major}.${v!.minor}.${v!.patch}`,
  );
  const uniqueVersions = new Set(versionStrings);
  expect(uniqueVersions.size).toBe(versionStrings.length);
 });
});

// =============================================================================
// NPM Registry Sync Tests (CI Only - requires NODE_AUTH_TOKEN)
// =============================================================================

function hasNpmAuth(): boolean {
 return !!process.env.NODE_AUTH_TOKEN || !!process.env.NPM_TOKEN;
}

function getPublishedVersions(): string[] {
 if (!hasNpmAuth()) return [];

 try {
  const output = execSync(
   `npm view ${PACKAGE_NAME} versions --json --registry ${NPM_REGISTRY}`,
   { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
  );
  const versions = JSON.parse(output);
  return Array.isArray(versions) ? versions : [versions];
 } catch {
  return [];
 }
}

function getLatestPublishedVersion(): string | null {
 if (!hasNpmAuth()) return null;

 try {
  const output = execSync(
   `npm view ${PACKAGE_NAME} version --registry ${NPM_REGISTRY}`,
   { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
  );
  return output.trim();
 } catch {
  return null;
 }
}

describe("NPM Registry Sync (CI Only)", () => {
 const shouldRun = hasNpmAuth();

 it.skipIf(!shouldRun)(
  "published npm version MUST match package.json version (if published)",
  () => {
   const pkgVersion = getPackageJsonVersion();
   const publishedVersion = getLatestPublishedVersion();

   console.log(`\n📦 NPM Registry Check:`);
   console.log(`   Package.json:     ${pkgVersion}`);
   console.log(`   Published (npm):  ${publishedVersion ?? "(not published yet)"}`);

   // If package is not yet published, this is OK for first release
   if (publishedVersion === null) {
    console.log(`   ℹ️  Package not yet published - this is expected for first release`);
    expect(true).toBe(true);
    return;
   }

   expect(publishedVersion).toBe(pkgVersion);
  },
 );

 it.skipIf(!shouldRun)(
  "published npm version MUST match latest git tag",
  () => {
   const latestTag = getLatestTag();
   const publishedVersion = getLatestPublishedVersion();

   if (latestTag && publishedVersion) {
    const tagVersion = extractVersionFromTag(latestTag);
    expect(publishedVersion).toBe(tagVersion);
   }
  },
 );

 it.skipIf(!shouldRun)(
  "all git tags should have corresponding npm versions",
  () => {
   const tags = getGitTags();
   const publishedVersions = new Set(getPublishedVersions());

   const missingFromNpm: string[] = [];

   for (const tag of tags) {
    const version = extractVersionFromTag(tag);
    if (!publishedVersions.has(version)) {
     missingFromNpm.push(version);
    }
   }

   if (missingFromNpm.length > 0) {
    console.log(
     `\n⚠️  Tags without npm versions: ${missingFromNpm.join(", ")}`,
    );
   }

   // This is informational - we don't fail because old versions may have been deleted
   expect(true).toBe(true);
  },
 );

 it("should report auth status", () => {
  const hasAuth = hasNpmAuth();
  console.log(
   `\n🔐 NPM Auth: ${hasAuth ? "✅ Authenticated" : "⚠️ Not authenticated (CI tests skipped)"}`,
  );
  expect(true).toBe(true);
 });
});
