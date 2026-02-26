import { loadProjectModule } from '@/lib/nexus-bridge';

export async function GET() {
  try {
    const mod = await loadProjectModule();
    const projects = await mod.listProjects();
    const withStats = await Promise.all(
      projects.map(async (p: any) => ({
        ...p,
        stats: await mod.getProjectStats(p.slug).catch(() => ({ substrates: 0, blocks: 0, contexts: 0, outputs: 0 })),
      }))
    );
    return Response.json(withStats);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
