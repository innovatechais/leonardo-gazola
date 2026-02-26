import { NextRequest, NextResponse } from 'next/server';
import { getNexusRoot } from '@/lib/nexus-bridge';
import path from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

interface Provider {
  id: string;
  name: string;
  type: 'llm' | 'transcription' | 'image-gen' | 'search';
  apiKey: string;
  endpoint: string;
  model: string;
  status: 'untested' | 'connected' | 'error';
}

function getProvidersPath(): string {
  return path.join(getNexusRoot(), '.nexus', 'providers.json');
}

async function readProviders(): Promise<Provider[]> {
  try {
    const data = await readFile(getProvidersPath(), 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProviders(providers: Provider[]): Promise<void> {
  const filePath = getProvidersPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(providers, null, 2));
}

function maskApiKey(key: string): string {
  if (!key || key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}

export async function GET() {
  try {
    const providers = await readProviders();
    const masked = providers.map((p) => ({ ...p, apiKey: maskApiKey(p.apiKey) }));
    return NextResponse.json(masked);
  } catch (error: any) {
    console.error('Error reading providers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const providers = await readProviders();

    const newProvider: Provider = {
      id: body.id || `provider-${Date.now()}`,
      name: body.name,
      type: body.type,
      apiKey: body.apiKey || '',
      endpoint: body.endpoint || '',
      model: body.model || '',
      status: 'untested',
    };

    providers.push(newProvider);
    await writeProviders(providers);

    return NextResponse.json({ ...newProvider, apiKey: maskApiKey(newProvider.apiKey) });
  } catch (error: any) {
    console.error('Error adding provider:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing provider id' }, { status: 400 });
    }

    let providers = await readProviders();
    providers = providers.filter((p) => p.id !== id);
    await writeProviders(providers);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting provider:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
