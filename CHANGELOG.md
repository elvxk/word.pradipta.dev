# Changelog

## [1.0.5] - 2026-10-14

### Added
- 📧 **Email Sending Functionality**
  - Contact form integration dengan email service
  - Form validation dan error handling
  - Success/error feedback untuk user
  - Environment variable untuk email configuration

- 🎨 **New Logo & Branding**
  - Updated logo design untuk website
  - Improved brand identity
  - Optimized logo assets

- 🏷️ **Console Watermark**
  - Added custom console watermark
  - Brand visibility di developer console
  - Non-intrusive developer experience

- 📱 **Social Media Integration**
  - Social media links di footer
  - Configurable social media URLs
  - Icon buttons untuk platform links
  - Enhanced footer design

### Fixed
- 🐛 **Code Block Copy Button**
  - Fixed copy button functionality
  - Improved button state management
  - Better user feedback on copy action
  - Enhanced code block processor logic

### Refactored
- 🔧 **Code Cleanup**
  - Removed unused code dan dependencies
  - Cleaned up 11 files
  - Reduced bundle size dengan ~1KB
  - Better code organization

### Files Modified
- Modified: `src/pages/Contact.jsx`, `src/pages/Contact.css`
- Modified: `src/pages/PostDetail.jsx`
- Modified: `src/utils/codeBlockProcessor.js`
- Modified: `src/components/Footer.jsx`
- Modified: `src/config.js`
- Added: `src/utils/consoleWatermark.js`
- Modified: `src/main.jsx`
- Added: `.env.example` entries

### Impact
- Bundle: Optimized (-1KB from cleanup)
- New features: +3KB total
- Net impact: +2KB

## [1.0.4] - 2026-10-12

### Improved
- 🔧 **Enhanced Code Block Language Detection**
  - Auto-detect language dari WordPress API response
  - Support multiple WordPress plugins formats:
    - Gutenberg Code Block (`language-*`)
    - Prismatic (`language-*`)
    - SyntaxHighlighter (`brush: *`)
    - Highlight.js (`hljs *`)
    - Lang format (`lang-*`)
  - Smart fallback ke 'text' jika tidak detect
  - Better language badge display

### Added
- New `codeBlockProcessor.js` utility
- Language extraction from multiple class formats
- Brush-to-language mapping
- Test function for debugging

### Changed
- Moved from `contentProcessor.js` to dedicated `codeBlockProcessor.js`
- Better language detection logic
- Enhanced copy button feedback with icon change

### Files
- Added: `src/utils/codeBlockProcessor.js`
- Modified: `src/pages/PostDetail.jsx`
- Added: `test-wordpress-api.js` (for testing)

### Impact
- Bundle: +1.44 kB (+0.46 kB gzipped)

## [1.0.3] - 2026-10-12

### Added
- 🎨 **Custom Text Selection Colors**
  - Mint background untuk default text
  - Sky blue untuk headings
  - Bubblegum untuk links
  - Peach untuk code
  - Consistent dengan theme colors
  - Better visual hierarchy

### Changed
- Default selection color dari browser ke branded colors
- Enhanced user experience dengan colored selections

### Impact
- CSS: +0.75 kB (+0.08 kB gzipped)

## [1.0.2] - 2026-10-12

### Changed
- 🔍 **Improved Search Experience**
  - Removed search bar dari navbar (terlalu kecil)
  - Added large prominent search di home page hero section
  - Real-time search tanpa delay
  - Better UX dengan clear & submit buttons
  - Enhanced visual feedback dan animations
  - Fully responsive mobile design

### Added
- New HeroSearch component untuk home page
- Search hint menampilkan query aktif
- Focus states dengan mint accent
- Clear button dengan animation

### Files
- Added: `src/components/HeroSearch.jsx`
- Added: `src/components/HeroSearch.css`
- Modified: `src/components/Navbar.jsx` (removed search)
- Modified: `src/components/Navbar.css` (cleaned up)
- Modified: `src/pages/Home.jsx` (added hero search)

### Bundle
- Impact: +0.89 kB (+0.16 kB gzipped)

## [1.0.1] - 2026-10-12

### Added
- ✨ **Code block dengan syntax highlighting & copy button**
  - Support 100+ bahasa pemrograman
  - VS Code Dark Plus theme
  - One-click copy to clipboard
  - Language badge di header
  - Line numbers
  - Custom scrollbar
  - Auto-enhancement dari WordPress content
- 📚 CODE-BLOCK-DOCS.md documentation

### Changed
- Updated PostDetail component untuk code block enhancement
- Improved code styling di PostDetail.css
- Bundle size: +1.56 kB (+0.57 kB gzipped)

### Dependencies
- Added react-syntax-highlighter@16.1.2
- Added @types/react-syntax-highlighter@15.5.13

## [1.0.0] - 2026-10-12

### Added
- ✨ Initial release
- 🎨 Design system dengan playful pastel theme
- 📱 Responsive design untuk semua device
- 🔍 Fitur pencarian artikel real-time
- 📄 Pagination untuk daftar artikel
- ✨ Animasi smooth dengan Framer Motion
- 🎯 Integrasi WordPress REST API
- 📝 Halaman Home, Post Detail, About, dan Contact
- 🧭 Navbar dengan search bar terintegrasi
- 🦶 Footer dengan decorative elements
- ⚡ Fast loading dengan Vite
- 🎨 Custom design tokens dan CSS variables
- 📦 Komponen reusable (PostCard, Pagination, SearchBar)
- 🌐 WordPress API service layer
- 📋 Comprehensive documentation

### Features
- Home page dengan hero section dan post grid
- Post detail dengan featured image dan rich content
- About page dengan informasi website
- Contact page dengan form
- Real-time search tanpa delay
- Pagination dengan navigation
- Category dan tag support
- Featured image support
- Responsive navigation dengan mobile menu
- Loading states dan error handling
- SEO-friendly structure

### Tech Stack
- React 18.3.1
- Vite 5.4.21
- React Router 6.30.6
- Framer Motion 11.18.2
- Bun 1.3.14

## Roadmap

### [1.1.0] - Planned
- [ ] Dark mode toggle
- [ ] Category filter page
- [ ] Tag filter page
- [ ] Related posts section
- [ ] Social share buttons
- [ ] Comments section integration
- [ ] Reading progress indicator
- [ ] Estimated reading time
- [ ] Table of contents for long articles
- [ ] Print stylesheet

### [1.2.0] - Planned
- [ ] PWA support
- [ ] Offline reading
- [ ] Push notifications
- [ ] Bookmarks functionality
- [ ] Reading history
- [ ] Advanced search filters
- [ ] Author page
- [ ] Archives page

### [2.0.0] - Future
- [ ] Multi-language support
- [ ] RSS feed
- [ ] Newsletter integration
- [ ] Analytics dashboard
- [ ] Admin panel integration
- [ ] Image lazy loading optimization
- [ ] Code syntax highlighting
- [ ] Video embed support
