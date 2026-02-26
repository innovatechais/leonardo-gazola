import { loadSquadAdapter } from '@/lib/nexus-bridge';

export async function GET() {
  try {
    const mod = await loadSquadAdapter();
    const squads = await mod.listSquads();
    return Response.json(squads);
  } catch (error: any) {
    return Response.json([], { status: 200 });
  }
}
