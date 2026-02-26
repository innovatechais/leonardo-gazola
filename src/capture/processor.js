import fs from 'fs-extra'
import { importFile } from './importer.js'

export async function processNote(filePath) {
  const content = await fs.readFile(filePath, 'utf-8')
  const suggestions = await importFile(filePath)

  return {
    filePath,
    content: content.slice(0, 500),
    suggestions,
    options: [
      'transform_substrate',
      'append_existing',
      'create_block',
      'archive',
      'skip',
    ],
  }
}

export function formatProcessingOptions(result) {
  const lines = []
  lines.push(`📝 ${result.filePath}`)
  lines.push(`   Preview: ${result.content.slice(0, 100)}...`)
  lines.push(`   Suggestions: ${result.suggestions.length} substrate(s) detected`)
  lines.push('')
  lines.push('   [1] Transformar em substrato')
  lines.push('   [2] Append a substrato existente')
  lines.push('   [3] Criar bloco')
  lines.push('   [4] Arquivar')
  lines.push('   [5] Pular')

  return lines.join('\n')
}
