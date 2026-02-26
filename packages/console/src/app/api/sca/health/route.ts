import { loadScaEngine, loadProjectModule } from '@/lib/nexus-bridge';

export async function GET() {
  try {
    const proj = await loadProjectModule();
    const sca = await loadScaEngine();
    const activeSlug = await proj.getActiveProjectSlug();
    if (!activeSlug) return Response.json({ error: 'No active project' }, { status: 400 });
    const health = await sca.healthCheck(activeSlug);
    return Response.json(health);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
