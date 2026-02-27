import TurndownService from 'turndown';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  hr: '---',
});

// Task list support
turndown.addRule('taskListItem', {
  filter: (node) => {
    return node.nodeName === 'LI' && node.querySelector('input[type="checkbox"]') !== null;
  },
  replacement: (_content, node) => {
    const el = node as HTMLElement;
    const checkbox = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const checked = checkbox?.checked ? 'x' : ' ';
    // Remove the checkbox from the text content
    const text = el.textContent?.replace(/^\s*/, '') || '';
    return `- [${checked}] ${text}\n`;
  },
});

// Strikethrough
turndown.addRule('strikethrough', {
  filter: ['s', 'del'],
  replacement: (content) => `~~${content}~~`,
});

// Highlight
turndown.addRule('highlight', {
  filter: 'mark',
  replacement: (content) => `==${content}==`,
});

// Callout blocks (Obsidian syntax)
turndown.addRule('callout', {
  filter: (node) => {
    return node.nodeName === 'DIV' && (node as HTMLElement).dataset.type === 'callout';
  },
  replacement: (_content, node) => {
    const el = node as HTMLElement;
    const calloutType = el.dataset.calloutType || 'note';
    const innerContent = el.querySelector('.callout-content')?.textContent || '';
    return `> [!${calloutType}]\n> ${innerContent.split('\n').join('\n> ')}\n\n`;
  },
});

// Table support — turndown handles tables natively with gfm plugin approach
turndown.addRule('tableCell', {
  filter: ['th', 'td'],
  replacement: (content) => ` ${content.trim()} |`,
});

turndown.addRule('tableRow', {
  filter: 'tr',
  replacement: (content) => `|${content}\n`,
});

turndown.addRule('table', {
  filter: 'table',
  replacement: (_content, node) => {
    const el = node as HTMLElement;
    const rows = Array.from(el.querySelectorAll('tr'));
    if (rows.length === 0) return '';

    const lines: string[] = [];
    rows.forEach((row, i) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const line = '| ' + cells.map((c) => c.textContent?.trim() || '').join(' | ') + ' |';
      lines.push(line);
      if (i === 0) {
        lines.push('| ' + cells.map(() => '---').join(' | ') + ' |');
      }
    });
    return '\n' + lines.join('\n') + '\n\n';
  },
});

export function htmlToMarkdown(html: string): string {
  return turndown.turndown(html);
}

export function markdownToHtml(md: string): string {
  // Simple markdown to HTML conversion for TipTap ingestion
  let html = md;

  // Code blocks (fenced) — must be before inline code
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    return `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code.trimEnd())}</code></pre>`;
  });

  // Callout blocks (Obsidian syntax) > [!type]
  html = html.replace(/^>\s*\[!(\w+)\]\s*\n((?:>\s?.*\n?)*)/gm, (_m, type, content) => {
    const inner = content.replace(/^>\s?/gm, '').trim();
    return `<div data-type="callout" data-callout-type="${type}"><div class="callout-content">${inner}</div></div>\n`;
  });

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr>');

  // Task lists
  html = html.replace(/^[-*]\s+\[x\]\s+(.+)$/gm, '<ul data-type="taskList"><li data-type="taskItem" data-checked="true">$1</li></ul>');
  html = html.replace(/^[-*]\s+\[\s\]\s+(.+)$/gm, '<ul data-type="taskList"><li data-type="taskItem" data-checked="false">$1</li></ul>');

  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, '<ul><li>$1</li></ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<ol><li>$1</li></ol>');

  // Blockquote (remaining, after callouts)
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<s>$1</s>');
  // Highlight
  html = html.replace(/==(.+?)==/g, '<mark>$1</mark>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Paragraphs — wrap remaining lines
  html = html.replace(/^(?!<[a-z/])((?!$).+)$/gm, '<p>$1</p>');

  // Merge adjacent same-type lists
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/<\/ol>\s*<ol>/g, '');
  html = html.replace(/<\/ul>\s*<ul data-type="taskList">/g, '');

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
