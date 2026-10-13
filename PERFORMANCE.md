# Performance Optimization Guide

## Build Optimization

### 1. Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
  },
})
```

### 2. Code Splitting

Gunakan lazy loading untuk pages:

```javascript
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const PostDetail = lazy(() => import('./pages/PostDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  )
}
```

## Image Optimization

### 1. Lazy Loading

Images sudah menggunakan `loading="lazy"` attribute.

### 2. Responsive Images

```javascript
// Gunakan srcset untuk responsive images
<img
  src={image.medium}
  srcSet={`
    ${image.small} 480w,
    ${image.medium} 800w,
    ${image.large} 1200w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt={alt}
  loading="lazy"
/>
```

### 3. WebP Format

Gunakan WebP format di WordPress dengan plugin seperti:
- WebP Express
- ShortPixel
- Imagify

## API Optimization

### 1. Caching

Implement client-side caching:

```javascript
// Simple cache implementation
const cache = new Map()

export const fetchPostsWithCache = async (page, perPage, search) => {
  const key = `${page}-${perPage}-${search}`
  
  if (cache.has(key)) {
    const cached = cache.get(key)
    if (Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minutes
      return cached.data
    }
  }
  
  const data = await fetchPosts(page, perPage, search)
  cache.set(key, { data, timestamp: Date.now() })
  return data
}
```

### 2. Request Batching

Batch multiple API calls:

```javascript
const [posts, categories] = await Promise.all([
  fetchPosts(),
  fetchCategories(),
])
```

### 3. Debounce Search

Search sudah menggunakan debounce untuk mengurangi API calls.

## Bundle Size

### 1. Analyze Bundle

```bash
bun add -d rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
})
```

### 2. Tree Shaking

Pastikan import hanya yang diperlukan:

```javascript
// ❌ Bad
import * as framerMotion from 'framer-motion'

// ✅ Good
import { motion } from 'framer-motion'
```

## Runtime Performance

### 1. Memoization

```javascript
import { useMemo, useCallback } from 'react'

const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => /* expensive operation */)
  }, [data])
  
  const handleClick = useCallback(() => {
    // handler
  }, [])
  
  return <div>{/* render */}</div>
}
```

### 2. Virtual Scrolling

Untuk list panjang, gunakan virtual scrolling:

```bash
bun add react-window
```

## Network Optimization

### 1. Compression

Enable Gzip/Brotli di server:

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

**Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript
</IfModule>
```

### 2. CDN

Deploy static assets ke CDN:
- Cloudflare
- Vercel Edge Network
- Netlify CDN

### 3. Preconnect

```html
<!-- index.html -->
<link rel="preconnect" href="https://word.pradipta.dev">
<link rel="dns-prefetch" href="https://word.pradipta.dev">
```

## Monitoring

### 1. Web Vitals

```bash
bun add web-vitals
```

```javascript
// main.jsx
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

onCLS(console.log)
onFID(console.log)
onFCP(console.log)
onLCP(console.log)
onTTFB(console.log)
```

### 2. Lighthouse

Test dengan Lighthouse:
```bash
lighthouse https://word.pradipta.dev --view
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Checklist

- [ ] Enable lazy loading untuk images
- [ ] Implement code splitting
- [ ] Add API caching
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Use CDN
- [ ] Add preconnect links
- [ ] Monitor Web Vitals
- [ ] Test with Lighthouse
- [ ] Optimize WordPress images
- [ ] Enable WordPress caching
- [ ] Minify CSS/JS
