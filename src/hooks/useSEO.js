import { useEffect } from 'react'

export const useSEO = ({ title, description, image, url, type = 'website' }) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} | Word of Pradipta`
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description)
    }

    // Update OG tags
    updateMetaTag('og:title', title ? `${title} | Word of Pradipta` : 'Word of Pradipta')
    updateMetaTag('og:description', description || 'Eksplorasi ide, cerita, dan pemikiran dalam kata-kata')
    updateMetaTag('og:image', image || '/og-image.jpg')
    updateMetaTag('og:url', url || window.location.href)
    updateMetaTag('og:type', type)

    // Update Twitter Card
    updateMetaTag('twitter:title', title ? `${title} | Word of Pradipta` : 'Word of Pradipta')
    updateMetaTag('twitter:description', description || 'Eksplorasi ide, cerita, dan pemikiran dalam kata-kata')
    updateMetaTag('twitter:image', image || '/og-image.jpg')
  }, [title, description, image, url, type])
}

const updateMetaTag = (property, content) => {
  if (!content) return

  let element = document.querySelector(`meta[property="${property}"]`)
  if (!element) {
    element = document.querySelector(`meta[name="${property}"]`)
  }

  if (element) {
    element.setAttribute('content', content)
  }
}

export const usePageTracking = () => {
  useEffect(() => {
    // Track page view (integrate with Google Analytics or similar)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: window.location.pathname,
      })
    }
  }, [])
}
