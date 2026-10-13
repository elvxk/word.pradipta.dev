// Utility Functions for WordPress Data Processing

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength).trim() + '...'
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export const formatReadingTime = (content) => {
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]*>/g, '')
  const wordCount = text.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readingTime} min read`
}

export const getRandomColor = () => {
  const colors = [
    'var(--color-mint-splash)',
    'var(--color-sky-pop)',
    'var(--color-bubblegum)',
    'var(--color-peach-pop)',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior,
  })
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

export const shareUrl = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return true
    } catch (err) {
      console.error('Share failed:', err)
      return false
    }
  }
  return false
}
