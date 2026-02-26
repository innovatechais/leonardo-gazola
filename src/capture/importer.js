import fs from 'fs-extra'
import { splitDocument, detectFormat } from './splitter.js'
import { categorize } from './categorizer.js'

export async function importFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8')
  const format = detectFormat(filePath)
  const chunks = splitDocument(content, format)

  const suggestions = chunks.map((chunk, index) => {
    const id = `S${index + 1}`
    const category = categorize(chunk)
    const wordCount = chunk.split(/\s+/).filter(Boolean).length
    const preview = chunk.split(/\s+/).slice(0, 15).join(' ')

    return {
      id,
      title: extractTitle(chunk, format) || `Imported ${index + 1}`,
      category,
      content: chunk,
      wordCount,
      preview: `${preview}...`,
      source: filePath,
    }
  })

  return suggestions
}

function extractTitle(chunk, format) {
  if (format === 'markdown') {
    // Try to extract header
    const headerMatch = chunk.match(/^(.+?)[\n\r]/)
    if (headerMatch) {
      return headerMatch[1].replace(/^#+\s*/, '').trim().slice(0, 80)
    }
  }

  // Use first sentence
  const firstSentence = chunk.match(/^[^.!?\n]+[.!?]?/)
  if (firstSentence) {
    return firstSentence[0].trim().slice(0, 80)
  }

  return null
}
