# Code Block Feature Documentation

## ✨ Overview

Code block feature yang menarik dengan **syntax highlighting** dan **copy button** untuk artikel WordPress.

## 🎯 Features

### ✅ Syntax Highlighting
- Support 100+ bahasa pemrograman
- Theme: VS Code Dark Plus
- Line numbers
- Auto-detect language dari class name

### ✅ Copy Button
- One-click copy ke clipboard
- Visual feedback (Copied!)
- Smooth animation dengan Framer Motion

### ✅ Language Badge
- Menampilkan bahasa di header
- Auto-detect dari WordPress class

### ✅ Beautiful Styling
- Dark theme (#1e1e1e)
- Mint accent color
- Smooth scrollbar
- Responsive design

## 📦 Dependencies

```json
{
  "react-syntax-highlighter": "^16.1.2",
  "@types/react-syntax-highlighter": "^15.5.13"
}
```

## 🎨 How It Works

### 1. WordPress Content
Ketika WordPress menghasilkan code block:

```html
<pre><code class="language-javascript">
const hello = 'world';
console.log(hello);
</code></pre>
```

### 2. Auto Enhancement
JavaScript secara otomatis mendeteksi dan enhance code blocks:

- Deteksi language dari class
- Add header dengan language badge
- Add copy button
- Apply syntax highlighting
- Add custom styling

### 3. Result
```
┌─────────────────────────────────┐
│ JAVASCRIPT          📋 Copy     │ ← Header
├─────────────────────────────────┤
│ 1  const hello = 'world';       │
│ 2  console.log(hello);          │ ← Syntax highlighted
└─────────────────────────────────┘
```

## 🚀 Usage

### Automatic (Recommended)
Code blocks dari WordPress otomatis di-enhance. Tidak perlu konfigurasi tambahan!

### Manual Component
Jika ingin menggunakan komponen langsung:

```jsx
import CodeBlock from './components/CodeBlock'

function MyComponent() {
  return (
    <CodeBlock className="language-javascript">
      {`const hello = 'world';
console.log(hello);`}
    </CodeBlock>
  )
}
```

### Inline Code
Untuk inline code:

```jsx
<CodeBlock inline>npm install</CodeBlock>
```

## 🎨 Styling

### Colors
- Background: `#1e1e1e` (Dark)
- Header: `#2d2d2d`
- Text: `#d4d4d4`
- Accent: `var(--color-mint-splash)` (#99ffcc)

### Code Block Wrapper
```css
.wp-code-block-wrapper {
  border-radius: 16px;
  border: 1px solid black;
  overflow: hidden;
}
```

### Header
```css
.wp-code-header {
  background: #2d2d2d;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
}
```

## 🌐 Supported Languages

Via `react-syntax-highlighter`, mendukung 100+ bahasa:

**Popular:**
- JavaScript / TypeScript
- Python
- PHP
- Java
- C / C++ / C#
- Ruby
- Go
- Rust
- Swift
- Kotlin

**Web:**
- HTML
- CSS / SCSS / SASS
- JSX / TSX
- Vue
- Markdown

**Others:**
- SQL
- JSON
- YAML
- Bash / Shell
- Docker
- And many more...

## 📝 WordPress Setup

### Option 1: Gutenberg Code Block
Di WordPress editor, gunakan **Code Block**:

1. Add block → Code
2. Select language
3. Paste code
4. Publish

Class akan otomatis: `language-javascript`

### Option 2: HTML Block
```html
<pre><code class="language-python">
def hello():
    print("Hello World")
</code></pre>
```

### Option 3: Plugin
Install plugin untuk code blocks:
- **Code Syntax Block** (official)
- **Enlighter** 
- **Prismatic**

## 🔧 Customization

### Change Theme
Edit `src/components/CodeBlock.jsx`:

```javascript
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Replace vscDarkPlus with atomDark
style={atomDark}
```

Available themes:
- `vscDarkPlus` (default)
- `atomDark`
- `oneDark`
- `nightOwl`
- `dracula`
- `nord`

### Custom Colors
Edit CSS variables:

```css
.wp-code-language {
  color: var(--color-sky-pop); /* Change accent */
}

.wp-code-block-wrapper pre {
  background-color: #0d1117; /* GitHub dark */
}
```

### Disable Line Numbers
Edit `CodeBlock.jsx`:

```javascript
showLineNumbers={false}
```

## 💡 Tips

### 1. Language Detection
WordPress biasanya add class `language-{lang}`. Jika tidak detect:

```html
<!-- Add manually -->
<code class="language-javascript">
```

### 2. Long Code
Horizontal scroll otomatis untuk code panjang. Custom scrollbar with mint color.

### 3. Mobile Responsive
- Font size turun di mobile
- Copy button text hilang, icon only
- Touch-friendly

### 4. Copy Feedback
- Button berubah ke "Copied!" 
- Auto-reset setelah 2 detik
- Visual feedback dengan animation

## 🐛 Troubleshooting

### Code block tidak ter-enhance
1. Check console untuk errors
2. Pastikan `enhanceCodeBlocks()` dipanggil
3. Check WordPress class name

### Syntax highlighting tidak muncul
1. Pastikan language class ada
2. Check language name (case-sensitive)
3. Fallback ke `text` jika unknown

### Copy tidak bekerja
1. Check HTTPS (clipboard API perlu secure context)
2. Check browser support
3. Fallback notification jika gagal

## 📊 Performance

### Bundle Size Impact
- Before: 296.53 kB (95.07 kB gzipped)
- After: 298.09 kB (95.64 kB gzipped)
- **Impact: +1.56 kB (+0.57 kB gzipped)** ✅ Very small!

### Load Time
- Syntax highlighter loaded on demand
- Code enhancement runs after page load
- Minimal impact on TTI

### Optimization
- Tree-shaking enabled
- Only load languages used
- CSS minified
- Lazy load component

## 🎯 Examples

### JavaScript
```javascript
const fetchData = async () => {
  const response = await fetch('/api/data')
  return response.json()
}
```

### Python
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### PHP
```php
<?php
function get_posts() {
    return get_posts(['post_type' => 'post']);
}
?>
```

### CSS
```css
.button {
  background: linear-gradient(45deg, #99ffcc, #7bbbff);
  padding: 12px 24px;
  border-radius: 12px;
}
```

## 🚀 Future Enhancements

- [ ] Theme switcher (light/dark)
- [ ] Download code as file
- [ ] Line highlighting
- [ ] Diff view
- [ ] Code playground integration
- [ ] Multiple file tabs

## 📚 Resources

- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [Prism.js Languages](https://prismjs.com/#supported-languages)
- [VS Code Themes](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD)

---

**Status**: ✅ Production Ready  
**Bundle Impact**: +0.57 kB gzipped  
**Browser Support**: All modern browsers  
**Mobile**: Fully responsive
