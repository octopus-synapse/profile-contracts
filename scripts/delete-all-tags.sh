#!/bin/bash
# =============================================================================
# Delete All Git Tags (Local and Remote)
# =============================================================================
# This script removes ALL version tags from the repository.
# USE WITH CAUTION - This is destructive and irreversible!
# =============================================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

echo "🏷️  Git Tag Cleanup Script"
echo "=========================="
echo ""

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Get all tags
TAGS=$(git tag -l 'v*')

if [ -z "$TAGS" ]; then
    echo "✅ No version tags found. Nothing to delete."
    exit 0
fi

# Count tags
TAG_COUNT=$(echo "$TAGS" | wc -l)
echo "Found $TAG_COUNT tags to delete:"
echo "$TAGS" | head -20
if [ "$TAG_COUNT" -gt 20 ]; then
    echo "... and $(($TAG_COUNT - 20)) more"
fi
echo ""

# Confirmation
if [ "$1" != "--force" ] && [ "$1" != "-f" ]; then
    echo "⚠️  WARNING: This will delete ALL tags locally AND remotely!"
    echo ""
    read -p "Type 'DELETE ALL TAGS' to confirm: " CONFIRM
    if [ "$CONFIRM" != "DELETE ALL TAGS" ]; then
        echo "❌ Aborted."
        exit 1
    fi
fi

echo ""
echo "🗑️  Deleting tags..."

# Delete remote tags first
echo "📡 Deleting remote tags..."
for TAG in $TAGS; do
    echo "   Deleting remote: $TAG"
    git push origin --delete "$TAG" 2>/dev/null || echo "      (already deleted or not on remote)"
done

# Delete local tags
echo "💻 Deleting local tags..."
for TAG in $TAGS; do
    echo "   Deleting local: $TAG"
    git tag -d "$TAG" 2>/dev/null || true
done

echo ""
echo "✅ All tags deleted!"
echo ""
echo "📋 Remaining tags:"
REMAINING=$(git tag -l)
if [ -z "$REMAINING" ]; then
    echo "   (none)"
else
    echo "$REMAINING"
fi
