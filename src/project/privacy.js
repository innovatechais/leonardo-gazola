import { getProject } from './registry.js'
import { readYaml, writeYaml } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'
import { listProjects } from './registry.js'
import { glob } from 'glob'
import { readWithFrontmatter } from '../shared/fs-utils.js'
import { scanSensitiveContent } from '../shared/security.js'

export async function setVisibility(slug, level) {
  const validLevels = ['public', 'private', 'personal']
  if (!validLevels.includes(level)) {
    throw new Error(`Invalid visibility level: ${level}. Must be one of: ${validLevels.join(', ')}`)
  }

  const manifestPath = paths.manifestFile(slug)
  const manifest = await readYaml(manifestPath)
  manifest.visibility = level
  await writeYaml(manifestPath, manifest)

  return manifest
}

export function canShareWithSquad(visibility, squadCategory) {
  if (visibility === 'personal') {
    // Personal projects only share with non-commercial squads
    const commercialCategories = ['advertising', 'copywriting']
    return !commercialCategories.includes(squadCategory)
  }
  return true
}

export async function auditVisibility() {
  const projects = await listProjects()
  const report = []

  for (const project of projects) {
    const substrateFiles = await glob(`${paths.substratesDir(project.slug)}/S*.md`)
    let sensitiveCount = 0

    for (const file of substrateFiles) {
      const { content } = await readWithFrontmatter(file)
      const scan = scanSensitiveContent(content)
      if (scan.found) sensitiveCount++
    }

    report.push({
      slug: project.slug,
      visibility: project.visibility,
      substrates: substrateFiles.length,
      sensitiveSubstrates: sensitiveCount,
      sharedSubstrates: project.shared_substrates?.length || 0,
    })
  }

  return report
}
