import fs from 'fs-extra'
import { paths } from '../shared/paths.js'
import { getProject, createProject } from './registry.js'
import { exists } from '../shared/fs-utils.js'

export async function cloneProject(sourceSlug, newSlug) {
  const sourceManifest = await getProject(sourceSlug)

  if (await exists(paths.manifestFile(newSlug))) {
    throw new Error(`Project '${newSlug}' already exists`)
  }

  // Create new project with source settings
  const newManifest = await createProject(newSlug, {
    name: `${sourceManifest.name} (clone)`,
    description: sourceManifest.description,
    visibility: sourceManifest.visibility,
    market_profile: sourceManifest.market_profile,
    tone: sourceManifest.tone,
    tags: [...sourceManifest.tags],
    design_system: sourceManifest.design_system,
  })

  // Copy substrates
  const srcSubstrates = paths.substratesDir(sourceSlug)
  const dstSubstrates = paths.substratesDir(newSlug)
  if (await fs.pathExists(srcSubstrates)) {
    await fs.copy(srcSubstrates, dstSubstrates, { overwrite: false })
  }

  // Copy blocks
  const srcBlocks = paths.blocksDir(sourceSlug)
  const dstBlocks = paths.blocksDir(newSlug)
  if (await fs.pathExists(srcBlocks)) {
    await fs.copy(srcBlocks, dstBlocks, { overwrite: false })
  }

  return newManifest
}
