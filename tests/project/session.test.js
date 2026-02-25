import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { createProject } from '../../src/project/registry.js'
import { selectProject, getActiveProject, getActiveProjectSlug } from '../../src/project/session.js'
import { ProjectNotFoundError } from '../../src/shared/errors.js'

let tmpDir, originalEnv

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `nexus-test-${Date.now()}`)
  await fs.ensureDir(path.join(tmpDir, 'docs', 'knowledge'))
  originalEnv = process.env.NEXUS_ROOT
  process.env.NEXUS_ROOT = tmpDir
})

afterEach(async () => {
  process.env.NEXUS_ROOT = originalEnv
  await fs.remove(tmpDir)
})

describe('selectProject', () => {
  it('persists active project in session.yaml', async () => {
    await createProject('myproj')
    await selectProject('myproj')

    const sessionPath = path.join(tmpDir, '.aios', 'session.yaml')
    const exists = await fs.pathExists(sessionPath)
    expect(exists).toBe(true)
  })

  it('throws for nonexistent project', async () => {
    await expect(selectProject('ghost')).rejects.toThrow(ProjectNotFoundError)
  })
})

describe('getActiveProject', () => {
  it('returns null when no session', async () => {
    const result = await getActiveProject()
    expect(result).toBeNull()
  })

  it('returns active project after select', async () => {
    await createProject('active-proj', { name: 'Active' })
    await selectProject('active-proj')

    const project = await getActiveProject()
    expect(project.slug).toBe('active-proj')
    expect(project.name).toBe('Active')
  })

  it('returns null if active project was deleted', async () => {
    await createProject('temp')
    await selectProject('temp')
    await fs.remove(path.join(tmpDir, 'docs', 'knowledge', 'temp'))

    const result = await getActiveProject()
    expect(result).toBeNull()
  })
})

describe('getActiveProjectSlug', () => {
  it('returns null when no session', async () => {
    const result = await getActiveProjectSlug()
    expect(result).toBeNull()
  })

  it('returns slug after select', async () => {
    await createProject('slug-test')
    await selectProject('slug-test')

    const slug = await getActiveProjectSlug()
    expect(slug).toBe('slug-test')
  })
})
