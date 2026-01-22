#!/bin/bash
# =============================================================================
# Verify Release Sync
# =============================================================================
# This script verifies that git tags and package.json are in sync.
# Can be run in CI to catch mismatches before they become problems.
# =============================================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

echo "🔍 Release Sync Verification"
echo "============================"
echo ""

# Get package.json version
PKG_VERSION=$(node -p "require('./package.json').version")
echo "📦 Package.json version: $PKG_VERSION"

# Get latest git tag
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
echo "🏷️  Latest git tag:       $LATEST_TAG"

# Extract version from tag
if [ -n "$LATEST_TAG" ]; then
    TAG_VERSION="${LATEST_TAG#v}"
    echo "   Tag version:          $TAG_VERSION"
else
    TAG_VERSION=""
    echo "   Tag version:          (no tags)"
fi

echo ""

# Check sync
if [ "$PKG_VERSION" = "$TAG_VERSION" ]; then
    echo "✅ SYNC OK: Package version matches latest tag"
    exit 0
else
    echo "❌ SYNC MISMATCH!"
    echo ""
    echo "   Expected tag: v$PKG_VERSION"
    echo "   Actual tag:   $LATEST_TAG"
    echo ""
    echo "   This indicates a release workflow issue."
    echo "   Run 'bun test src/__tests__/release-sync.test.ts' for details."
    exit 1
fi
