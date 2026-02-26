import { NextRequest, NextResponse } from 'next/server';
import { getNexusRoot } from '@/lib/nexus-bridge';
import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

interface Provider {
  id: string;
  name: string;
  type: 'llm' | 'transcription' | 'image-gen' | 'search';
  apiKey: string;
  endpoint: string;
  model: string;
  status: 'untested' | 'connected' | 'error';
}

async function readProviders(): Promise<Provider[]> {
  try {
    const data = await readFile(
      path.join(getNexusRoot(), '.nexus', 'providers.json'),
      'utf-8'
    );
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProviders(providers: Provider[]): Promise<void> {
  await writeFile(
    path.join(getNexusRoot(), '.nexus', 'providers.json'),
    JSON.stringify(providers, null, 2)
  );
}

function validateApiKeyFormat(key: string): boolean {
  return typeof key === 'string' && key.length >= 10;
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const providers = await readProviders();
    const provider = providers.find((p) => p.id === id);

    if (!provider) {
      return NextResponse.json(
        { success: false, message: 'Provider not found' },
        { status: 404 }
      );
    }

    if (!provider.apiKey) {
      return NextResponse.json({
        success: false,
        message: 'No API key configured',
      });
    }

    let success = false;
    let message = '';

    if (provider.type === 'llm') {
      try {
        const endpoint = provider.endpoint || 'https://api.openai.com/v1';
        const res = await fetch(`${endpoint}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${provider.apiKey}`,
          },
          body: JSON.stringify({
            model: provider.model || 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Hi' }],
            max_tokens: 5,
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (res.ok) {
          success = true;
          message = 'LLM connection successful';
        } else {
          const body = await res.json().catch(() => ({}));
          message = `LLM returned ${res.status}: ${body.error?.message || res.statusText}`;
        }
      } catch (err: any) {
        message = `Connection failed: ${err.message}`;
      }
    } else {
      // For transcription, image-gen, search: validate API key format
      if (validateApiKeyFormat(provider.apiKey)) {
        success = true;
        message = `API key format valid for ${provider.type} provider`;
      } else {
        message = 'API key appears to be invalid (too short)';
      }
    }

    // Update provider status
    provider.status = success ? 'connected' : 'error';
    await writeProviders(providers);

    return NextResponse.json({ success, message });
  } catch (error: any) {
    console.error('Error testing provider:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
