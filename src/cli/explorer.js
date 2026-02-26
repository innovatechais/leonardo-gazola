import { Command } from 'commander'
import { createServer } from '../explorer/server.js'

export const explorerCommand = new Command('explorer')
  .description('Open the NEXUS Explorer — visual system map')
  .option('-p, --port <number>', 'Port number', '3737')
  .action(async (options) => {
    const port = parseInt(options.port, 10)
    const { start } = createServer(port)
    await start()
    console.log('  Press Ctrl+C to stop.\n')
  })
