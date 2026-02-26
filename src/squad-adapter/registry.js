import { glob } from 'glob'
import { paths } from '../shared/paths.js'
import { readYaml } from '../shared/fs-utils.js'

export async function listSquads() {
  const squadsDir = paths.squadsDir()
  const capFiles = await glob(`${squadsDir}/*/capabilities.yaml`)
  const squadDirs = await glob(`${squadsDir}/*/squad.yaml`)

  const registered = new Map()
  for (const file of capFiles) {
    const caps = await readYaml(file)
    registered.set(caps.name, { ...caps, registered: true })
  }

  // Find unregistered squads (have squad.yaml but no capabilities.yaml)
  for (const file of squadDirs) {
    const squad = await readYaml(file)
    if (!registered.has(squad.name)) {
      registered.set(squad.name, {
        name: squad.name,
        category: 'unknown',
        produces: [],
        requires: [],
        funnel_stages: [],
        market_profiles: [],
        agents_count: squad.agents?.length || 0,
        pipeline_order: [],
        registered: false,
      })
    }
  }

  return Array.from(registered.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export async function getSquad(name) {
  const squads = await listSquads()
  const squad = squads.find(s => s.name === name)
  if (!squad) {
    throw new Error(`Squad '${name}' not found`)
  }
  return squad
}

export async function getSquadDetails(name) {
  const caps = await getSquad(name)
  const squadYamlPath = `${paths.squadsDir()}/${name}/squad.yaml`

  let squadYaml = null
  try {
    squadYaml = await readYaml(squadYamlPath)
  } catch { /* no squad.yaml */ }

  return { capabilities: caps, squad: squadYaml }
}
