import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitted(true)

        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          })
          setSubmitted(false)
        }, 5000)
      } else {
        throw new Error(data.message || 'Gagal mengirim pesan')
      }
    } catch (err) {
      console.error('Contact form error:', err)
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Hero */}
        <motion.section
          className="contact-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="contact-title">
            Mari{' '}
            <span className="title-highlight">
              Terhubung
              <svg
                className="highlight-swash"
                viewBox="0 0 300 60"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 10 30 Q 75 10, 150 30 T 290 30"
                  fill="var(--color-mint-splash)"
                  opacity="0.7"
                />
              </svg>
            </span>
          </h1>
          <p className="contact-description">
            Punya pertanyaan, saran, atau ingin berbagi ide? Kami senang mendengar dari Anda!
          </p>

          <div className="hero-decoration">
            <div className="decoration-dot dot-1" />
            <div className="decoration-dot dot-2" />
            <div className="decoration-dot dot-3" />
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="contact-form-wrapper">
            {submitted ? (
              <motion.div
                className="success-message"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="var(--color-mint-splash)" stroke="var(--color-ink-black)" strokeWidth="2" />
                    <path d="M20 32L28 40L44 24" stroke="var(--color-ink-black)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2>Terima kasih!</h2>
                <p>Pesan Anda telah terkirim. Kami akan merespons segera.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '12px 16px',
                      marginBottom: '20px',
                      backgroundColor: '#fee',
                      border: '1px solid #fcc',
                      borderRadius: '8px',
                      color: '#c33',
                    }}
                  >
                    {error}
                  </motion.div>
                )}
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nama Anda"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subjek</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Topik pesan Anda"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  <span>{loading ? 'Mengirim...' : 'Kirim Pesan'}</span>
                  {loading ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="15 35" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Cards */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M28 8L16 18L4 8M4 8V24H28V8H4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Email</h3>
              <p>Hubungi kami melalui email untuk diskusi lebih lanjut</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 10V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Responsif</h3>
              <p>Kami akan merespons pesan Anda dalam 1-2 hari kerja</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 4C10.5 4 6 8.5 6 14C6 20.5 16 28 16 28C16 28 26 20.5 26 14C26 8.5 21.5 4 16 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3>Lokasi</h3>
              <p>Berbasis di Indonesia, melayani global</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Contact
