'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api-client';

interface Provider {
  id: string;
  name: string;
  type: 'llm' | 'transcription' | 'image-gen' | 'search';
  apiKey: string;
  endpoint: string;
  model: string;
  status: 'untested' | 'connected' | 'error';
}

const TYPE_OPTIONS = [
  { value: 'llm', label: 'LLM' },
  { value: 'transcription', label: 'Transcription' },
  { value: 'image-gen', label: 'Image Generation' },
  { value: 'search', label: 'Search' },
] as const;

const STATUS_COLORS: Record<string, string> = {
  connected: '#22c55e',
  untested: '#eab308',
  error: '#ef4444',
};

const TYPE_BADGE_COLORS: Record<string, string> = {
  llm: 'var(--color-accent-blue, #3b82f6)',
  transcription: 'var(--color-accent-purple, #a855f7)',
  'image-gen': 'var(--color-accent-green, #22c55e)',
  search: 'var(--color-accent-orange, #f97316)',
};

function ProviderCard({
  provider,
  onTest,
  onDelete,
}: {
  provider: Provider;
  onTest: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    await onTest(provider.id);
    setTesting(false);
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-default)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: STATUS_COLORS[provider.status] || STATUS_COLORS.untested,
              flexShrink: 0,
            }}
          />
          <span style={{ fontWeight: 600, fontSize: '14px' }}>{provider.name}</span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '9999px',
              background: TYPE_BADGE_COLORS[provider.type] || 'var(--color-accent-blue)',
              color: '#fff',
              fontWeight: 500,
            }}
          >
            {provider.type}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          {provider.status}
        </span>
      </div>

      {provider.model && (
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          Model: {provider.model}
        </div>
      )}

      <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
        API Key: {provider.apiKey}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <button
          onClick={handleTest}
          disabled={testing}
          style={{
            fontSize: '12px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-border-default)',
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            cursor: testing ? 'not-allowed' : 'pointer',
            opacity: testing ? 0.6 : 1,
          }}
        >
          {testing ? 'Testing...' : 'Test Connection'}
        </button>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            style={{
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--color-border-default)',
              background: 'var(--color-bg-primary)',
              color: '#ef4444',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        ) : (
          <button
            onClick={() => {
              onDelete(provider.id);
              setConfirming(false);
            }}
            style={{
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #ef4444',
              background: '#ef4444',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Confirm Delete
          </button>
        )}
      </div>
    </div>
  );
}

export function ProviderSettings() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: 'llm' as Provider['type'],
    apiKey: '',
    endpoint: '',
    model: '',
  });

  const fetchProviders = useCallback(async () => {
    try {
      const data = await api.getProviders();
      setProviders(data);
    } catch (err) {
      console.error('Failed to load providers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const handleAdd = async () => {
    if (!formData.name.trim()) return;
    try {
      await api.addProvider(formData);
      setFormData({ name: '', type: 'llm', apiKey: '', endpoint: '', model: '' });
      setShowForm(false);
      await fetchProviders();
    } catch (err) {
      console.error('Failed to add provider:', err);
    }
  };

  const handleTest = async (id: string) => {
    try {
      const result = await api.testProvider(id);
      alert(result.message);
      await fetchProviders();
    } catch (err: any) {
      alert(`Test failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProvider(id);
      await fetchProviders();
    } catch (err) {
      console.error('Failed to delete provider:', err);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid var(--color-border-default)',
    background: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    marginBottom: '4px',
    display: 'block',
  };

  return (
    <div style={{ padding: '32px', maxWidth: '720px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Settings</h2>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
        Configure providers and integrations
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600 }}>AI Providers</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            fontSize: '13px',
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            background: 'var(--color-accent-blue, #3b82f6)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          {showForm ? 'Cancel' : 'Add Provider'}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-default)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div>
            <label style={labelStyle}>Name</label>
            <input
              style={inputStyle}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. OpenAI Production"
            />
          </div>
          <div>
            <label style={labelStyle}>Type</label>
            <select
              style={inputStyle}
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Provider['type'] })}
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>API Key</label>
            <input
              style={inputStyle}
              type="password"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              placeholder="sk-..."
            />
          </div>
          <div>
            <label style={labelStyle}>Endpoint URL</label>
            <input
              style={inputStyle}
              value={formData.endpoint}
              onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
              placeholder="https://api.openai.com/v1"
            />
          </div>
          <div>
            <label style={labelStyle}>Default Model</label>
            <input
              style={inputStyle}
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder="gpt-4o"
            />
          </div>
          <button
            onClick={handleAdd}
            style={{
              fontSize: '13px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: 'var(--color-accent-blue, #3b82f6)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 500,
              alignSelf: 'flex-end',
            }}
          >
            Save Provider
          </button>
        </div>
      )}

      {loading ? (
        <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Loading providers...</p>
      ) : providers.length === 0 && !showForm ? (
        <div
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-default)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            No providers configured. Click &quot;Add Provider&quot; to get started.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} onTest={handleTest} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
