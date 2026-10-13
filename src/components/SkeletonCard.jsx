import './SkeletonCard.css'

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      {/* Image Skeleton */}
      <div className="skeleton-image" />

      {/* Content Skeleton */}
      <div className="skeleton-content">
        {/* Category Tags */}
        <div className="skeleton-tags">
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
        </div>

        {/* Title */}
        <div className="skeleton-title">
          <div className="skeleton-line skeleton-line-long" />
          <div className="skeleton-line skeleton-line-medium" />
        </div>

        {/* Excerpt */}
        <div className="skeleton-excerpt">
          <div className="skeleton-line skeleton-line-full" />
          <div className="skeleton-line skeleton-line-full" />
          <div className="skeleton-line skeleton-line-short" />
        </div>

        {/* Meta */}
        <div className="skeleton-meta">
          <div className="skeleton-line skeleton-line-small" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
