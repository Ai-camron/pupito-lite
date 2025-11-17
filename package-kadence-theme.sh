#!/bin/bash
# Script to package the Kadence child theme for WordPress distribution
# Usage: ./package-kadence-theme.sh

set -e

THEME_DIR="child/kadence-child"
OUTPUT_DIR="dist"
THEME_NAME="pupito-kadence-child"
VERSION=$(grep "Version:" "$THEME_DIR/style.css" | sed 's/.*Version: *//' | tr -d '[:space:]')
OUTPUT_FILE="$OUTPUT_DIR/${THEME_NAME}-${VERSION}.zip"

echo "📦 Packaging Pupito Kadence Child Theme v${VERSION}..."

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Remove old package if it exists
if [ -f "$OUTPUT_FILE" ]; then
    echo "🗑️  Removing old package..."
    rm "$OUTPUT_FILE"
fi

# Create ZIP package
echo "🔨 Creating ZIP archive..."
cd "$(dirname "$THEME_DIR")"
zip -r "../$OUTPUT_FILE" "$(basename "$THEME_DIR")" \
    -x "*.git*" "*.DS_Store" "*Thumbs.db" \
    > /dev/null

cd - > /dev/null

# Get file size
FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)

echo "✅ Theme packaged successfully!"
echo "📍 Location: $OUTPUT_FILE"
echo "📊 Size: $FILE_SIZE"
echo ""
echo "Next steps:"
echo "1. Test the package by uploading to a WordPress test site"
echo "2. Navigate to Appearance → Themes → Add New → Upload Theme"
echo "3. Upload $OUTPUT_FILE"
echo "4. Activate the theme and import content from content/pupito-kadence-pages.xml"
