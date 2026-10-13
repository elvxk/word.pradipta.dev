import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchPosts, groupPostsByDate } from '../services/wordpress'
import './Archive.css'

const Archive = () => {
  const [archive, setArchive] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedYears, setExpandedYears] = useState({})
  const [expandedMonths, setExpandedMonths] = useState({})

  useEffect(() => {
    const loadArchive = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch all posts (per_page max 100)
        const data = await fetchPosts(1, 100)
        const grouped = groupPostsByDate(data.posts)
        setArchive(grouped)

        // Auto expand the most recent year
        if (grouped.length > 0) {
          setExpandedYears({ [grouped[0].year]: true })
        }
      } catch (err) {
        setError('Gagal memuat arsip')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadArchive()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }))
  }

  const toggleMonth = (key) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (loading) {
    return (
      <div className="archive-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Memuat arsip...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="archive-page">
        <div className="container">
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="archive-page">
      {/* Archive Header */}
      <motion.section
        className="archive-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <span className="archive-label">Arsip</span>
          <h1 className="archive-title">Arsip Artikel</h1>
          <p className="archive-description">
            Jelajahi semua artikel berdasarkan bulan dan tahun publikasi
          </p>
        </div>
      </motion.section>

      {/* Archive List */}
      <section className="archive-list-section">
        <div className="container">
          {archive.length === 0 ? (
            <div className="empty-container">
              <p className="empty-message">Belum ada artikel yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="archive-list">
              {archive.map((yearData) => (
                <div key={yearData.year} className="archive-year-group">
                  {/* Year Header */}
                  <button
                    onClick={() => toggleYear(yearData.year)}
                    className="archive-year-header"
                  >
                    <div className="archive-year-left">
                      <svg
                        className={`archive-chevron ${expandedYears[yearData.year] ? 'rotated' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                      <h2 className="archive-year">{yearData.year}</h2>
                    </div>
                    <span className="archive-year-count">{yearData.totalPosts} artikel</span>
                  </button>

                  {/* Months */}
                  {expandedYears[yearData.year] && (
                    <motion.div
                      className="archive-months"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {yearData.months.map((monthData) => {
                        const monthKey = `${yearData.year}-${monthData.monthIndex}`

                        return (
                          <div key={monthKey} className="archive-month-group">
                            {/* Month Header */}
                            <button
                              onClick={() => toggleMonth(monthKey)}
                              className="archive-month-header"
                            >
                              <div className="archive-month-left">
                                <svg
                                  className={`archive-chevron-sm ${expandedMonths[monthKey] ? 'rotated' : ''}`}
                                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                                <h3 className="archive-month">{monthData.monthName}</h3>
                              </div>
                              <span className="archive-month-count">{monthData.count} artikel</span>
                            </button>

                            {/* Posts */}
                            {expandedMonths[monthKey] && (
                              <motion.div
                                className="archive-posts"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                              >
                                {monthData.posts.map((post) => (
                                  <Link
                                    key={post.id}
                                    to={`/post/${post.slug}`}
                                    className="archive-post-item"
                                  >
                                    <span className="archive-post-day">
                                      {new Date(post.date).getDate()}
                                    </span>
                                    <span
                                      className="archive-post-title"
                                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                    />
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Archive
