import { readYaml, writeYaml, exists, ensureDir } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'
import { getProject, listProjects } from './registry.js'

export async function switchProject(slug) {
  const project = await getProject(slug)
  const sessionPath = paths.sessionFile()
  await ensureDir(paths.aiosDir())

  let session = {}
  if (await exists(sessionPath)) {
    session = await readYaml(sessionPath) || {}
  }

  session.active_project = slug
  session.switched_at = new Date().toISOString()
  await writeYaml(sessionPath, session)

  return project
}

export async function getActiveProject() {
  const sessionPath = paths.sessionFile()
  if (!(await exists(sessionPath))) return null

  const session = await readYaml(sessionPath)
  return session?.active_project || null
}

export async function listWorkspaceProjects() {
  const projects = await listProjects()
  const activeSlug = await getActiveProject()

  return projects.map(p => ({
    ...p,
    active: p.slug === activeSlug,
  }))
}
