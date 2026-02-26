import { readYaml } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'

export async function analyzeRequest(description) {
  const rules = await loadRoutingRules()
  const normalized = description.toLowerCase().trim()

  const detectedOutputType = detectOutputType(normalized, rules)
  const detectedCategory = detectCategory(normalized, rules)

  return {
    original: description,
    normalized,
    detectedOutputType,
    detectedCategory,
    confidence: detectedOutputType ? 'high' : detectedCategory ? 'medium' : 'low',
  }
}

function detectOutputType(text, rules) {
  for (const rule of rules.rules) {
    for (const outputType of rule.output_types) {
      if (text.includes(outputType)) {
        return outputType
      }
    }
  }
  return null
}

function detectCategory(text, rules) {
  const keywords = rules.category_keywords || {}
  let bestMatch = null
  let bestScore = 0

  for (const [category, words] of Object.entries(keywords)) {
    let score = 0
    for (const word of words) {
      if (text.includes(word)) score++
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = category
    }
  }

  return bestScore > 0 ? bestMatch : null
}

async function loadRoutingRules() {
  return readYaml(paths.routingRulesFile())
}
