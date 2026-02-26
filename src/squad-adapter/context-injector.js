import fs from 'fs-extra'
import path from 'node:path'
import { paths } from '../shared/paths.js'
import { generateContext, saveContext } from '../sca-engine/context-generator.js'
import { getSquad } from './registry.js'
import { exists } from '../shared/fs-utils.js'

export async function injectContext(projectSlug, squadName) {
  const squad = await getSquad(squadName)

  // Generate context document
  const { frontmatter, content, staleBlocks } = await generateContext(projectSlug, squadName)

  // Save to project contexts dir
  const contextPath = await saveContext(projectSlug, squadName, frontmatter, content)

  // Copy to squad directory for execution
  const squadContextPath = path.join(paths.squadsDir(), squadName, 'context.md')
  await fs.copy(contextPath, squadContextPath)

  // Determine injection target (first agent in pipeline)
  const injectionTarget = squad.pipeline_order?.[0] || null

  return {
    contextPath,
    squadContextPath,
    injectionTarget,
    staleBlocks: staleBlocks.map(b => b.frontmatter.id),
    substratesIncluded: frontmatter.substrates_included,
    blocksIncluded: frontmatter.blocks_included,
  }
}

export function buildTraceabilityFooter(projectSlug, squadName, result) {
  const now = new Date().toISOString()
  const lines = [
    '',
    '---',
    `> 📋 Rastreabilidade`,
    `> Project: ${projectSlug}`,
    `> Squad: ${squadName}`,
    `> Generated: ${now}`,
    `> Substrates: ${result.substratesIncluded.join(', ') || 'none'}`,
    `> Blocks: ${result.blocksIncluded.join(', ') || 'none'}`,
  ]

  if (result.staleBlocks.length > 0) {
    lines.push(`> ⚠️ Stale blocks: ${result.staleBlocks.join(', ')}`)
  }

  return lines.join('\n')
}

export async function hasExistingContext(squadName) {
  const contextPath = path.join(paths.squadsDir(), squadName, 'context.md')
  return exists(contextPath)
}
