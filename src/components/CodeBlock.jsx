import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion, AnimatePresence } from 'framer-motion'
import './CodeBlock.css'

const CodeBlock = ({ children, className, inline }) => {
  const [copied, setCopied] = useState(false)

  // Extract language from className (format: language-javascript)
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : 'text'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Inline code
  if (inline) {
    return <code className="inline-code">{children}</code>
  }

  // Code block
  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-language">{language}</span>
        <button
          onClick={handleCopy}
          className="copy-button"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="copy-icon"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="copy-text">Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="copy-icon"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="5"
                    y="5"
                    width="9"
                    height="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    rx="1"
                  />
                  <path
                    d="M3 11V3C3 2.44772 3.44772 2 4 2H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="copy-text">Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 12px 12px',
          fontSize: '14px',
          lineHeight: '1.6',
        }}
        showLineNumbers={true}
        wrapLines={true}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
