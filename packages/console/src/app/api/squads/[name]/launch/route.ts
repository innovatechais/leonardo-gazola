import { loadSquadAdapter, loadProjectModule } from '@/lib/nexus-bridge';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const body = await request.json();
    const mod = await loadSquadAdapter();

    // Get active project
    let projectSlug = 'default';
    try {
      const projectMod = await loadProjectModule();
      const active = await projectMod.getActiveProject?.();
      if (active?.slug) projectSlug = active.slug;
    } catch {}

    // Execute the squad — this prepares context, plans agents, and returns execution plan
    const result = await mod.executeSquad(projectSlug, name, {
      targetAgent: body.targetAgent || null,
      dryRun: body.dryRun || false,
    });

    // Format summary for display
    const summary = mod.formatExecutionSummary(result);

    // Get squad details for enrichment
    let squad = null;
    try {
      squad = await mod.getSquadDetails(name);
    } catch {
      try { squad = await mod.getSquad(name); } catch {}
    }

    return Response.json({
      ...result,
      summary,
      squadDetails: squad,
      briefing: body.briefing || '',
    });
  } catch (error: any) {
    return Response.json(
      { error: error.message || 'Failed to launch squad' },
      { status: 500 }
    );
  }
}
