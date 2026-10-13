import { siteConfig } from '../config'

const API_BASE_URL = siteConfig.wordpressApiUrl

// Fetch posts with pagination
export const fetchPosts = async (page = 1, perPage = siteConfig.postsPerPage, search = '') => {
  try {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
    const response = await fetch(
      `${API_BASE_URL}/posts?page=${page}&per_page=${perPage}&_embed${searchParam}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const posts = await response.json()
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
    const total = parseInt(response.headers.get('X-WP-Total') || '0')

    return {
      posts,
      totalPages,
      total,
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

// Fetch single post by slug
export const fetchPostBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?slug=${slug}&_embed`)

    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }

    const posts = await response.json()
    return posts[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

// Fetch related posts by categories
export const fetchRelatedPosts = async (categoryIds, currentPostId, limit = 3) => {
  try {
    if (!categoryIds || categoryIds.length === 0) {
      // If no categories, just fetch recent posts
      const response = await fetch(`${API_BASE_URL}/posts?per_page=${limit}&exclude=${currentPostId}&_embed`)
      if (!response.ok) {
        throw new Error('Failed to fetch related posts')
      }
      return await response.json()
    }

    // Fetch posts from the same categories
    const categoriesParam = categoryIds.join(',')
    const response = await fetch(
      `${API_BASE_URL}/posts?categories=${categoriesParam}&per_page=${limit}&exclude=${currentPostId}&_embed`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch related posts')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories?per_page=100`)

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

// Fetch tags
export const fetchTags = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tags?per_page=100`)

    if (!response.ok) {
      throw new Error('Failed to fetch tags')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}

// Helper: Get featured image URL
export const getFeaturedImageUrl = (post, size = 'medium_large') => {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    const media = post._embedded['wp:featuredmedia'][0]
    return media?.media_details?.sizes?.[size]?.source_url || media?.source_url || null
  }
  return null
}

// Helper: Get author info
export const getAuthorInfo = (post) => {
  if (post._embedded && post._embedded.author) {
    return post._embedded.author[0]
  }
  return null
}

// Helper: Get categories
export const getPostCategories = (post) => {
  if (post._embedded && post._embedded['wp:term']) {
    return post._embedded['wp:term'][0] || []
  }
  return []
}

// Helper: Format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

// Helper: Strip HTML tags
export const stripHtml = (html) => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// Helper: Create excerpt
export const createExcerpt = (content, length = 150) => {
  const text = stripHtml(content)
  return text.length > length ? text.substring(0, length) + '...' : text
}

// Group posts by year and month
export const groupPostsByDate = (posts) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const grouped = {}

  posts.forEach((post) => {
    const date = new Date(post.date)
    const year = date.getFullYear()
    const month = date.getMonth()

    if (!grouped[year]) {
      grouped[year] = {}
    }

    if (!grouped[year][month]) {
      grouped[year][month] = []
    }

    grouped[year][month].push(post)
  })

  // Sort by year descending, month descending
  const sortedYears = Object.keys(grouped).sort((a, b) => b - a)
  const archive = sortedYears.map((year) => {
    const monthsData = Object.keys(grouped[year])
      .sort((a, b) => b - a)
      .map((monthIndex) => ({
        monthIndex: parseInt(monthIndex),
        monthName: months[monthIndex],
        posts: grouped[year][monthIndex],
        count: grouped[year][monthIndex].length,
      }))

    return {
      year: parseInt(year),
      months: monthsData,
      totalPosts: monthsData.reduce((sum, m) => sum + m.count, 0),
    }
  })

  return archive
}
