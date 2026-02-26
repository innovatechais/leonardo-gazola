import { MAX_WORD_COUNT } from '../shared/constants.js'

export function detectFormat(filePath) {
  if (filePath.endsWith('.json')) return 'json'
  if (filePath.endsWith('.md')) return 'markdown'
  return 'text'
}

export function splitDocument(content, format) {
  switch (format) {
    case 'markdown': return splitMarkdown(content)
    case 'json': return splitJson(content)
    default: return splitText(content)
  }
}

function splitMarkdown(content) {
  const sections = content.split(/^##\s+/m).filter(Boolean)
  const chunks = []

  for (const section of sections) {
    const lines = section.trim()
    const wordCount = lines.split(/\s+/).filter(Boolean).length

    if (wordCount <= MAX_WORD_COUNT) {
      chunks.push(lines)
    } else {
      // Split further by paragraphs
      chunks.push(...splitByParagraphs(lines))
    }
  }

  return chunks.filter(c => c.trim().length > 0)
}

function splitText(content) {
  const paragraphs = content.split(/\n\n+/).filter(Boolean)
  const chunks = []

  let current = ''
  for (const para of paragraphs) {
    const combined = current ? `${current}\n\n${para}` : para
    const wordCount = combined.split(/\s+/).filter(Boolean).length

    if (wordCount <= MAX_WORD_COUNT) {
      current = combined
    } else {
      if (current) chunks.push(current.trim())
      current = para
    }
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks.filter(c => c.trim().length > 0)
}

function splitJson(content) {
  try {
    const data = JSON.parse(content)
    const chunks = []

    if (typeof data === 'object' && !Array.isArray(data)) {
      for (const [key, value] of Object.entries(data)) {
        const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
        chunks.push(`${key}: ${text}`)
      }
    } else if (Array.isArray(data)) {
      for (const item of data) {
        const text = typeof item === 'string' ? item : JSON.stringify(item, null, 2)
        chunks.push(text)
      }
    }

    return chunks.filter(c => c.trim().length > 0)
  } catch {
    return splitText(content)
  }
}

function splitByParagraphs(text) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean)
  const chunks = []
  let current = ''

  for (const para of paragraphs) {
    const paraWords = para.split(/\s+/).filter(Boolean).length

    if (paraWords > MAX_WORD_COUNT) {
      if (current) chunks.push(current.trim())
      current = ''
      // Force-split by word count
      const words = para.split(/\s+/)
      for (let i = 0; i < words.length; i += MAX_WORD_COUNT) {
        chunks.push(words.slice(i, i + MAX_WORD_COUNT).join(' '))
      }
      continue
    }

    const combined = current ? `${current}\n\n${para}` : para
    const wordCount = combined.split(/\s+/).filter(Boolean).length

    if (wordCount <= MAX_WORD_COUNT) {
      current = combined
    } else {
      if (current) chunks.push(current.trim())
      current = para
    }
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks
}
