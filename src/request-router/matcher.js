import { readYaml } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'
import { listSquads } from '../squad-adapter/registry.js'

export async function matchSquad(analysis) {
  const rules = await readYaml(paths.routingRulesFile())

  // 1. Try explicit rule match by output type
  if (analysis.detectedOutputType) {
    const ruleMatch = findRuleMatch(analysis.detectedOutputType, rules)
    if (ruleMatch) {
      return {
        squad: ruleMatch.squad,
        outputType: analysis.detectedOutputType,
        matchType: 'rule',
        alternatives: [],
      }
    }
  }

  // 2. Try capability-based match
  const squads = await listSquads()

  if (analysis.detectedOutputType) {
    const capMatches = squads.filter(s =>
      s.produces.includes(analysis.detectedOutputType),
    )
    if (capMatches.length === 1) {
      return {
        squad: capMatches[0].name,
        outputType: analysis.detectedOutputType,
        matchType: 'capability',
        alternatives: [],
      }
    }
    if (capMatches.length > 1) {
      return {
        squad: capMatches[0].name,
        outputType: analysis.detectedOutputType,
        matchType: 'ambiguous',
        alternatives: capMatches.map(s => s.name),
      }
    }
  }

  // 3. Try category-based match
  if (analysis.detectedCategory) {
    const catMatches = squads.filter(s => s.category === analysis.detectedCategory)
    if (catMatches.length === 1) {
      return {
        squad: catMatches[0].name,
        outputType: null,
        matchType: 'category',
        alternatives: [],
      }
    }
    if (catMatches.length > 1) {
      return {
        squad: catMatches[0].name,
        outputType: null,
        matchType: 'ambiguous',
        alternatives: catMatches.map(s => s.name),
      }
    }
  }

  // 4. No match — fallback
  return {
    squad: null,
    outputType: analysis.detectedOutputType,
    matchType: 'none',
    alternatives: [],
    fallback: rules.fallback,
  }
}

function findRuleMatch(outputType, rules) {
  return rules.rules.find(r => r.output_types.includes(outputType)) || null
}
