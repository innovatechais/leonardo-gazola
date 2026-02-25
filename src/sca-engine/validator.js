import { glob } from 'glob'
import { SubstrateFrontmatter } from '../shared/schemas.js'
import { MAX_WORD_COUNT } from '../shared/constants.js'
import { paths } from '../shared/paths.js'
import { WordCountExceededError, SchemaError } from '../shared/errors.js'
import { scanSensitiveContent } from '../shared/security.js'
import { readWithFrontmatter } from '../shared/fs-utils.js'

export function validateSubstrateSchema(data) {
  try {
    return SubstrateFrontmatter.parse(data)
  } catch (error) {
    throw new SchemaError(`Invalid substrate: ${error.message}`)
  }
}

export function validateWordCount(content) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  if (wordCount > MAX_WORD_COUNT) {
    throw new WordCountExceededError(wordCount, MAX_WORD_COUNT)
  }
  return wordCount
}

export async function checkDuplicateCategory(projectSlug, category, excludeId = null) {
  const pattern = `${paths.substratesDir(projectSlug)}/S*-*.md`
  const files = await glob(pattern)

  for (const file of files) {
    const { frontmatter } = await readWithFrontmatter(file)
    if (frontmatter.category === category && frontmatter.id !== excludeId) {
      return { duplicate: true, existingId: frontmatter.id, existingTitle: frontmatter.title }
    }
  }

  return { duplicate: false }
}

export async function validateSubstrate(projectSlug, data, content) {
  const warnings = []

  const frontmatter = validateSubstrateSchema(data)
  const wordCount = validateWordCount(content)

  const sensitive = scanSensitiveContent(content)
  if (sensitive.length > 0) {
    warnings.push({ type: 'sensitive_content', matches: sensitive })
  }

  const dupCheck = await checkDuplicateCategory(projectSlug, data.category, data.id)
  if (dupCheck.duplicate) {
    warnings.push({
      type: 'duplicate_category',
      category: data.category,
      existingId: dupCheck.existingId,
      existingTitle: dupCheck.existingTitle,
    })
  }

  return { valid: true, frontmatter, wordCount, warnings }
}
