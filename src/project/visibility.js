import { paths } from '../shared/paths.js'
import { readYaml, writeYaml } from '../shared/fs-utils.js'
import { getProject } from './registry.js'
import { VISIBILITY_LEVELS } from '../shared/constants.js'
import { ValidationError } from '../shared/errors.js'

export async function setVisibility(slug, level) {
  if (!VISIBILITY_LEVELS.includes(level)) {
    throw new ValidationError(`Invalid visibility level: ${level}. Must be one of: ${VISIBILITY_LEVELS.join(', ')}`)
  }

  const manifest = await getProject(slug)
  manifest.visibility = level

  await writeYaml(paths.manifestFile(slug), manifest)

  return manifest
}

export async function getVisibility(slug) {
  const manifest = await getProject(slug)
  return manifest.visibility
}
