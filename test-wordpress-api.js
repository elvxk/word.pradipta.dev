// Test script to check WordPress API response structure
// Run this to see how WordPress sends code blocks

const testWordPressCodeBlock = async () => {
  const API_URL = 'https://word.pradipta.dev/wp-json/wp/v2/posts?per_page=5&_embed'

  try {
    const response = await fetch(API_URL)
    const posts = await response.json()

    console.log('=== WordPress API Code Block Analysis ===\n')

    posts.forEach((post, index) => {
      console.log(`\n--- Post ${index + 1}: ${post.title.rendered} ---`)
      console.log(`ID: ${post.id}`)

      // Check if content has code blocks
      const content = post.content.rendered
      const hasCode = content.includes('<code') || content.includes('<pre')

      console.log(`Has code blocks: ${hasCode}`)

      if (hasCode) {
        // Extract code blocks
        const codeRegex = /<code[^>]*class="([^"]*)"[^>]*>(.*?)<\/code>/gs
        const matches = content.matchAll(codeRegex)

        for (const match of matches) {
          const className = match[1]
          const codeContent = match[2].substring(0, 50) + '...'
          console.log(`  - Code block found:`)
          console.log(`    Class: "${className}"`)
          console.log(`    Content: ${codeContent}`)
        }

        // Also check pre blocks
        const preRegex = /<pre[^>]*class="([^"]*)"[^>]*>/g
        const preMatches = content.matchAll(preRegex)

        for (const match of preMatches) {
          console.log(`  - Pre block class: "${match[1]}"`)
        }
      }
    })

  } catch (error) {
    console.error('Error:', error)
  }
}

// Example of what WordPress typically sends:
console.log('\n=== Expected WordPress Code Block Formats ===\n')

console.log('1. Gutenberg Code Block:')
console.log('<pre class="wp-block-code"><code class="language-javascript">const x = 1;</code></pre>')

console.log('\n2. Classic Editor with SyntaxHighlighter:')
console.log('<pre class="brush: js"><code>const x = 1;</code></pre>')

console.log('\n3. Prismatic Plugin:')
console.log('<pre><code class="language-javascript">const x = 1;</code></pre>')

console.log('\n4. Plain Code (no language):')
console.log('<pre><code>const x = 1;</code></pre>')

// Run test (uncomment when needed)
// testWordPressCodeBlock()

export { testWordPressCodeBlock }
