// Website Configuration
export const siteConfig = {
  // Environment-specific values (dari .env)
  siteName: import.meta.env.VITE_SITE_NAME || 'Word of Pradipta',
  siteDescription: import.meta.env.VITE_SITE_DESCRIPTION || 'Eksplorasi ide, cerita, dan pemikiran dalam kata-kata',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://word.pradipta.dev',
  wordpressApiUrl: import.meta.env.VITE_WORDPRESS_API_URL || 'https://word.pradipta.dev/wp-json/wp/v2',
  postsPerPage: parseInt(import.meta.env.VITE_POSTS_PER_PAGE) || 6,

  // Application features (tetap di config.js)
  features: {
    search: true,
    pagination: true,
    darkMode: false,
  },

  // Social Media (tetap di config.js, bisa dipindah ke env jika berbeda per environment)
  social: {
    twitter: '',
    github: '',
    linkedin: '',
  },

  // Menu Items (tetap di config.js, ini struktur aplikasi)
  menuItems: [
    { label: 'Beranda', path: '/' },
    { label: 'Arsip', path: '/archive' },
    { label: 'Tentang', path: '/about' },
    { label: 'Kontak', path: '/contact' },
  ],
}
