# Contributing to Word of Pradipta

Terima kasih atas minat Anda untuk berkontribusi! 

## Development Setup

1. Clone repository
```bash
git clone https://github.com/yourusername/word-sunset.git
cd word-sunset
```

2. Install dependencies
```bash
bun install
```

3. Copy environment variables
```bash
cp .env.example .env
```

4. Edit `.env` dengan konfigurasi Anda

5. Run development server
```bash
bun run dev
```

## Project Structure

```
src/
├── components/      # Reusable components
├── pages/          # Page components
├── services/       # API services
├── utils/          # Utility functions
├── assets/         # Static assets
├── config.js       # App configuration
└── index.css       # Global styles
```

## Coding Standards

### JavaScript/React
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### CSS
- Use CSS custom properties (variables)
- Follow BEM naming convention when needed
- Keep styles modular (component-specific)
- Mobile-first responsive design
- Use design tokens from design system

### Git Commits
- Use conventional commits format:
  - `feat:` new feature
  - `fix:` bug fix
  - `docs:` documentation
  - `style:` formatting, missing semicolons, etc.
  - `refactor:` code restructuring
  - `test:` adding tests
  - `chore:` maintenance

Example:
```
feat: add dark mode toggle
fix: pagination not working on search
docs: update README with deployment guide
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## Design System

Ikuti design system yang sudah ada:
- Colors: Mint Splash (#99ffcc) sebagai primary
- Typography: DM Serif Display untuk heading, Inter untuk body
- Spacing: Multiple of 4px
- Border radius: Sesuai dengan komponen (12px buttons, 16px cards, 9999px pills)
- Animations: Smooth dengan Framer Motion

## Testing

Sebelum submit PR:
1. Test di browser (Chrome, Firefox, Safari)
2. Test responsive (mobile, tablet, desktop)
3. Check console untuk errors
4. Test WordPress API integration
5. Build production (`bun run build`)

## Questions?

Jika ada pertanyaan, silakan buka issue di GitHub atau hubungi maintainer.
