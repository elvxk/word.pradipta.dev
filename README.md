# Word of Pradipta - Frontend

Frontend React untuk website **Word of Pradipta** yang menggunakan WordPress REST API sebagai backend.

## 🚀 Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router** - Routing
- **Framer Motion** - Animasi
- **Bun** - Package Manager
- **WordPress REST API** - Content Management

## 📁 Struktur Project

```
word-sunset/
├── src/
│   ├── components/       # Komponen reusable
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── PostCard.jsx
│   │   └── Pagination.jsx
│   ├── pages/           # Halaman utama
│   │   ├── Home.jsx
│   │   ├── PostDetail.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── services/        # API services
│   │   └── wordpress.js
│   ├── config.js        # Konfigurasi website
│   ├── index.css        # Global styles
│   ├── App.jsx
│   └── main.jsx
├── .env                 # Environment variables
├── index.html
├── package.json
└── vite.config.js
```

## ⚙️ Konfigurasi

Edit file `.env` untuk menyesuaikan dengan kebutuhan:

```env
VITE_SITE_NAME="Word of Pradipta"
VITE_SITE_DESCRIPTION="Eksplorasi ide, cerita, dan pemikiran dalam kata-kata"
VITE_WORDPRESS_API_URL="https://word.pradipta.dev/wp-json/wp/v2"
VITE_POSTS_PER_PAGE=6
```

Atau edit `src/config.js` untuk konfigurasi lebih detail.

## 🎨 Design System

Website ini menggunakan design system yang playful dengan:

- **Warna Utama**: Mint Splash (#99ffcc)
- **Font**: DM Serif Display (heading), Inter (body)
- **Style**: Hand-drawn zine meets pastel candy store
- **Animasi**: Framer Motion untuk transisi smooth

## 🛠️ Development

### Install Dependencies

```bash
bun install
```

### Run Development Server

```bash
bun run dev
```

Website akan berjalan di `http://localhost:3000`

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## 🌟 Features

- ✅ Responsive design untuk semua device
- ✅ Pagination untuk daftar artikel
- ✅ Pencarian artikel real-time
- ✅ Animasi smooth dengan Framer Motion
- ✅ **Code block dengan syntax highlighting & copy button**
- ✅ SEO-friendly dengan meta tags
- ✅ Fast loading dengan Vite
- ✅ WordPress REST API integration
- ✅ Modern UI dengan design system yang konsisten

## 📝 API WordPress

Website ini menggunakan WordPress REST API v2. Endpoint yang digunakan:

- `GET /wp-json/wp/v2/posts` - Daftar artikel
- `GET /wp-json/wp/v2/posts?slug={slug}` - Detail artikel
- `GET /wp-json/wp/v2/categories` - Kategori
- `GET /wp-json/wp/v2/tags` - Tags

Pastikan WordPress REST API sudah aktif dan dapat diakses.

## 🚀 Deployment

### Vercel

```bash
bun run build
vercel --prod
```

### Netlify

```bash
bun run build
netlify deploy --prod --dir=dist
```

### Manual Deploy

Upload folder `dist/` ke hosting pilihan Anda.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Author

Pradipta - [word.pradipta.dev](https://word.pradipta.dev)
