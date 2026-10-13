import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './HeroSearch.css'

const HeroSearch = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    // Real-time search tanpa delay
    onSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <motion.div
      className="hero-search-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className={`hero-search ${isFocused ? 'focused' : ''}`}>
        <div className="search-icon-wrapper">
          <svg
            className="search-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Cari artikel... (ketik untuk pencarian langsung)"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="hero-search-input"
          autoComplete="off"
        />

        {query && (
          <motion.button
            type="button"
            onClick={handleClear}
            className="search-clear-btn"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            aria-label="Clear search"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        )}

        <motion.button
          type="submit"
          className="search-submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Cari</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 4L14 10L8 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </form>

      {query && (
        <motion.p
          className="search-hint"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pencarian real-time aktif untuk: <strong>"{query}"</strong>
        </motion.p>
      )}
    </motion.div>
  )
}

export default HeroSearch
