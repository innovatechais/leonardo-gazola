import fs from 'fs-extra'
import path from 'node:path'
import { paths } from '../shared/paths.js'
import { getProject } from './registry.js'
import { exists, ensureDir } from '../shared/fs-utils.js'

export async function archiveProject(slug) {
  await getProject(slug) // throws if not found

  const sourceDir = paths.projectDir(slug)
  const archiveDir = path.join(paths.knowledgeDir(), '_archived', slug)

  await ensureDir(path.dirname(archiveDir))
  await fs.move(sourceDir, archiveDir, { overwrite: false })

  return archiveDir
}

export async function restoreProject(slug) {
  const archiveDir = path.join(paths.knowledgeDir(), '_archived', slug)
  const targetDir = paths.projectDir(slug)

  if (!(await exists(archiveDir))) {
    throw new Error(`Archived project '${slug}' not found`)
  }

  if (await exists(targetDir)) {
    throw new Error(`Project '${slug}' already exists — cannot restore`)
  }

  await fs.move(archiveDir, targetDir)
  return targetDir
}

export async function listArchivedProjects() {
  const archiveBase = path.join(paths.knowledgeDir(), '_archived')
  if (!(await exists(archiveBase))) return []

  const entries = await fs.readdir(archiveBase, { withFileTypes: true })
  return entries
    .filter(e => e.isDirectory())
    .map(e => e.name)
}
