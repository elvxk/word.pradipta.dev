import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './SearchBar.css'

const SearchBar = () => {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/')
    }
  }

  const handleClear = () => {
    setQuery('')
    navigate('/')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSearch} className={`search-bar ${isFocused ? 'focused' : ''}`}>
      <svg
        className="search-icon"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        placeholder="Cari artikel..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="search-input"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="search-clear"
          aria-label="Clear search"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </form>
  )
}

export default SearchBar
