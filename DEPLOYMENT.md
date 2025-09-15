# Deployment Guide

This document explains how to deploy the MERN Blogs Frontend application using various platforms and CI/CD pipelines.

## 🚀 Quick Deploy

### GitHub Pages (Automated)
The application automatically deploys to GitHub Pages when you push to the `main` or `master` branch.

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Push to main/master** - the CI/CD pipeline will handle the rest!

### Manual Deployment
```bash
# Build and deploy to GitHub Pages
npm run deploy

# Or build locally
npm run build
```

## 🔄 CI/CD Pipeline

The project includes a single GitHub Actions workflow:

### CI/CD Pipeline (`.github/workflows/ci-cd.yml`)
**Triggers:** Push to `main`/`master`, Pull Requests

**Build Steps:**
- ✅ Checkout code
- ✅ Setup Node.js 20
- ✅ Install dependencies
- ✅ Run linter
- ✅ Build application
- ✅ Upload build artifacts

**Deploy Steps (main/master only):**
- 🚀 Deploy to GitHub Pages

## 🌐 GitHub Pages Deployment

### Automatic Deployment
```yaml
# Automatic deployment on push to main/master
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

**Setup:**
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main/master branch
4. Your site will be available at `https://[username].github.io/[repository-name]`

## 🔧 Build Configuration

The application is configured for optimal production builds:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@heroui/button', '@heroui/card', '@heroui/input'],
        },
      },
    },
  },
  base: './', // For GitHub Pages compatibility
});
```

## 🔐 Required Secrets

For GitHub Pages deployment, no additional secrets are required! The workflow uses the built-in `GITHUB_TOKEN` which is automatically provided by GitHub Actions.

## 📊 Build Artifacts

The CI pipeline creates optimized build artifacts:

- **Minified JavaScript/CSS**
- **Code splitting** for better performance
- **Asset optimization**
- **Source maps** (disabled in production)

## 🐛 Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint

# Test build locally
npm run build
```

### Deployment Issues
1. **GitHub Pages**: Check repository settings and workflow permissions
2. **Branch Protection**: Ensure the workflow has permission to push to gh-pages branch
3. **Build Artifacts**: Verify that the build step completes successfully

### Environment Variables
Create `.env` files for different environments:
```bash
# .env.production
VITE_API_URL=https://your-production-api.com

# .env.staging
VITE_API_URL=https://your-staging-api.com
```

---

**Happy Deploying! 🚀**
