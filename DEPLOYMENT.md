# Deployment Guide

This guide covers deploying the ConvertAudit application to various platforms and environments.

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- Git repository access
- Environment variables configured
- Build artifacts ready

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=https://api.convertaudit.com
VITE_APP_NAME=ConvertAudit

# Analytics (Optional)
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
VITE_MIXPANEL_TOKEN=your_mixpanel_token

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_FEEDBACK=true
```

## Build Process

### Local Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

### Build Output

The build process creates a `dist/` directory containing:
- `index.html` - Main HTML file
- `assets/` - Compiled CSS, JS, and other assets
- Static files from `public/` directory

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel provides the best experience for React applications with automatic deployments.

#### Setup

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Navigate to Settings > Environment Variables
   - Add your environment variables

#### Configuration

Create `vercel.json` in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Netlify

#### Setup

1. **Connect Repository**
   - Connect your Git repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Configure Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add your environment variables

#### Configuration

Create `netlify.toml` in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. AWS S3 + CloudFront

#### Setup

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://convertaudit-ui
   ```

2. **Configure Bucket for Static Website**
   ```bash
   aws s3 website s3://convertaudit-ui --index-document index.html --error-document index.html
   ```

3. **Upload Build Files**
   ```bash
   aws s3 sync dist/ s3://convertaudit-ui
   ```

4. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Default root object: `index.html`
   - Error pages: Redirect to `index.html` for 404s

#### Configuration

Create `aws-deploy.sh` script:

```bash
#!/bin/bash

# Build the application
npm run build

# Sync with S3
aws s3 sync dist/ s3://convertaudit-ui --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment completed!"
```

### 4. Docker

#### Dockerfile

Create `Dockerfile` in the root directory:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

#### Build and Run

```bash
# Build Docker image
docker build -t convertaudit-ui .

# Run container
docker run -p 80:80 convertaudit-ui
```

### 5. GitHub Pages

#### Setup

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

#### Configuration

Create `.github/workflows/deploy.yml` for automated deployments:

```yaml
name: Deploy to GitHub Pages

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
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Environment-Specific Configurations

### Development

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=ConvertAudit (Dev)
VITE_ENABLE_DEBUG=true
```

### Staging

```env
VITE_API_URL=https://staging-api.convertaudit.com
VITE_APP_NAME=ConvertAudit (Staging)
VITE_ENABLE_DEBUG=true
```

### Production

```env
VITE_API_URL=https://api.convertaudit.com
VITE_APP_NAME=ConvertAudit
VITE_ENABLE_DEBUG=false
```

## Performance Optimization

### Build Optimization

1. **Enable Compression**
   ```bash
   # Install compression plugin
   npm install --save-dev vite-plugin-compression
   ```

2. **Update vite.config.ts**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import compression from 'vite-plugin-compression'

   export default defineConfig({
     plugins: [
       react(),
       compression({
         algorithm: 'gzip',
         ext: '.gz'
       })
     ]
   })
   ```

### CDN Configuration

Configure your CDN to:
- Cache static assets for 1 year
- Cache HTML files for 1 hour
- Enable gzip compression
- Set security headers

## Monitoring and Analytics

### Error Tracking

1. **Sentry Integration**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **Initialize in main.tsx**
   ```typescript
   import * as Sentry from "@sentry/react";

   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
     environment: import.meta.env.MODE,
   });
   ```

### Performance Monitoring

1. **Web Vitals**
   ```bash
   npm install web-vitals
   ```

2. **Track Core Web Vitals**
   ```typescript
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   getCLS(console.log);
   getFID(console.log);
   getFCP(console.log);
   getLCP(console.log);
   getTTFB(console.log);
   ```

## Security Considerations

### Content Security Policy

Add CSP headers to your server configuration:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.convertaudit.com;
```

### Security Headers

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Troubleshooting

### Common Issues

1. **404 Errors on Refresh**
   - Ensure your server is configured for client-side routing
   - Add redirect rules to serve `index.html` for all routes

2. **Environment Variables Not Loading**
   - Verify variables are prefixed with `VITE_`
   - Rebuild the application after adding new variables

3. **Build Failures**
   - Check TypeScript errors: `npm run build`
   - Verify all dependencies are installed
   - Clear node_modules and reinstall

### Debug Commands

```bash
# Check build output
npm run build

# Analyze bundle size
npm install --save-dev vite-bundle-analyzer
npx vite-bundle-analyzer dist

# Check for TypeScript errors
npx tsc --noEmit

# Lint code
npm run lint
```

## Support

For deployment issues:
- Check platform-specific documentation
- Review build logs for errors
- Contact the development team
- Check the troubleshooting section above
