export function getFileIcon(name: string, isDir?: boolean): string {
  if (isDir) return '📁';
  const ext = name.split('.').pop()?.toLowerCase();
  const map: Record<string, string> = {
    md: '📝', yaml: '⚙️', yml: '⚙️', json: '📋', js: '🟨', ts: '🔷', tsx: '⚛️',
    jsx: '⚛️', css: '🎨', html: '🌐', svg: '🖼️', png: '🖼️', jpg: '🖼️',
    jpeg: '🖼️', webp: '🖼️', gif: '🖼️', pdf: '📕', mp3: '🎵', wav: '🎵',
    m4a: '🎵', txt: '📄', sh: '🐚', env: '🔒',
  };
  return map[ext || ''] || '📄';
}

export function getFileType(name: string): 'markdown' | 'code' | 'html' | 'pdf' | 'image' {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'md') return 'markdown';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (ext === 'pdf') return 'pdf';
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext || '')) return 'image';
  return 'code';
}

export function getMonacoLanguage(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  const map: Record<string, string> = {
    js: 'javascript', ts: 'typescript', tsx: 'typescriptreact', jsx: 'javascriptreact',
    json: 'json', yaml: 'yaml', yml: 'yaml', css: 'css', html: 'html',
    md: 'markdown', sh: 'shell', bash: 'shell', py: 'python', sql: 'sql',
  };
  return map[ext || ''] || 'plaintext';
}
