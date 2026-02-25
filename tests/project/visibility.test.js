import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { createProject } from '../../src/project/registry.js'
import { setVisibility, getVisibility } from '../../src/project/visibility.js'
import { ValidationError, ProjectNotFoundError } from '../../src/shared/errors.js'

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

describe('setVisibility', () => {
  it('changes visibility to public', async () => {
    await createProject('vis-test')
    const result = await setVisibility('vis-test', 'public')
    expect(result.visibility).toBe('public')
  })

  it('changes visibility to personal', async () => {
    await createProject('vis-test2')
    await setVisibility('vis-test2', 'personal')
    const vis = await getVisibility('vis-test2')
    expect(vis).toBe('personal')
  })

  it('throws ValidationError for invalid level', async () => {
    await createProject('vis-invalid')
    await expect(setVisibility('vis-invalid', 'secret')).rejects.toThrow(ValidationError)
  })

  it('throws ProjectNotFoundError for missing project', async () => {
    await expect(setVisibility('ghost', 'public')).rejects.toThrow(ProjectNotFoundError)
  })
})

describe('getVisibility', () => {
  it('returns default visibility', async () => {
    await createProject('default-vis')
    const vis = await getVisibility('default-vis')
    expect(vis).toBe('private')
  })
})
