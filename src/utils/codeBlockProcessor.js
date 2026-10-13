/**
 * Extract language from WordPress code block class names
 * Supports multiple WordPress plugins and formats
 */
export const extractLanguageFromClass = (className) => {
  if (!className) return 'text'

  // Format 1: language-javascript (Gutenberg, Prismatic, Prism)
  const languageMatch = className.match(/language-(\w+)/)
  if (languageMatch) {
    return languageMatch[1]
  }

  // Format 2: lang-javascript
  const langMatch = className.match(/lang-(\w+)/)
  if (langMatch) {
    return langMatch[1]
  }

  // Format 3: brush: js (SyntaxHighlighter plugin)
  const brushMatch = className.match(/brush:\s*(\w+)/)
  if (brushMatch) {
    return mapBrushToLanguage(brushMatch[1])
  }

  // Format 4: wp-block-code language-javascript
  const wpBlockMatch = className.match(/wp-block-code.*?language-(\w+)/)
  if (wpBlockMatch) {
    return wpBlockMatch[1]
  }

  // Format 5: hljs javascript (highlight.js)
  const hljsMatch = className.match(/hljs\s+(\w+)/)
  if (hljsMatch) {
    return hljsMatch[1]
  }

  // Default fallback
  return 'text'
}

/**
 * Map SyntaxHighlighter brush names to standard language names
 */
const mapBrushToLanguage = (brush) => {
  const brushMap = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    bash: 'bash',
    shell: 'bash',
    sh: 'bash',
    py: 'python',
    rb: 'ruby',
    java: 'java',
    php: 'php',
    cs: 'csharp',
    cpp: 'cpp',
    c: 'c',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    html: 'html',
    xml: 'xml',
    sql: 'sql',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    md: 'markdown',
    plain: 'text',
    text: 'text',
  }

  return brushMap[brush.toLowerCase()] || brush
}

/**
 * Enhanced code block processor with better language detection
 */
export const enhanceCodeBlocks = () => {
  if (typeof window === 'undefined') return

  const codeBlocks = document.querySelectorAll('.post-body pre code')

  codeBlocks.forEach((code, index) => {
    const pre = code.parentElement
    if (!pre || pre.getAttribute('data-enhanced')) {
      return
    }

    // Mark as enhanced to prevent duplicate processing
    pre.setAttribute('data-enhanced', 'true')

    // Get language from multiple sources
    let language = 'text'

    // Check code element class
    if (code.className) {
      language = extractLanguageFromClass(code.className)
    }

    // Check pre element class as fallback
    if (language === 'text' && pre.className) {
      language = extractLanguageFromClass(pre.className)
    }

    // Store original content
    const content = code.textContent || ''

    // Add data attributes
    pre.setAttribute('data-language', language)
    pre.setAttribute('data-code-content', content)

    // Wrap in custom structure
    const wrapper = document.createElement('div')
    wrapper.className = 'wp-code-block-wrapper'

    const header = document.createElement('div')
    header.className = 'wp-code-header'

    const langSpan = document.createElement('span')
    langSpan.className = 'wp-code-language'
    langSpan.textContent = language

    const copyButton = document.createElement('button')
    copyButton.className = 'wp-copy-button'
    copyButton.setAttribute('aria-label', 'Copy code')
    copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="5" y="5" width="9" height="9" stroke="currentColor" stroke-width="1.5" rx="1"/>
        <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span>Copy</span>
    `

    // Add click event listener directly
    copyButton.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(content)
        const span = this.querySelector('span')
        const svg = this.querySelector('svg')
        const originalText = span.textContent

        // Update button
        span.textContent = 'Copied!'
        this.style.color = 'var(--color-mint-splash)'
        this.style.borderColor = 'var(--color-mint-splash)'

        // Change icon to checkmark
        svg.innerHTML = `
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `

        setTimeout(() => {
          span.textContent = originalText
          this.style.color = ''
          this.style.borderColor = ''
          // Restore copy icon
          svg.innerHTML = `
            <rect x="5" y="5" width="9" height="9" stroke="currentColor" stroke-width="1.5" rx="1"/>
            <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          `
        }, 2000)
      } catch (err) {
        // Silent fail for copy errors
      }
    })

    header.appendChild(langSpan)
    header.appendChild(copyButton)

    if (pre.parentNode) {
      pre.parentNode.insertBefore(wrapper, pre)
      wrapper.appendChild(header)
      wrapper.appendChild(pre)
    }
  })
}

/**
 * Test function to check WordPress code block formats
 * Call this in browser console: testCodeBlockDetection()
 */
if (typeof window !== 'undefined') {
  window.testCodeBlockDetection = () => {
    console.log('=== Testing Code Block Language Detection ===\n')

    const testCases = [
      'language-javascript',
      'lang-python',
      'brush: js',
      'wp-block-code language-php',
      'hljs ruby',
      'language-bash',
      '',
    ]

    testCases.forEach(className => {
      const detected = extractLanguageFromClass(className)
      console.log(`Class: "${className}" → Language: "${detected}"`)
    })
  }
}
