import { readYaml, exists } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'
import { glob } from 'glob'
import path from 'node:path'

export async function listIntegrations() {
  const configDir = path.join(paths.configDir(), 'integrations')
  const files = await glob(`${configDir}/*.yaml`)

  const integrations = []
  for (const file of files) {
    const config = await readYaml(file)
    integrations.push({
      name: config.name || path.basename(file, '.yaml'),
      type: config.type || 'unknown',
      status: config.enabled !== false ? 'enabled' : 'disabled',
      config: file,
    })
  }

  return integrations
}

export async function checkHealth(serviceName) {
  const configPath = path.join(paths.configDir(), 'integrations', `${serviceName}.yaml`)
  if (!(await exists(configPath))) {
    return { service: serviceName, status: 'not_configured', message: 'Integration not found' }
  }

  const config = await readYaml(configPath)

  // Check required env vars
  const missingEnv = (config.required_env || []).filter(envVar => !process.env[envVar])

  if (missingEnv.length > 0) {
    return {
      service: serviceName,
      status: 'misconfigured',
      message: `Missing env vars: ${missingEnv.join(', ')}`,
      missingEnv,
    }
  }

  return {
    service: serviceName,
    status: 'ready',
    message: 'All checks passed',
    config: { type: config.type, enabled: config.enabled !== false },
  }
}
