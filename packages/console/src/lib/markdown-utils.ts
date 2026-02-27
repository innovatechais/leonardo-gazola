import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import TurndownService from 'turndown';

// ─── MD → HTML (remark/rehype pipeline) ─────────────────────────────

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml'])
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify, { allowDangerousHtml: true });

export function markdownToHtml(md: string): string {
  const result = processor.processSync(md);
  return String(result);
}

// ─── HTML → MD (Turndown) ───────────────────────────────────────────

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  hr: '---',
});

// Task list items
turndown.addRule('taskListItem', {
  filter: (node) => {
    return node.nodeName === 'LI' && node.querySelector('input[type="checkbox"]') !== null;
  },
  replacement: (_content, node) => {
    const el = node as HTMLElement;
    const checkbox = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const checked = checkbox?.checked ? 'x' : ' ';
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

// Callout blocks
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

// Tables
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
