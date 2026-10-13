import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteConfig } from '../config'
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Illustration */}
          <div className="not-found-illustration">
            <span className="not-found-number">404</span>

            {/* Decorative Confetti */}
            <div className="confetti-404 confetti-404-1" />
            <div className="confetti-404 confetti-404-2" />
            <div className="confetti-404 confetti-404-3" />
            <div className="confetti-404 confetti-404-4" />
          </div>

          {/* Content */}
          <h1 className="not-found-title">Halaman Tidak Ditemukan</h1>
          <p className="not-found-description">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            Mungkin Anda ingin kembali ke beranda atau mencari artikel lainnya?
          </p>

          {/* Actions */}
          <div className="not-found-actions">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Kembali ke Beranda
            </button>

            <button
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Halaman Sebelumnya
            </button>
          </div>

          {/* Site Info */}
          <div className="not-found-info">
            <p>Atau jelajahi konten menarik lainnya di <strong>{siteConfig.siteName}</strong></p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
