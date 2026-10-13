import { motion } from 'framer-motion'
import { siteConfig } from '../config'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero */}
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="about-title">
            Tentang{' '}
            <span className="title-highlight">
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

          <div className="hero-decoration">
            <div className="decoration-dot dot-1" />
            <div className="decoration-dot dot-2" />
            <div className="decoration-dot dot-3" />
          </div>
        </motion.section>

        {/* Content */}
        <motion.section
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="about-card">
            <h2>Apa itu Word of Pradipta?</h2>
            <p>
              Word of Pradipta adalah ruang digital untuk berbagi ide, cerita, dan pemikiran yang
              dituangkan dalam kata-kata. Di sini, setiap tulisan adalah jendela ke dunia gagasan
              yang beragam dan menarik.
            </p>
          </div>

          <div className="about-card">
            <h2>Visi Kami</h2>
            <p>
              Menciptakan platform yang menginspirasi pembaca untuk berpikir lebih dalam,
              mengeksplorasi perspektif baru, dan menemukan makna dalam setiap kata yang dibagikan.
            </p>
          </div>

          <div className="about-card">
            <h2>Apa yang Kami Tulis?</h2>
            <ul>
              <li>Teknologi dan inovasi terkini</li>
              <li>Pengembangan personal dan profesional</li>
              <li>Pemikiran dan filosofi kehidupan</li>
              <li>Cerita dan pengalaman inspiratif</li>
              <li>Tips dan panduan praktis</li>
            </ul>
          </div>

          <div className="about-card">
            <h2>Siapa di Balik Blog Ini?</h2>
            <p>
              Halo, saya Pradipta — atau lebih dikenal dengan nama elvxk. Saya seorang developer,
              penulis, dan pemikir yang gemar mengeksplorasi ide di berbagai bidang. Blog ini
              adalah tempat saya menulis tentang apa yang saya pelajari, alami, dan pikirkan.
            </p>
            <p>
              Anda bisa mengenal saya lebih jauh, melihat proyek-proyek saya, atau menghubungi saya
              langsung melalui website personal saya.
            </p>
          </div>

          <div className="about-card highlight-card">
            <h2>Mari Terhubung</h2>
            <p>
              Setiap pembaca adalah bagian dari komunitas ini. Kami percaya bahwa dialog dan
              pertukaran ide membuat tulisan menjadi lebih bermakna. Jangan ragu untuk berbagi
              pemikiran Anda!
            </p>
            <a
              href="https://pradipta.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="about-cta-button"
            >
              Kunjungi pradipta.dev
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About
