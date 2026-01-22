#!/bin/bash
# =============================================================================
# Delete All GitHub Package Versions
# =============================================================================
# This script removes ALL versions of the npm package from GitHub Packages.
# Requires: gh CLI authenticated with delete:packages scope
# USE WITH CAUTION - This is destructive and irreversible!
# =============================================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

# Package info
PACKAGE_NAME="profile-contracts"
ORG="octopus-synapse"

echo "📦 GitHub Package Cleanup Script"
echo "================================="
echo ""
echo "Package: @${ORG}/${PACKAGE_NAME}"
echo ""

# Check gh CLI
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed"
    echo "   Install with: brew install gh"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub CLI"
    echo "   Run: gh auth login"
    exit 1
fi

# Get all package versions
echo "🔍 Fetching package versions..."
VERSIONS=$(gh api \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "/orgs/${ORG}/packages/npm/${PACKAGE_NAME}/versions" \
    --jq '.[].id' 2>/dev/null || echo "")

if [ -z "$VERSIONS" ]; then
    echo "✅ No package versions found. Nothing to delete."
    exit 0
fi

# Count versions
VERSION_COUNT=$(echo "$VERSIONS" | wc -l)
echo "Found $VERSION_COUNT package versions to delete."
echo ""

# Get version details
echo "📋 Version details:"
gh api \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "/orgs/${ORG}/packages/npm/${PACKAGE_NAME}/versions" \
    --jq '.[] | "   \(.name) (ID: \(.id))"' 2>/dev/null || true
echo ""

# Confirmation
if [ "$1" != "--force" ] && [ "$1" != "-f" ]; then
    echo "⚠️  WARNING: This will delete ALL package versions from GitHub Packages!"
    echo "   This action is IRREVERSIBLE!"
    echo ""
    read -p "Type 'DELETE ALL PACKAGES' to confirm: " CONFIRM
    if [ "$CONFIRM" != "DELETE ALL PACKAGES" ]; then
        echo "❌ Aborted."
        exit 1
    fi
fi

echo ""
echo "🗑️  Deleting package versions..."

for VERSION_ID in $VERSIONS; do
    echo "   Deleting version ID: $VERSION_ID"
    gh api \
        --method DELETE \
        -H "Accept: application/vnd.github+json" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        "/orgs/${ORG}/packages/npm/${PACKAGE_NAME}/versions/${VERSION_ID}" \
        2>/dev/null || echo "      (failed to delete, may need admin access)"
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📋 Remaining versions:"
REMAINING=$(gh api \
    -H "Accept: application/vnd.github+json" \
    "/orgs/${ORG}/packages/npm/${PACKAGE_NAME}/versions" \
    --jq '.[].name' 2>/dev/null || echo "(none)")
if [ -z "$REMAINING" ]; then
    echo "   (none)"
else
    echo "$REMAINING"
fi
