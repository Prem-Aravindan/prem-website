# GitHub Pages Deployment Guide (Docs Folder Method)

This repository uses the **docs folder method** for GitHub Pages deployment - the simplest and most straightforward approach.

## ✅ Setup Status

- [x] Built project output committed to `docs/` folder
- [x] GitHub Pages configured to use `docs/` folder
- [x] All production files optimized and ready
- [x] Build script included for easy updates

## 🚀 How It Works

Instead of using GitHub Actions or relying on branch builds, the production-ready files are committed directly to a `docs/` folder in the repository. GitHub Pages automatically serves these static files.

**Structure:**
```
prem-website/
  ├── docs/                    ← GitHub Pages serves from here
  │   ├── index.html
  │   ├── assets/
  │   │   ├── index-xxx.js
  │   │   ├── index-xxx.css
  │   │   └── ...
  │   └── vite.svg
  ├── src/                     ← Source code
  ├── public/
  ├── package.json
  └── ...
```

## 📋 Repository Setup (One-time)

1. **Go to repository Settings:**
   - Navigate to `Settings` → `Pages`
   
2. **Configure GitHub Pages:**
   - Under "Build and deployment"
   - Select **"Deploy from a branch"** (not Actions)
   - Choose branch: **main**
   - Choose folder: **docs** (or /docs)
   - Click "Save"

3. **Wait for deployment:**
   - GitHub will deploy automatically
   - Your site will be live at: `https://Prem-Aravindan.github.io/prem-website/`

## 🔄 Deploying Updates

### Method 1: Using the Build Script (Recommended)

```bash
# Run the build and deploy script
bash build-and-deploy.sh

# Then commit and push
git add docs
git commit -m "Deploy updated site"
git push origin main
```

### Method 2: Manual Build

```bash
# Build the project
npm run build

# Copy dist to docs
cp -r dist/* docs/

# Commit and push
git add docs
git commit -m "Deploy: update site"
git push origin main
```

### Method 3: PowerShell (Windows)

```powershell
# Build the project
npm run build

# Copy dist to docs
Copy-Item -Path .\dist\* -Destination .\docs -Recurse -Force

# Commit and push
git add docs
git commit -m "Deploy: update site"
git push origin main
```

## 📊 Workflow Summary

1. Make changes to source code (`src/` folder)
2. Run `npm run build` (or use the script above)
3. Verify `docs/` folder is updated with latest build
4. Commit changes: `git add docs && git commit -m "Deploy: description"`
5. Push to GitHub: `git push origin main`
6. GitHub automatically serves the files from `docs/` folder
7. Site updates at: `https://Prem-Aravindan.github.io/prem-website/`

## ✨ Benefits of Docs Folder Method

✅ **Simple** - No complex CI/CD setup needed
✅ **Reliable** - Direct file serving, no build surprises
✅ **Fast** - Files deployed instantly
✅ **Control** - You decide exactly what gets deployed
✅ **Backup** - Build artifacts versioned in git

## 🔧 Custom Domain Setup (Optional)

If you want to use your own domain:

1. In repository **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Add DNS records to your domain provider:

**For root domain** (example.com):
- Type: `A` records pointing to:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

**For subdomain** (prem.example.com):
- Type: `CNAME`
- Name: `prem`
- Value: `Prem-Aravindan.github.io`

4. Enable "Enforce HTTPS" in Settings → Pages

## 🐛 Troubleshooting

### Site shows old content
- Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- GitHub Pages can take a few seconds to refresh
- Check that `docs/` folder has the latest files

### Build fails locally
```bash
npm install        # Make sure dependencies are installed
npm run build      # Check for errors in output
npm run preview    # Preview the build locally
```

### Site is blank or 404
- Verify `docs/index.html` exists
- Check GitHub Pages settings point to `docs` folder
- Check browser console for errors (F12)

### Changes not deploying
- Verify files are in `docs/` folder
- Check commit includes `docs/` changes
- Push was successful (`git push origin main`)

## 📁 Ignoring dist Folder

The `.gitignore` is configured to ignore the `dist/` folder:
```
dist
```

This means:
- `dist/` is created locally but not committed
- Only `docs/` is committed (the deployed version)
- Keeps repository lean while maintaining backup of built files

## 📝 Build Output Information

After running `npm run build`:

```
dist/
├── index.html (2.3 KB)
├── assets/
│   ├── index-B9_Wi6k2.js (3.6 MB minified)
│   ├── index-DmOrQges.css (56 KB)
│   ├── [project images] (various sizes)
│   └── vite.svg
```

All files are minified and optimized for production.

## 🔄 Staying Updated

When you need to update the site:

1. Make changes to the source code
2. Test locally with `npm run preview`
3. Run build script (or manual build commands)
4. Push to GitHub
5. Done! Site updates automatically

---

**Status:** ✅ Ready for GitHub Pages deployment via docs folder
**Last Updated:** December 7, 2025

