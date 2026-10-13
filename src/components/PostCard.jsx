import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getFeaturedImageUrl, formatDate, createExcerpt, getPostCategories } from '../services/wordpress'
import './PostCard.css'

const PostCard = ({ post, index = 0 }) => {
  const featuredImage = getFeaturedImageUrl(post)
  const categories = getPostCategories(post)
  const excerpt = createExcerpt(post.excerpt.rendered, 120)

  return (
    <motion.article
      className="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Featured Image */}
      {featuredImage && (
        <Link to={`/post/${post.slug}`} className="post-card-image-link">
          <div className="post-card-image-wrapper">
            <img
              src={featuredImage}
              alt={post.title.rendered}
              className="post-card-image"
              loading="lazy"
            />
            {/* Decorative Confetti */}
            <div className="confetti confetti-1" />
            <div className="confetti confetti-2" />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="post-card-content">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="post-card-categories">
            {categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="post-category-tag"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link to={`/post/${post.slug}`} className="post-card-title-link">
          <h3
            className="post-card-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>

        {/* Excerpt */}
        <p className="post-card-excerpt">{excerpt}</p>

        {/* Meta */}
        <div className="post-card-meta">
          <time className="post-date">{formatDate(post.date)}</time>
          <Link to={`/post/${post.slug}`} className="read-more">
            Baca selengkapnya
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default PostCard
