import { loadDashboard } from '@/lib/nexus-bridge';

export async function GET() {
  try {
    const mod = await loadDashboard();
    const metrics = await mod.getDashboardMetrics();
    return Response.json(metrics);
  } catch (error: any) {
    // Return empty metrics if module fails
    return Response.json({
      totalProjects: 0,
      totalSubstrates: 0,
      totalBlocks: 0,
      totalOutputs: 0,
      routingRequests: 0,
      topSquads: [],
    });
  }
}
