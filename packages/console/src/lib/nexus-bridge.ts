/**
 * NEXUS Bridge — Server-side only.
 * Uses eval-based require to bypass webpack bundling.
 */
import path from 'node:path';

export function getNexusRoot(): string {
  return process.env.NEXUS_ROOT || path.resolve(process.cwd(), '../..');
}

// Use eval('require') to bypass webpack's static analysis
const dynamicRequire = eval('require') as NodeRequire;

function loadModule(modulePath: string) {
  const root = getNexusRoot();
  const fullPath = path.join(root, modulePath);
  // Clear cache for hot reload in dev
  try { delete dynamicRequire.cache[dynamicRequire.resolve(fullPath)]; } catch {}
  return dynamicRequire(fullPath);
}

export async function loadProjectModule() {
  return loadModule('src/project/index.js');
}

export async function loadScaEngine() {
  return loadModule('src/sca-engine/index.js');
}

export async function loadSquadAdapter() {
  return loadModule('src/squad-adapter/index.js');
}

export async function loadCampaign() {
  return loadModule('src/campaign/index.js');
}

export async function loadDashboard() {
  return loadModule('src/dashboard/index.js');
}

export async function loadIntegrations() {
  return loadModule('src/integrations/index.js');
}

export async function loadExplorerMap() {
  return loadModule('src/explorer/map-builder.js');
}
