# Panduan Deployment

## Persiapan

Pastikan semua konfigurasi sudah benar di `.env`:

```env
VITE_SITE_NAME="Word of Pradipta"
VITE_SITE_DESCRIPTION="Eksplorasi ide, cerita, dan pemikiran dalam kata-kata"
VITE_WORDPRESS_API_URL="https://word.pradipta.dev/wp-json/wp/v2"
VITE_POSTS_PER_PAGE=6
```

## Build Project

```bash
bun run build
```

File hasil build akan tersimpan di folder `dist/`.

## Deploy ke Vercel

### Via CLI

1. Install Vercel CLI (jika belum):
```bash
bun add -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Via Dashboard

1. Buka [vercel.com](https://vercel.com)
2. Import repository GitHub
3. Framework Preset: **Vite**
4. Environment Variables:
   - `VITE_SITE_NAME`
   - `VITE_SITE_DESCRIPTION`
   - `VITE_WORDPRESS_API_URL`
   - `VITE_POSTS_PER_PAGE`
5. Deploy

## Deploy ke Netlify

### Via CLI

1. Install Netlify CLI:
```bash
bun add -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### Via Dashboard

1. Buka [netlify.com](https://netlify.com)
2. Drag & drop folder `dist/`
3. Atau connect dengan GitHub repository

## Deploy ke Hosting Manual

1. Build project:
```bash
bun run build
```

2. Upload semua file di folder `dist/` ke hosting via FTP/SFTP

3. Pastikan web server mengarahkan semua route ke `index.html` (untuk SPA routing)

### Konfigurasi Nginx

```nginx
server {
    listen 80;
    server_name word.pradipta.dev;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Konfigurasi Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables Production

Untuk production, pastikan URL WordPress API dapat diakses publik dan CORS sudah dikonfigurasi dengan benar di WordPress.

### Konfigurasi CORS di WordPress

Tambahkan di `wp-config.php` atau plugin:

```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

Atau gunakan plugin seperti "WP REST API Controller" untuk mengatur CORS.

## Performance Tips

1. **Image Optimization**: Pastikan gambar di WordPress sudah dioptimasi
2. **Caching**: Gunakan CDN untuk static assets
3. **Compression**: Enable Gzip/Brotli compression di server
4. **Lazy Loading**: Sudah diimplementasi untuk gambar

## Monitoring

Setelah deploy, monitor:
- Loading time
- API response time
- Error logs
- User analytics

## Troubleshooting

### Build Error
- Pastikan semua dependencies terinstall: `bun install`
- Clear cache: `rm -rf node_modules && bun install`

### API Error
- Cek URL WordPress API di environment variables
- Pastikan REST API aktif di WordPress
- Cek CORS configuration

### Routing Error (404)
- Pastikan web server sudah dikonfigurasi untuk SPA
- Test dengan `bun run preview` sebelum deploy
