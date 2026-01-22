#!/bin/bash
# =============================================================================
# Reset Release to 1.0.0
# =============================================================================
# This script performs a complete release reset:
# 1. Deletes all git tags (local and remote)
# 2. Deletes all GitHub Package versions
# 3. Updates package.json to 1.0.0
# 4. Creates a fresh v1.0.0 tag
# 5. Runs sync tests to verify
# =============================================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

echo "🔄 Release Reset Script"
echo "======================="
echo ""
echo "This script will:"
echo "  1. Delete all git tags"
echo "  2. Delete all GitHub Package versions"
echo "  3. Set package.json version to 1.0.0"
echo "  4. Create v1.0.0 tag"
echo "  5. Verify sync"
echo ""

# Confirmation
if [ "$1" != "--force" ] && [ "$1" != "-f" ]; then
    echo "⚠️  WARNING: This is a destructive operation!"
    echo ""
    read -p "Type 'RESET TO 1.0.0' to confirm: " CONFIRM
    if [ "$CONFIRM" != "RESET TO 1.0.0" ]; then
        echo "❌ Aborted."
        exit 1
    fi
fi

echo ""

# Step 1: Delete all tags
echo "📍 Step 1: Deleting all git tags..."
bash "$REPO_DIR/scripts/delete-all-tags.sh" --force
echo ""

# Step 2: Delete all package versions
echo "📍 Step 2: Deleting all GitHub Package versions..."
bash "$REPO_DIR/scripts/delete-all-packages.sh" --force
echo ""

# Step 3: Update package.json
echo "📍 Step 3: Updating package.json to 1.0.0..."
# Use node to update version to avoid sed issues
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '1.0.0';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('   Updated package.json version to 1.0.0');
"

# Step 4: Commit version change if needed
if ! git diff --quiet package.json; then
    echo "📍 Step 4: Committing version change..."
    git add package.json
    git commit -m "chore: reset version to 1.0.0

This resets the package version after cleaning up inconsistent
release tags and package versions.

BREAKING CHANGE: Version reset to 1.0.0"
fi

# Step 5: Create v1.0.0 tag
echo "📍 Step 5: Creating v1.0.0 tag..."
git tag -a "v1.0.0" -m "Release 1.0.0 - Fresh start"
echo "   Created tag v1.0.0"

# Step 6: Push changes
echo "📍 Step 6: Pushing changes..."
git push origin main --tags
echo "   Pushed to origin"

# Step 7: Run sync tests
echo ""
echo "📍 Step 7: Running release sync tests..."
bun test src/__tests__/release-sync.test.ts

echo ""
echo "✅ Reset complete!"
echo ""
echo "📋 Summary:"
echo "   Package version: 1.0.0"
echo "   Git tag: v1.0.0"
echo ""
echo "⚠️  Note: The GitHub Actions workflow will trigger and publish"
echo "   the package to GitHub Packages. Monitor the Actions tab."
