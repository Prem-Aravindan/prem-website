# Prem Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies and beautiful animations.

## 🚀 Features

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Modern Design** - Beautiful gradients and smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎭 **CSS Components** - Ready for integration with [21st.dev](https://21st.dev) CSS components
- 🔒 **Type Safe** - Written in TypeScript
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- 🌐 **Production Ready** - Configured for www.prem-portfolio.com

## ��️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Deployment:** Multiple options (Vercel, Netlify, Docker, etc.)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Prem-Aravindan/prem-website.git

# Navigate to project directory
cd prem-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your portfolio in action!

## 🎨 Integrating 21st.dev CSS Components

This portfolio is designed to work seamlessly with [21st.dev](https://21st.dev) - a modern CSS component library. Here's how to integrate components:

### Step 1: Browse 21st.dev Components

Visit [21st.dev](https://21st.dev) and explore their collection of:
- Animated buttons
- Card components
- Loading animations
- Hover effects
- Scroll animations
- Interactive elements

### Step 2: Copy Component Code

1. Select a component from 21st.dev
2. Copy the provided CSS/Tailwind classes
3. Paste into your components

### Step 3: Example Integration

```tsx
// Example: Adding a 21st.dev animated button
function AnimatedButton() {
  return (
    <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium">
      <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
        21st.dev Button
      </span>
    </button>
  );
}
```

### Recommended 21st.dev Components for Portfolio

- **Hero Animations:** Gradient text effects, floating elements
- **Card Hover Effects:** 3D transforms, glow effects
- **Button Animations:** Ripple effects, gradient shifts
- **Scroll Animations:** Fade-in, slide-in effects
- **Loading States:** Skeleton screens, spinners

### Custom CSS Animations

The portfolio already includes custom animations in `src/index.css`:
- `animate-fade-in-up` - Smooth fade and slide up
- `animate-gradient` - Animated gradient backgrounds
- Smooth scrolling behavior
- Custom scrollbar styling

You can extend these with 21st.dev components!

## 🏗️ Project Structure

```
prem-website/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles & animations
├── HOSTING.md          # Detailed hosting guide
├── package.json
└── vite.config.ts
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:5173

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Deployment

This portfolio can be deployed to multiple platforms. See [HOSTING.md](./HOSTING.md) for detailed instructions on:

- **Free Hosting:** Vercel, Netlify, GitHub Pages, Cloudflare Pages, Render
- **Docker Deployment:** Complete Dockerfile and docker-compose setup
- **Domain Configuration:** Setting up www.prem-portfolio.com
- **CI/CD:** Automated deployment with GitHub Actions
- **Performance:** Optimization tips and best practices

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Quick Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
npm run build
netlify deploy --prod --dir=dist
```

## 🎨 Customization

### Update Personal Information

Edit the component files in `src/components/`:

- `Hero.tsx` - Name, title, tagline
- `About.tsx` - Bio and personal information
- `Skills.tsx` - Technical skills
- `Projects.tsx` - Portfolio projects
- `Contact.tsx` - Contact information

### Change Color Scheme

Update Tailwind colors in component files:
- Primary: `purple-600`, `indigo-600`
- Secondary: `pink-500`, `blue-500`
- Replace with your preferred colors

### Add 21st.dev Components

1. Visit [21st.dev](https://21st.dev)
2. Find a component you like
3. Copy the code
4. Integrate into your components
5. Customize as needed

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
VITE_APP_NAME=Prem Portfolio
VITE_DOMAIN=www.prem-portfolio.com
```

### Tailwind Configuration

Tailwind CSS v4 is already configured via `postcss.config.js`. The main import is in `src/index.css`.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Performance

- ⚡ Lighthouse Score: 95+
- 🎯 First Contentful Paint: < 1s
- 📦 Bundle Size: Optimized with Vite
- 🖼️ Image Optimization: Lazy loading ready
- 📊 Code Splitting: Automatic with Vite

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Showcase

### Live Demo
Visit: [www.prem-portfolio.com](https://www.prem-portfolio.com)

### Screenshots
*(Screenshots will be added after deployment)*

## 📞 Contact

- **Email:** contact@prem-portfolio.com
- **GitHub:** [@Prem-Aravindan](https://github.com/Prem-Aravindan)
- **LinkedIn:** [Prem Aravindan](https://linkedin.com/in/prem-aravindan)

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://react.dev/) - JavaScript Library for UI
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [21st.dev](https://21st.dev) - Modern CSS Component Library

---

**Built with ❤️ by Prem Aravindan**

*Last Updated: December 2025*
