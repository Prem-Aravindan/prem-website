#!/bin/bash
# Build and deploy script for GitHub Pages using docs folder

echo "🔨 Building project..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not created"
    exit 1
fi

echo "📦 Copying dist to docs..."
rm -rf docs
cp -r dist docs

echo "✅ Build complete!"
echo "📝 Next steps:"
echo "   git add docs"
echo "   git commit -m 'Deploy updated site'"
echo "   git push origin main"
