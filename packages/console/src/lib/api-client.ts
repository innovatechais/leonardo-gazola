const BASE = '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Projects
  getProjects: () => request<any[]>('/api/projects'),
  getActiveProject: () => request<any>('/api/projects/active'),
  selectProject: (slug: string) =>
    request<any>('/api/projects/active', { method: 'POST', body: JSON.stringify({ slug }) }),

  // Dashboard
  getDashboard: () => request<any>('/api/dashboard'),

  // Files
  getFileTree: (path?: string) =>
    request<any[]>(`/api/files/tree${path ? `?path=${encodeURIComponent(path)}` : ''}`),
  getFile: (path: string) =>
    fetch(`/api/files/${encodeURIComponent(path)}`).then((r) => {
      if (!r.ok) throw new Error('Failed to read file');
      return r.text();
    }),
  saveFile: (path: string, content: string) =>
    fetch(`/api/files/${encodeURIComponent(path)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: content,
    }),
  createFile: (path: string, content = '') =>
    fetch(`/api/files/${encodeURIComponent(path)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: content,
    }).then((r) => {
      if (!r.ok) throw new Error('Failed to create file');
      return r.json();
    }),
  createFolder: (path: string) =>
    fetch(`/api/files/${encodeURIComponent(path)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'directory' }),
    }).then((r) => {
      if (!r.ok) throw new Error('Failed to create folder');
      return r.json();
    }),
  deleteFile: (path: string) =>
    fetch(`/api/files/${encodeURIComponent(path)}`, {
      method: 'DELETE',
    }).then((r) => {
      if (!r.ok) throw new Error('Failed to delete file');
      return r.json();
    }),

  // Squads
  getSquads: () => request<any[]>('/api/squads'),
  getSquad: (name: string) => request<any>(`/api/squads/${name}`),
  launchSquad: (name: string, data: any) =>
    request<any>(`/api/squads/${name}/launch`, { method: 'POST', body: JSON.stringify(data) }),

  // Pipelines
  getPipelines: () => request<any[]>('/api/pipelines'),

  // SCA
  getHealth: () => request<any>('/api/sca/health'),

  // Upload
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch('/api/upload', { method: 'POST', body: formData }).then((r) => {
      if (!r.ok) throw new Error('Upload failed');
      return r.json();
    });
  },

  // Providers
  getProviders: () => request<any[]>('/api/providers'),
  addProvider: (data: any) =>
    request<any>('/api/providers', { method: 'POST', body: JSON.stringify(data) }),
  testProvider: (id: string) =>
    request<any>(`/api/providers/${id}/test`, { method: 'POST' }),
  deleteProvider: (id: string) =>
    request<any>(`/api/providers?id=${encodeURIComponent(id)}`, { method: 'DELETE' }),

  // Commands
  getCommands: () => request<any[]>('/api/commands'),
};
