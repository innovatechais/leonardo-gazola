import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readWithFrontmatter, writeWithFrontmatter, ensureDir } from '../shared/fs-utils.js'
import { BlockFrontmatter } from '../shared/schemas.js'
import { SubstrateNotFoundError, SchemaError, BrokenReferenceError } from '../shared/errors.js'

export async function composeBlock(blockDef, projectSlug) {
  try {
    BlockFrontmatter.parse(blockDef)
  } catch (error) {
    throw new SchemaError(`Invalid block: ${error.message}`)
  }

  const substrateContents = []
  const substratesMeta = []

  for (const subId of blockDef.substrates) {
    const pattern = `${paths.substratesDir(projectSlug)}/${subId}-*.md`
    const files = await glob(pattern)

    if (files.length === 0) {
      throw new BrokenReferenceError(`Substrate ${subId} not found in project ${projectSlug}`)
    }

    const { frontmatter, content } = await readWithFrontmatter(files[0])
    substrateContents.push(`## ${frontmatter.title} (${subId})\n\n${content}`)
    substratesMeta.push({ id: subId, title: frontmatter.title, updated_at: frontmatter.updated_at })
  }

  const compiledContent = substrateContents.join('\n\n---\n\n')
  const staleness = checkStalenessFromMeta(blockDef.compiled_at, substratesMeta)

  return { compiledContent, substrates: substratesMeta, staleness }
}

export async function checkStaleness(blockPath, projectSlug) {
  const { frontmatter } = await readWithFrontmatter(blockPath)
  const compiledAt = new Date(frontmatter.compiled_at).getTime()

  for (const subId of frontmatter.substrates) {
    const pattern = `${paths.substratesDir(projectSlug)}/${subId}-*.md`
    const files = await glob(pattern)
    if (files.length === 0) continue

    const { frontmatter: subFm } = await readWithFrontmatter(files[0])
    if (new Date(subFm.updated_at).getTime() > compiledAt) {
      return true
    }
  }

  return false
}

function checkStalenessFromMeta(compiledAt, substratesMeta) {
  const compiledTime = new Date(compiledAt).getTime()
  for (const sub of substratesMeta) {
    if (sub.updated_at && new Date(sub.updated_at).getTime() > compiledTime) {
      return true
    }
  }
  return false
}

export async function writeBlock(projectSlug, frontmatter, content) {
  const dir = paths.blocksDir(projectSlug)
  await ensureDir(dir)

  const slug = frontmatter.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const fileName = `${frontmatter.id}-${slug}.md`
  const filePath = `${dir}/${fileName}`

  await writeWithFrontmatter(filePath, frontmatter, content)
  return { filePath, fileName }
}

export async function markStale(blockPath) {
  const { frontmatter, content } = await readWithFrontmatter(blockPath)
  frontmatter.status = 'stale'
  await writeWithFrontmatter(blockPath, frontmatter, content)
}
