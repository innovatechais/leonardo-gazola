import { loadProjectModule } from '@/lib/nexus-bridge';

export async function GET() {
  try {
    const mod = await loadProjectModule();
    const project = await mod.getActiveProject();
    return Response.json(project || { slug: null });
  } catch (error: any) {
    return Response.json({ slug: null });
  }
}

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    const mod = await loadProjectModule();
    await mod.selectProject(slug);
    return Response.json({ success: true, slug });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
