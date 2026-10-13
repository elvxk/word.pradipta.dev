import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchPostBySlug, fetchRelatedPosts, getFeaturedImageUrl, formatDate, getPostCategories, getAuthorInfo } from '../services/wordpress'
import { enhanceCodeBlocks } from '../utils/codeBlockProcessor'
import { calculateReadingTime, formatReadingTime } from '../utils/readingTime'
import { siteConfig } from '../config'
import PostCard from '../components/PostCard'
import ShareButtons from '../components/ShareButtons'
import Lightbox from '../components/Lightbox'
import './PostDetail.css'

const PostDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchPostBySlug(slug)
        if (!data) {
          setError('Artikel tidak ditemukan')
        } else {
          setPost(data)

          // Fetch related posts
          const categories = getPostCategories(data)
          const categoryIds = categories.map(cat => cat.id)
          const related = await fetchRelatedPosts(categoryIds, data.id, 3)
          setRelatedPosts(related)
        }
      } catch (err) {
        setError('Gagal memuat artikel')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Enhance code blocks after content is rendered
  useEffect(() => {
    if (!post) return

    let attempts = 0
    const maxAttempts = 5

    const tryEnhance = () => {
      const codeBlocks = document.querySelectorAll('.post-body pre code')
      console.log(`Attempt ${attempts + 1}: Found ${codeBlocks.length} code blocks`)

      if (codeBlocks.length > 0) {
        enhanceCodeBlocks()
        return true
      }
      return false
    }

    // Try immediately
    const immediateSuccess = tryEnhance()

    if (!immediateSuccess) {
      // If no code blocks found, keep trying with increasing delays
      const intervals = [100, 300, 500, 1000, 2000]
      const timers = intervals.map((delay, index) => {
        return setTimeout(() => {
          attempts = index + 1
          if (attempts < maxAttempts) {
            tryEnhance()
          }
        }, delay)
      })

      return () => {
        timers.forEach(timer => clearTimeout(timer))
      }
    }
  }, [post])

  if (loading) {
    return (
      <div className="post-detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Memuat artikel...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="post-detail-page">
        <div className="container">
          <div className="error-container">
            <p className="error-message">{error || 'Artikel tidak ditemukan'}</p>
            <button onClick={() => navigate('/')} className="back-button">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    )
  }

  const featuredImage = getFeaturedImageUrl(post, 'full')
  const categories = getPostCategories(post)
  const author = getAuthorInfo(post)
  const readingTime = calculateReadingTime(post.content.rendered)
  const readingTimeText = formatReadingTime(readingTime)

  // Create share URL and description
  const shareUrl = `${siteConfig.siteUrl}/post/${post.slug}`
  const shareDescription = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 200)

  return (
    <div className="post-detail-page">
      {/* Back Button */}
      <div className="container">
        <motion.button
          onClick={() => navigate(-1)}
          className="back-nav"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 16L6 10L12 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Kembali
        </motion.button>
      </div>

      {/* Article Content with Featured Image */}
      <motion.article
        className="post-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container">
          {/* Featured Image */}
          {featuredImage && (
            <div className="post-featured-image">
              <img src={featuredImage} alt={post.title.rendered} />
            </div>
          )}

          {/* Article Header */}
          <header className="post-header">
            {/* Title */}
            <h1 className="post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

            {/* Meta */}
            <div className="post-meta">
              {author && <span className="post-author">Oleh {author.name}</span>}
              <span className="post-date">{formatDate(post.date)}</span>
              <span className="post-reading-time">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 4.5V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {readingTimeText}
              </span>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="post-categories">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="category-tag"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

          {/* Share Buttons */}
          <div className="post-share-section">
            <ShareButtons
              url={shareUrl}
              title={post.title.rendered.replace(/<[^>]*>/g, '')}
              description={shareDescription}
            />
          </div>
        </div>
      </motion.article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          className="related-posts-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="container">
            <h2 className="related-posts-title">Artikel Terkait</h2>
            <div className="related-posts-grid">
              {relatedPosts.map((relatedPost, index) => (
                <PostCard key={relatedPost.id} post={relatedPost} index={index} />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Image Lightbox */}
      <Lightbox />
    </div>
  )
}

export default PostDetail
