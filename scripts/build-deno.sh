#!/bin/bash
# Deno Deploy Build Script
# Simplified build that avoids the monorepo CLI and tsx

echo "🔧 Building for Deno Deploy..."

# Step 1: Copy website to api/public
echo "  [1/1] Copying website files..."
mkdir -p packages/api/public
cp -r packages/website/* packages/api/public/

echo "✅ Build complete!"
