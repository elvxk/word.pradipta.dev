// Calculate reading time based on word count
// Average reading speed: 200 words per minute (Indonesian)
export const calculateReadingTime = (content) => {
  if (!content) return 0

  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '')

  // Count words
  const words = text.trim().split(/\s+/).length

  // Calculate minutes (rounded up)
  const minutes = Math.ceil(words / 200)

  return minutes
}

// Format reading time for display
export const formatReadingTime = (minutes) => {
  if (minutes < 1) return '1 menit'
  return `${minutes} menit`
}
