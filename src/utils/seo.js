// SEO utilities for meta tags and social sharing

export const generateMetaTags = (data) => {
  const {
    title = 'Word of Pradipta',
    description = 'Eksplorasi ide, cerita, dan pemikiran dalam kata-kata',
    image = '/og-image.jpg',
    url = 'https://word.pradipta.dev',
    type = 'website',
  } = data

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      image,
      url,
      type,
      siteName: 'Word of Pradipta',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
    },
  }
}

export const updateMetaTags = (tags) => {
  // Update title
  if (tags.title) {
    document.title = tags.title
  }

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && tags.description) {
    metaDescription.setAttribute('content', tags.description)
  }

  // Update Open Graph tags
  if (tags.openGraph) {
    updateMetaTag('og:title', tags.openGraph.title)
    updateMetaTag('og:description', tags.openGraph.description)
    updateMetaTag('og:image', tags.openGraph.image)
    updateMetaTag('og:url', tags.openGraph.url)
    updateMetaTag('og:type', tags.openGraph.type)
    updateMetaTag('og:site_name', tags.openGraph.siteName)
  }

  // Update Twitter Card tags
  if (tags.twitter) {
    updateMetaTag('twitter:card', tags.twitter.card)
    updateMetaTag('twitter:title', tags.twitter.title)
    updateMetaTag('twitter:description', tags.twitter.description)
    updateMetaTag('twitter:image', tags.twitter.image)
  }
}

const updateMetaTag = (property, content) => {
  if (!content) return

  let element = document.querySelector(`meta[property="${property}"]`)
  if (!element) {
    element = document.querySelector(`meta[name="${property}"]`)
  }

  if (element) {
    element.setAttribute('content', content)
  } else {
    const meta = document.createElement('meta')
    if (property.startsWith('og:') || property.startsWith('twitter:')) {
      meta.setAttribute('property', property)
    } else {
      meta.setAttribute('name', property)
    }
    meta.setAttribute('content', content)
    document.head.appendChild(meta)
  }
}

export const generateStructuredData = (post) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title.rendered,
    description: post.excerpt.rendered,
    image: post.featured_image_url,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Person',
      name: post.author_name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Word of Pradipta',
      logo: {
        '@type': 'ImageObject',
        url: 'https://word.pradipta.dev/logo.png',
      },
    },
  }
}

export const addStructuredData = (data) => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
}
