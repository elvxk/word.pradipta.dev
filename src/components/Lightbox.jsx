import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Lightbox.css'

const Lightbox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState({ src: '', alt: '' })

  useEffect(() => {
    const handleImageClick = (e) => {
      const target = e.target
      if (target.tagName === 'IMG' && target.closest('.post-body')) {
        e.preventDefault()
        setCurrentImage({
          src: target.src,
          alt: target.alt || '',
        })
        setIsOpen(true)
      }
    }

    const postBody = document.querySelector('.post-body')
    if (postBody) {
      postBody.addEventListener('click', handleImageClick)
    }

    return () => {
      if (postBody) {
        postBody.removeEventListener('click', handleImageClick)
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={currentImage.src} alt={currentImage.alt} className="lightbox-image" />

            {currentImage.alt && (
              <p className="lightbox-caption">{currentImage.alt}</p>
            )}
          </motion.div>

          {/* Close Button */}
          <button
            className="lightbox-close"
            onClick={() => setIsOpen(false)}
            aria-label="Tutup"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
