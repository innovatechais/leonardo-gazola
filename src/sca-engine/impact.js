import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readWithFrontmatter } from '../shared/fs-utils.js'

export async function impactAnalysis(substrateId, projectSlug) {
  const affectedBlocks = []
  const affectedContexts = []

  // Find blocks referencing this substrate
  const blockPattern = `${paths.blocksDir(projectSlug)}/*-*.md`
  const blockFiles = await glob(blockPattern)

  for (const file of blockFiles) {
    const { frontmatter } = await readWithFrontmatter(file)
    if (frontmatter.substrates && frontmatter.substrates.includes(substrateId)) {
      affectedBlocks.push({ id: frontmatter.id, title: frontmatter.title, filePath: file })
    }
  }

  // Find contexts referencing affected blocks
  const contextPattern = `${paths.contextsDir(projectSlug)}/*-context.md`
  const contextFiles = await glob(contextPattern)
  const affectedBlockIds = affectedBlocks.map(b => b.id)

  for (const file of contextFiles) {
    const { frontmatter } = await readWithFrontmatter(file)
    const hasAffectedBlock = frontmatter.blocks_included?.some(bid => affectedBlockIds.includes(bid))
    const hasSubstrate = frontmatter.substrates_included?.includes(substrateId)

    if (hasAffectedBlock || hasSubstrate) {
      affectedContexts.push({ squad: frontmatter.squad, filePath: file })
    }
  }

  return { blocks: affectedBlocks, contexts: affectedContexts }
}
