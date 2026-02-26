#!/usr/bin/env node

import { Command } from 'commander'
import projectCmd from './project.js'
import { substrateCommand } from './substrate.js'
import { blockCommand } from './block.js'
import { contextCommand } from './context.js'
import { knowledgeCommand, addImpactToSubstrate } from './knowledge.js'

const program = new Command()
  .name('nexus')
  .description('NEXUS — AI-powered Company Operating System')
  .version('0.1.0')

program.addCommand(projectCmd)
program.addCommand(substrateCommand)
program.addCommand(blockCommand)
program.addCommand(contextCommand)
program.addCommand(knowledgeCommand)
addImpactToSubstrate(substrateCommand)

program.parse(process.argv)
