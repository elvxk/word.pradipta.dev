import { createElement } from 'react'
import CodeBlock from '../components/CodeBlock'

/**
 * Process WordPress content and replace code blocks with custom CodeBlock component
 */
export const processWordPressContent = (htmlContent) => {
  // Parse HTML string to DOM
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')

  // Find all <pre> and <code> elements
  const preElements = doc.querySelectorAll('pre')
  const codeElements = doc.querySelectorAll('code')

  // Process pre elements (code blocks)
  preElements.forEach((pre) => {
    const code = pre.querySelector('code')
    if (code) {
      const className = code.className || ''
      const codeContent = code.textContent || ''

      // Add data attributes for React component
      pre.setAttribute('data-code-block', 'true')
      pre.setAttribute('data-language', className)
      pre.setAttribute('data-content', codeContent)
    }
  })

  // Return processed HTML
  return doc.body.innerHTML
}

/**
 * Convert HTML string to React components with custom CodeBlock
 */
export const htmlToReact = (htmlString) => {
  if (!htmlString) return null

  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const processNode = (node, index = 0) => {
    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent
    }

    // Element node
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase()
      const attributes = {}

      // Get all attributes
      Array.from(node.attributes).forEach((attr) => {
        const name = attr.name === 'class' ? 'className' : attr.name
        attributes[name] = attr.value
      })

      // Check if it's a code block
      if (tagName === 'pre' && node.querySelector('code')) {
        const code = node.querySelector('code')
        const className = code.className || ''
        const content = code.textContent || ''

        return createElement(CodeBlock, {
          key: `code-${index}`,
          className: className,
          children: content,
        })
      }

      // Check if it's inline code
      if (tagName === 'code' && node.parentElement?.tagName.toLowerCase() !== 'pre') {
        return createElement(CodeBlock, {
          key: `inline-code-${index}`,
          inline: true,
          children: node.textContent,
        })
      }

      // Process children
      const children = Array.from(node.childNodes).map((child, i) =>
        processNode(child, `${index}-${i}`)
      )

      return createElement(tagName, { key: index, ...attributes }, ...children)
    }

    return null
  }

  // Process all body children
  return Array.from(doc.body.childNodes).map((node, index) =>
    processNode(node, index)
  )
}

/**
 * Enhanced WordPress content processor with CodeBlock support
 * This is simpler approach - just wraps dangerouslySetInnerHTML with custom styling
 */
export const enhanceCodeBlocks = () => {
  // This runs after component mounts to enhance existing code blocks
  if (typeof window === 'undefined') return

  const codeBlocks = document.querySelectorAll('.post-body pre code')

  codeBlocks.forEach((code) => {
    const pre = code.parentElement
    if (!pre || pre.getAttribute('data-enhanced')) return

    // Mark as enhanced
    pre.setAttribute('data-enhanced', 'true')

    // Get language from class
    const className = code.className || ''
    const match = /language-(\w+)/.exec(className)
    const language = match ? match[1] : 'text'

    // Store original content
    const content = code.textContent || ''

    // Add copy button functionality via data attribute
    pre.setAttribute('data-language', language)
    pre.setAttribute('data-code-content', content)

    // Wrap in custom structure
    const wrapper = document.createElement('div')
    wrapper.className = 'wp-code-block-wrapper'

    const header = document.createElement('div')
    header.className = 'wp-code-header'
    header.innerHTML = `
      <span class="wp-code-language">${language}</span>
      <button class="wp-copy-button" onclick="copyCodeBlock(this)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="9" height="9" stroke="currentColor" stroke-width="1.5" rx="1"/>
          <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>Copy</span>
      </button>
    `

    if (pre.parentNode) {
      pre.parentNode.insertBefore(wrapper, pre)
      wrapper.appendChild(header)
      wrapper.appendChild(pre)
    }
  })
}

// Global copy function for WordPress enhanced code blocks
if (typeof window !== 'undefined') {
  window.copyCodeBlock = async function(button) {
    const wrapper = button.closest('.wp-code-block-wrapper')
    const pre = wrapper.querySelector('pre')
    const content = pre.getAttribute('data-code-content') || pre.textContent

    try {
      await navigator.clipboard.writeText(content)
      const span = button.querySelector('span')
      const originalText = span.textContent
      span.textContent = 'Copied!'
      button.style.color = 'var(--color-mint-splash)'

      setTimeout(() => {
        span.textContent = originalText
        button.style.color = ''
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
}
