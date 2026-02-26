import { readYaml } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'

export async function parseSquadConfig(squadName) {
  const squadPath = `${paths.squadsDir()}/${squadName}/squad.yaml`
  const config = await readYaml(squadPath)

  return {
    name: config.name,
    description: config.description || '',
    agents: (config.agents || []).map(a => ({
      id: a.id,
      name: a.name,
      role: a.role,
      icon: a.icon || '',
    })),
    tasks: config.components?.tasks || [],
    workflows: config.components?.workflows || [],
    slashPrefix: config.slashPrefix || null,
  }
}

export async function parseCapabilities(squadName) {
  const capPath = `${paths.squadsDir()}/${squadName}/capabilities.yaml`
  return readYaml(capPath)
}
