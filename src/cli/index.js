#!/usr/bin/env node

import { Command } from 'commander'
import projectCmd from './project.js'

const program = new Command()
  .name('nexus')
  .description('NEXUS — AI-powered Company Operating System')
  .version('0.1.0')

program.addCommand(projectCmd)

program.parse(process.argv)
