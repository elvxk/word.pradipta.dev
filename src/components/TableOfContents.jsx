import { useState, useEffect } from 'react'
import './TableOfContents.css'

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Parse HTML content and extract headings
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headingElements = doc.querySelectorAll('h2, h3')

    const headingsList = Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent
      const level = heading.tagName.toLowerCase()
      const id = `heading-${index}`

      return {
        id,
        text,
        level,
      }
    })

    setHeadings(headingsList)

    // Add IDs to actual headings in the DOM after content is rendered
    setTimeout(() => {
      const actualHeadings = document.querySelectorAll('.post-body h2, .post-body h3')
      actualHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`
      })
    }, 100)
  }, [content])

  useEffect(() => {
    // Intersection Observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    )

    const headingElements = document.querySelectorAll('.post-body h2, .post-body h3')
    headingElements.forEach((heading) => observer.observe(heading))

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading))
    }
  }, [headings])

  const handleClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Don't show TOC if there are fewer than 3 headings
  if (headings.length < 3) {
    return null
  }

  return (
    <div className="table-of-contents">
      <div className="toc-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
        </svg>
        <h3>Daftar Isi</h3>
      </div>
      <nav className="toc-nav">
        <ul className="toc-list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`toc-item toc-${heading.level} ${activeId === heading.id ? 'active' : ''}`}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className="toc-link"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents
