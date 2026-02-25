import { readWithFrontmatter } from '../shared/fs-utils.js'
import { SubstrateFrontmatter } from '../shared/schemas.js'
import { SchemaError } from '../shared/errors.js'

export async function parseSubstrate(filePath) {
  const { frontmatter, content, wordCount } = await readWithFrontmatter(filePath)

  try {
    const validated = SubstrateFrontmatter.parse(frontmatter)
    return { frontmatter: validated, content, wordCount }
  } catch (error) {
    throw new SchemaError(`Invalid substrate frontmatter: ${error.message}`)
  }
}
