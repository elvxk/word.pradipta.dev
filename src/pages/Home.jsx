import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchPosts } from '../services/wordpress'
import { siteConfig } from '../config'
import PostCard from '../components/PostCard'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'
import HeroSearch from '../components/HeroSearch'
import './Home.css'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  const currentPage = parseInt(searchParams.get('page') || '1')
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchPosts(currentPage, 6, searchQuery)
        setPosts(data.posts)
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          total: data.total,
        })
      } catch (err) {
        setError('Gagal memuat artikel. Silakan coba lagi.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [currentPage, searchQuery])

  const handlePageChange = (page) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (searchQuery) params.set('q', searchQuery)
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (query) => {
    const params = new URLSearchParams()
    if (query.trim()) {
      params.set('q', query.trim())
      params.set('page', '1') // Reset to page 1 on new search
    }
    setSearchParams(params)
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Selamat Datang di{' '}
              <span className="hero-highlight">
                {siteConfig.siteName}
                <svg
                  className="highlight-swash"
                  viewBox="0 0 400 60"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 10 30 Q 100 10, 200 30 T 390 30"
                    fill="var(--color-mint-splash)"
                    opacity="0.7"
                  />
                </svg>
              </span>
            </h1>
            <p className="hero-description">
              {siteConfig.siteDescription}
            </p>

            {/* Hero Search */}
            <HeroSearch onSearch={handleSearch} initialQuery={searchQuery} />

            {/* Decorative Confetti */}
            <div className="hero-decoration">
              <div className="confetti-hero confetti-hero-1" />
              <div className="confetti-hero confetti-hero-2" />
              <div className="confetti-hero confetti-hero-3" />
              <div className="confetti-hero confetti-hero-4" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Posts Section */}
      <section className="posts-section">
        <div className="container">
          {searchQuery && (
            <motion.div
              className="search-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>
                Menampilkan hasil pencarian untuk: <strong>"{searchQuery}"</strong>
              </p>
              {pagination.total > 0 && (
                <p className="search-count">Ditemukan {pagination.total} artikel</p>
              )}
            </motion.div>
          )}

          {loading ? (
            <div className="posts-grid">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-container">
              <p className="empty-message">
                {searchQuery
                  ? 'Tidak ada artikel yang ditemukan untuk pencarian tersebut.'
                  : 'Belum ada artikel yang dipublikasikan.'}
              </p>
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

export default Home
