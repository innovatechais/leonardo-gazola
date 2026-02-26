import { readYaml, writeYaml } from '../shared/fs-utils.js'
import { paths } from '../shared/paths.js'
import { exists, ensureDir } from '../shared/fs-utils.js'
import path from 'node:path'

export async function logRouting(analysis, match) {
  const logFile = paths.routingLogFile()
  await ensureDir(path.dirname(logFile))

  let log = { entries: [] }
  if (await exists(logFile)) {
    log = await readYaml(logFile) || { entries: [] }
  }

  log.entries.push({
    timestamp: new Date().toISOString(),
    request: analysis.original,
    detected_output: analysis.detectedOutputType,
    detected_category: analysis.detectedCategory,
    confidence: analysis.confidence,
    matched_squad: match.squad,
    match_type: match.matchType,
    alternatives: match.alternatives,
  })

  await writeYaml(logFile, log)
}
