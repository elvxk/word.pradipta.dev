import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchPosts } from '../services/wordpress'
import PostCard from '../components/PostCard'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'
import './Category.css'

const Category = () => {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [categoryInfo, setCategoryInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  const currentPage = parseInt(searchParams.get('page') || '1')

  useEffect(() => {
    const loadCategoryPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        // First, get category ID from slug
        const categoryResponse = await fetch(
          `${import.meta.env.VITE_WORDPRESS_API_URL}/categories?slug=${slug}`
        )

        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category')
        }

        const categories = await categoryResponse.json()

        if (categories.length === 0) {
          setError('Kategori tidak ditemukan')
          setLoading(false)
          return
        }

        const category = categories[0]
        setCategoryInfo(category)

        // Then fetch posts in this category
        const postsResponse = await fetch(
          `${import.meta.env.VITE_WORDPRESS_API_URL}/posts?categories=${category.id}&page=${currentPage}&per_page=6&_embed`
        )

        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts')
        }

        const postsData = await postsResponse.json()
        const totalPages = parseInt(postsResponse.headers.get('X-WP-TotalPages') || '1')
        const total = parseInt(postsResponse.headers.get('X-WP-Total') || '0')

        setPosts(postsData)
        setPagination({
          currentPage,
          totalPages,
          total,
        })
      } catch (err) {
        setError('Gagal memuat artikel kategori')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCategoryPosts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug, currentPage])

  const handlePageChange = (page) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    setSearchParams(params)
  }

  if (loading) {
    return (
      <div className="category-page">
        <section className="category-posts-section">
          <div className="container">
            <div className="posts-grid">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="category-page">
      {/* Category Header */}
      <motion.section
        className="category-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="category-header-content">
            <span className="category-label">Kategori</span>
            <h1 className="category-title">{categoryInfo?.name}</h1>
            {categoryInfo?.description && (
              <p className="category-description">{categoryInfo.description}</p>
            )}
            <div className="category-meta">
              <span className="category-count">{pagination.total} artikel</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Posts Section */}
      <section className="category-posts-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="empty-container">
              <p className="empty-message">Belum ada artikel dalam kategori ini.</p>
            </div>
          ) : (
            <>
              <div className="posts-grid">
                {posts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Category
