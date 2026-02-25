import path from 'node:path'

export const paths = {
  root: () => path.resolve(process.env.NEXUS_ROOT || '.'),
  knowledgeDir: () => path.join(paths.root(), 'docs', 'knowledge'),
  projectDir: (slug) => path.join(paths.knowledgeDir(), slug),
  manifestFile: (slug) => path.join(paths.projectDir(slug), 'manifest.yaml'),
  substratesDir: (slug) => path.join(paths.projectDir(slug), 'substrates'),
  blocksDir: (slug) => path.join(paths.projectDir(slug), 'blocks'),
  contextsDir: (slug) => path.join(paths.projectDir(slug), 'contexts'),
  outputsDir: (slug) => path.join(paths.projectDir(slug), 'outputs'),
  configDir: () => path.join(paths.root(), 'config'),
  pipelinesDir: () => path.join(paths.configDir(), 'pipelines'),
  routingRulesFile: () => path.join(paths.configDir(), 'routing-rules.yaml'),
  squadContextMapFile: () => path.join(paths.configDir(), 'squad-context-map.yaml'),
  aiosDir: () => path.join(paths.root(), '.aios'),
  sessionFile: () => path.join(paths.aiosDir(), 'session.yaml'),
  routingLogFile: () => path.join(paths.aiosDir(), 'routing-log.yaml'),
  campaignsDir: () => path.join(paths.root(), 'campaigns'),
  exportsDir: () => path.join(paths.root(), 'exports'),
  squadsDir: () => path.join(paths.root(), 'squads'),
}
