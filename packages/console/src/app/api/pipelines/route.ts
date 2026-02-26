import { loadCampaign } from '@/lib/nexus-bridge';

export async function GET() {
  try {
    const mod = await loadCampaign();
    const pipelines = await mod.listPipelines();
    return Response.json(pipelines);
  } catch {
    return Response.json([]);
  }
}
