import { listSquads } from './registry.js'

export async function findSquadsByOutput(outputType) {
  const squads = await listSquads()
  return squads.filter(s => s.produces.includes(outputType))
}

export async function findSquadsByCategory(category) {
  const squads = await listSquads()
  return squads.filter(s => s.category === category)
}

export async function findSquadsByRequirements(categories) {
  const squads = await listSquads()
  return squads.filter(s =>
    s.requires.some(r => categories.includes(r))
  )
}
