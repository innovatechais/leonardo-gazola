import { paths } from '../shared/paths.js'
import { readYaml, writeYaml, ensureDir, exists } from '../shared/fs-utils.js'
import { getProject } from './registry.js'
import { ProjectNotFoundError } from '../shared/errors.js'

export async function selectProject(slug) {
  // Validate project exists
  await getProject(slug)

  await ensureDir(paths.aiosDir())
  await writeYaml(paths.sessionFile(), { active_project: slug })

  return slug
}

export async function getActiveProject() {
  const sessionPath = paths.sessionFile()

  if (!(await exists(sessionPath))) {
    return null
  }

  const session = await readYaml(sessionPath)

  if (!session?.active_project) {
    return null
  }

  try {
    return await getProject(session.active_project)
  } catch (error) {
    if (error instanceof ProjectNotFoundError) {
      return null
    }
    throw error
  }
}

export async function getActiveProjectSlug() {
  const sessionPath = paths.sessionFile()

  if (!(await exists(sessionPath))) {
    return null
  }

  const session = await readYaml(sessionPath)
  return session?.active_project || null
}
