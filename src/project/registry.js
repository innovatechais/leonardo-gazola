import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readYaml, writeYaml, ensureDir, exists } from '../shared/fs-utils.js'
import { ProjectManifest } from '../shared/schemas.js'
import { ProjectNotFoundError, SchemaError, DuplicateIdError } from '../shared/errors.js'

export async function createProject(slug, metadata = {}) {
  const projectDir = paths.projectDir(slug)

  if (await exists(paths.manifestFile(slug))) {
    throw new DuplicateIdError(slug)
  }

  const manifest = ProjectManifest.parse({
    slug,
    name: metadata.name || slug,
    description: metadata.description,
    visibility: metadata.visibility || 'private',
    market_profile: metadata.market_profile || 'pt-br-massa',
    tone: metadata.tone || 'professional',
    created_at: new Date().toISOString(),
    tags: metadata.tags || [],
    shared_substrates: metadata.shared_substrates || [],
    design_system: metadata.design_system,
  })

  await ensureDir(paths.substratesDir(slug))
  await ensureDir(paths.blocksDir(slug))
  await ensureDir(paths.contextsDir(slug))
  await ensureDir(paths.outputsDir(slug))

  await writeYaml(paths.manifestFile(slug), manifest)

  return manifest
}

export async function listProjects() {
  const pattern = `${paths.knowledgeDir()}/*/manifest.yaml`
  const files = await glob(pattern)
  const projects = []

  for (const file of files.sort()) {
    try {
      const data = await readYaml(file)
      const manifest = ProjectManifest.parse(data)
      projects.push(manifest)
    } catch {
      // skip invalid manifests
    }
  }

  return projects
}

export async function getProject(slug) {
  const manifestPath = paths.manifestFile(slug)

  if (!(await exists(manifestPath))) {
    throw new ProjectNotFoundError(slug)
  }

  const data = await readYaml(manifestPath)
  return ProjectManifest.parse(data)
}

export async function getProjectStats(slug) {
  const substrateFiles = await glob(`${paths.substratesDir(slug)}/S*.md`)
  const blockFiles = await glob(`${paths.blocksDir(slug)}/*.md`)
  const contextFiles = await glob(`${paths.contextsDir(slug)}/*.md`)
  const outputFiles = await glob(`${paths.outputsDir(slug)}/*.md`)

  return {
    substrates: substrateFiles.length,
    blocks: blockFiles.length,
    contexts: contextFiles.length,
    outputs: outputFiles.length,
  }
}
