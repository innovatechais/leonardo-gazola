import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readWithFrontmatter } from '../shared/fs-utils.js'

export async function healthCheck(projectSlug) {
  const substrateFiles = await glob(`${paths.substratesDir(projectSlug)}/S*-*.md`)
  const blockFiles = await glob(`${paths.blocksDir(projectSlug)}/*-*.md`)
  const contextFiles = await glob(`${paths.contextsDir(projectSlug)}/*-context.md`)
  const outputFiles = await glob(`${paths.outputsDir(projectSlug)}/*.md`)

  // Parse all
  const substrates = []
  for (const f of substrateFiles) {
    try {
      const { frontmatter } = await readWithFrontmatter(f)
      substrates.push({ ...frontmatter, filePath: f })
    } catch { /* skip invalid */ }
  }

  const blocks = []
  for (const f of blockFiles) {
    try {
      const { frontmatter } = await readWithFrontmatter(f)
      blocks.push({ ...frontmatter, filePath: f })
    } catch { /* skip invalid */ }
  }

  const contexts = []
  for (const f of contextFiles) {
    try {
      const { frontmatter } = await readWithFrontmatter(f)
      contexts.push({ ...frontmatter, filePath: f })
    } catch { /* skip invalid */ }
  }

  // Stale blocks
  const stale = blocks.filter(b => b.status === 'stale')

  // Orphan substrates (not referenced by any block)
  const referencedSubIds = new Set()
  for (const b of blocks) {
    if (b.substrates) {
      for (const sid of b.substrates) {
        referencedSubIds.add(sid)
      }
    }
  }
  const orphans = substrates.filter(s => !referencedSubIds.has(s.id))

  // Unused blocks (not referenced by any context)
  const referencedBlockIds = new Set()
  for (const c of contexts) {
    if (c.blocks_included) {
      for (const bid of c.blocks_included) {
        referencedBlockIds.add(bid)
      }
    }
  }
  const unused = blocks.filter(b => !referencedBlockIds.has(b.id))

  return {
    totals: {
      substrates: substrates.length,
      blocks: blocks.length,
      contexts: contexts.length,
      outputs: outputFiles.length,
    },
    stale,
    orphans,
    unused,
  }
}
