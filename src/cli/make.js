import { Command } from 'commander'
import { analyzeRequest } from '../request-router/analyzer.js'
import { matchSquad } from '../request-router/matcher.js'
import { logRouting } from '../request-router/logger.js'
import { theme } from '../shared/constants.js'

export const makeCommand = new Command('make')
  .description('Route a content request to the right squad')
  .argument('<description...>', 'Description of what you want to create')
  .action(async (descParts) => {
    try {
      const description = descParts.join(' ')
      const analysis = await analyzeRequest(description)
      const match = await matchSquad(analysis)

      await logRouting(analysis, match)

      console.log(`\n${theme.squad} Request Analysis`)
      console.log(`   Request: "${analysis.original}"`)
      console.log(`   Output type: ${analysis.detectedOutputType || 'not detected'}`)
      console.log(`   Category: ${analysis.detectedCategory || 'not detected'}`)
      console.log(`   Confidence: ${analysis.confidence}`)

      if (match.matchType === 'none') {
        console.log(`\n${theme.error} ${match.fallback?.message || 'No squad found for this request'}`)
        return
      }

      if (match.matchType === 'ambiguous') {
        console.log(`\n⚠️  Multiple squads found:`)
        match.alternatives.forEach((name, i) => {
          console.log(`   ${i + 1}. ${name}`)
        })
        console.log(`\n   Recommended: ${match.squad}`)
      } else {
        console.log(`\n✅ Routed to: ${match.squad}`)
        console.log(`   Match type: ${match.matchType}`)
      }

      if (match.outputType) {
        console.log(`   Output: ${match.outputType}`)
      }
      console.log()
    } catch (error) {
      console.error(`${theme.error} ${error.message}`)
      process.exitCode = 1
    }
  })
