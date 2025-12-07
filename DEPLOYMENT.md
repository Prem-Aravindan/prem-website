# GitHub Pages Deployment Guide

This repository is configured for automatic deployment to GitHub Pages.

## ✅ Pre-Deployment Checklist

- [x] Vite configured with GitHub Pages base path
- [x] GitHub Actions workflow set up for automatic builds
- [x] Build outputs optimized for production
- [x] All dependencies installed and locked

## 🚀 Deployment Steps

### 1. Repository Setup (One-time)

1. **Go to your repository settings:**
   - Navigate to `Settings` → `Pages`
   - Under "Build and deployment"
   - Select **Deploy from a branch** or **GitHub Actions**
   - Choose branch: **main**

2. **Enable GitHub Pages:**
   - Ensure the repository is public (or upgrade to GitHub Pro for private repos with Pages)

### 2. Push to Main Branch

Once configured, simply push to `main` branch:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

### 3. Automatic Deployment

The GitHub Actions workflow will:
1. Detect the push to `main`
2. Install dependencies (`npm ci`)
3. Build the project (`npm run build`)
4. Deploy to GitHub Pages

### 4. Access Your Site

Your site will be available at:
```
https://Prem-Aravindan.github.io/prem-website/
```

## 🔧 Custom Domain Setup (Optional)

If you want to use a custom domain:

### Option 1: Using CNAME Record

1. In repository **Settings** → **Pages**
2. Under "Custom domain", enter your domain (e.g., `prem-portfolio.com`)
3. Add DNS records to your domain provider:
   - Type: `CNAME`
   - Name: `www` (or subdomain)
   - Value: `Prem-Aravindan.github.io`

4. Point root domain to GitHub Pages:
   - Type: `A` records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

5. Enable "Enforce HTTPS" in Settings → Pages

### Option 2: Subdomain (Recommended)

If using `prem.yourdomain.com`:
- Type: `CNAME`
- Name: `prem`
- Value: `Prem-Aravindan.github.io`

## 📊 Monitor Deployments

1. Go to your repository
2. Click **Actions** tab
3. See deployment status and logs
4. Check for any build errors

## 🔄 Manual Build & Preview

To test locally before pushing:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build
npm run preview
```

## 📁 Build Output

The production build is output to the `dist/` directory, which is automatically deployed by GitHub Actions.

## 🛠️ Troubleshooting

### Build Fails
- Check the Actions tab for error messages
- Ensure all dependencies are correct in `package.json`
- Run `npm run build` locally to debug

### Site Shows Blank Page
- Verify the base path in `vite.config.ts` is correct
- Clear browser cache
- Check browser console for errors

### Custom Domain Not Working
- DNS changes can take 24-48 hours to propagate
- Verify CNAME record is correctly set
- In Settings → Pages, ensure custom domain is verified

## 📝 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Status:** ✅ Ready for GitHub Pages deployment
