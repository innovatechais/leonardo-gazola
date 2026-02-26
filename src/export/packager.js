import fs from 'fs-extra'
import path from 'node:path'
import { paths } from '../shared/paths.js'
import { ensureDir } from '../shared/fs-utils.js'

export async function packageTemplate(type, name, options = {}) {
  const timestamp = new Date().toISOString().slice(0, 10)
  const exportDir = path.join(paths.exportsDir(), `${type}-${name}-${timestamp}`)
  await ensureDir(exportDir)

  const manifest = {
    name,
    type,
    version: '1.0.0',
    exported_at: new Date().toISOString(),
    clean: options.clean !== false,
  }

  await fs.writeJson(path.join(exportDir, 'manifest.json'), manifest, { spaces: 2 })

  // Generate README
  await fs.writeFile(path.join(exportDir, 'README.md'), [
    `# ${name}`,
    '',
    `Type: ${type}`,
    `Exported: ${timestamp}`,
    '',
    '## Setup',
    '',
    '1. Copy this directory to your project',
    '2. Configure environment variables as needed',
    '3. Follow the documentation below',
    '',
    '## Contents',
    '',
    `This ${type} template includes all necessary definitions and examples.`,
    '',
    '---',
    'Exported by NEXUS',
  ].join('\n'))

  // Generate LICENSE
  await fs.writeFile(path.join(exportDir, 'LICENSE.md'), [
    '# License',
    '',
    `Copyright ${new Date().getFullYear()} Leonardo Gazola`,
    '',
    'All rights reserved. This template is provided for use within',
    'authorized NEXUS installations only.',
  ].join('\n'))

  // Generate SETUP
  await fs.writeFile(path.join(exportDir, 'SETUP.md'), [
    '# Setup Guide',
    '',
    `## ${name} (${type})`,
    '',
    '### Prerequisites',
    '',
    '- NEXUS CLI installed',
    '- Node.js 22+',
    '',
    '### Installation',
    '',
    '1. Import this template into your NEXUS installation',
    '2. Configure per the README',
  ].join('\n'))

  return { exportDir, manifest }
}
