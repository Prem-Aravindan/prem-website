# Hosting Guide for Prem Portfolio Website

This guide provides various options for hosting your portfolio website, including free and paid solutions.

## Table of Contents
- [Quick Start](#quick-start)
- [Free Hosting Options](#free-hosting-options)
- [Docker Deployment](#docker-deployment)
- [Domain Configuration](#domain-configuration)
- [CI/CD Setup](#cicd-setup)

## Quick Start

### Build the Project

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment.

## Free Hosting Options

### 1. Vercel (Recommended)

**Best for:** Fast deployment, automatic HTTPS, global CDN

**Steps:**
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite configuration
5. Click "Deploy"

**Custom Domain:**
```bash
# Add your domain in Vercel dashboard
# Point your domain DNS to Vercel:
# Type: CNAME
# Name: www
# Value: cname.vercel-dns.com
```

**Estimated Time:** 5 minutes

---

### 2. Netlify

**Best for:** Easy drag-and-drop deployment, form handling

**Steps:**
1. Build your project: `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag and drop the `dist/` folder
4. Or connect your GitHub repository for automatic deployments

**Configuration:**
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Custom Domain:**
- Add domain in Netlify dashboard
- Update DNS records as provided

**Estimated Time:** 5 minutes

---

### 3. GitHub Pages

**Best for:** Free hosting with GitHub integration

**Steps:**
1. Install gh-pages: `npm install -D gh-pages`
2. Update `package.json`:
```json
{
  "homepage": "https://prem-aravindan.github.io/prem-website",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/prem-website/',
  plugins: [react()],
})
```
4. Deploy: `npm run deploy`

**Custom Domain:**
- Add `CNAME` file in `public/` folder with your domain
- Configure DNS with GitHub Pages IPs

**Estimated Time:** 10 minutes

---

### 4. Cloudflare Pages

**Best for:** Fast global CDN, DDoS protection

**Steps:**
1. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy

**Custom Domain:**
- Transfer domain to Cloudflare (optional)
- Or configure DNS to point to Cloudflare Pages

**Estimated Time:** 5 minutes

---

### 5. Render

**Best for:** Full-stack apps, free tier with good performance

**Steps:**
1. Visit [render.com](https://render.com)
2. Create a new Static Site
3. Connect your repository
4. Build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Deploy

**Custom Domain:**
- Add domain in Render dashboard
- Update DNS as instructed

**Estimated Time:** 5 minutes

---

## Docker Deployment

### Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
}
```

### Build and Run Docker Container

```bash
# Build the image
docker build -t prem-portfolio .

# Run the container
docker run -d -p 80:80 --name portfolio prem-portfolio

# Access at http://localhost
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    container_name: prem-portfolio
```

Run with:
```bash
docker-compose up -d
```

---

## Free Docker Hosting Options

### 1. Railway

**Steps:**
1. Visit [railway.app](https://railway.app)
2. Connect GitHub repository
3. Railway auto-detects Dockerfile
4. Deploy

**Free Tier:** 500 hours/month, $5 credit

---

### 2. Fly.io

**Steps:**
1. Install flyctl: `curl -L https://fly.io/install.sh | sh`
2. Login: `flyctl auth login`
3. Launch: `flyctl launch`
4. Deploy: `flyctl deploy`

**Configuration:** Create `fly.toml`:
```toml
app = "prem-portfolio"

[build]
  dockerfile = "Dockerfile"

[[services]]
  internal_port = 80
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

**Free Tier:** 3 VMs, 3GB storage

---

### 3. Google Cloud Run

**Steps:**
1. Install gcloud CLI
2. Build: `gcloud builds submit --tag gcr.io/PROJECT-ID/portfolio`
3. Deploy: `gcloud run deploy --image gcr.io/PROJECT-ID/portfolio --platform managed`

**Free Tier:** 2 million requests/month

---

## Domain Configuration

### For www.prem-portfolio.com

#### DNS Configuration

**A Record (Apex Domain):**
```
Type: A
Name: @
Value: [Your hosting provider's IP]
TTL: 3600
```

**CNAME Record (www subdomain):**
```
Type: CNAME
Name: www
Value: [Your hosting provider's domain]
TTL: 3600
```

#### SSL/HTTPS

Most modern hosting providers (Vercel, Netlify, Cloudflare) provide automatic HTTPS with Let's Encrypt certificates.

For Docker/VPS deployments, use Certbot:

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d prem-portfolio.com -d www.prem-portfolio.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Performance Optimization

### 1. Enable Compression

Already configured in nginx for Docker deployments. For other platforms, it's typically enabled by default.

### 2. Optimize Images

```bash
# Install sharp for image optimization
npm install -D vite-plugin-imagemin
```

### 3. Code Splitting

Vite automatically handles code splitting. Ensure dynamic imports for heavy components:

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

---

## Monitoring and Analytics

### Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Cost Comparison

| Platform | Free Tier | Best For | Setup Time |
|----------|-----------|----------|------------|
| Vercel | Unlimited | Static sites | 5 min |
| Netlify | 100GB bandwidth | Forms & functions | 5 min |
| GitHub Pages | 1GB storage | GitHub users | 10 min |
| Cloudflare Pages | Unlimited requests | CDN & security | 5 min |
| Render | 750 hours | Full-stack | 5 min |
| Railway | $5 credit | Docker apps | 10 min |
| Fly.io | 3 VMs | Global deployment | 15 min |

---

## Recommended Setup

**Best Option for Beginners:**
1. **Vercel** - Easiest deployment, great performance
2. Connect GitHub repository
3. Configure custom domain
4. Automatic HTTPS and global CDN

**Best Option for Advanced Users:**
1. **Docker + Fly.io** - Full control, containerization
2. Build Docker image
3. Deploy to Fly.io
4. Configure domain and SSL

---

## Troubleshooting

### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues

Ensure your hosting platform handles SPA routing:
- Add redirects configuration
- Configure server to serve `index.html` for all routes

### Environment Variables

For production builds, create `.env.production`:

```
VITE_API_URL=https://api.prem-portfolio.com
VITE_ANALYTICS_ID=your-analytics-id
```

---

## Support

For issues or questions:
- Email: contact@prem-portfolio.com
- GitHub: [github.com/Prem-Aravindan/prem-website](https://github.com/Prem-Aravindan/prem-website)

---

**Last Updated:** December 2025
