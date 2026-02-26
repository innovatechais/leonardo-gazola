import { readFile, writeFile, unlink, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { getNexusRoot } from '@/lib/nexus-bridge';

function resolveSafe(filePath: string): string | null {
  const root = getNexusRoot();
  const resolved = path.resolve(root, filePath);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function getMimeType(ext: string): string {
  const map: Record<string, string> = {
    html: 'text/html', css: 'text/css', js: 'application/javascript',
    json: 'application/json', md: 'text/markdown', yaml: 'text/yaml',
    yml: 'text/yaml', txt: 'text/plain', svg: 'image/svg+xml',
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    webp: 'image/webp', gif: 'image/gif', pdf: 'application/pdf',
  };
  return map[ext] || 'text/plain';
}

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const filePath = decodeURIComponent(parts.join('/'));
  const resolved = resolveSafe(filePath);

  if (!resolved) return Response.json({ error: 'Invalid path' }, { status: 403 });

  try {
    const info = await stat(resolved);
    if (info.isDirectory()) return Response.json({ error: 'Is a directory' }, { status: 400 });

    const ext = path.extname(resolved).slice(1);
    const binary = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf', 'svg'].includes(ext);

    if (binary) {
      const buffer = await readFile(resolved);
      return new Response(buffer, { headers: { 'Content-Type': getMimeType(ext) } });
    }

    const content = await readFile(resolved, 'utf-8');
    return new Response(content, { headers: { 'Content-Type': getMimeType(ext) } });
  } catch {
    return Response.json({ error: 'File not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const filePath = decodeURIComponent(parts.join('/'));
  const resolved = resolveSafe(filePath);

  if (!resolved) return Response.json({ error: 'Invalid path' }, { status: 403 });

  // Protect framework files
  const rel = path.relative(getNexusRoot(), resolved);
  if (rel.startsWith('.aios-core/core') || rel.startsWith('.aios-core/development')) {
    return Response.json({ error: 'Protected file — read only' }, { status: 403 });
  }

  try {
    const content = await request.text();
    await writeFile(resolved, content, 'utf-8');
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const filePath = decodeURIComponent(parts.join('/'));
  const resolved = resolveSafe(filePath);

  if (!resolved) return Response.json({ error: 'Invalid path' }, { status: 403 });

  try {
    const body = await request.json().catch(() => ({}));
    if (body.type === 'directory') {
      await mkdir(resolved, { recursive: true });
    } else {
      // Ensure parent directory exists
      await mkdir(path.dirname(resolved), { recursive: true });
      await writeFile(resolved, body.content || '', 'utf-8');
    }
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const filePath = decodeURIComponent(parts.join('/'));
  const resolved = resolveSafe(filePath);

  if (!resolved) return Response.json({ error: 'Invalid path' }, { status: 403 });

  try {
    await unlink(resolved);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
