import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { getNexusRoot } from '@/lib/nexus-bridge';

interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
  extension?: string;
  protected?: boolean;
}

const IGNORED = new Set([
  'node_modules', '.git', '.aios-core', 'coverage', '.claude',
  '.aios', 'dist', '.next', 'd', 'echo', 'find', 'mkdir', '-p', '-type',
]);

async function buildTree(dirPath: string, root: string, depth = 0): Promise<TreeNode[]> {
  if (depth > 4) return [];
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const nodes: TreeNode[] = [];

    const sorted = entries.sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of sorted) {
      if (IGNORED.has(entry.name) || entry.name.startsWith('.')) continue;

      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(root, fullPath);

      const node: TreeNode = {
        name: entry.name,
        path: relativePath,
        type: entry.isDirectory() ? 'directory' : 'file',
      };

      if (entry.isFile()) {
        node.extension = path.extname(entry.name).slice(1);
      }

      if (entry.isDirectory()) {
        node.children = await buildTree(fullPath, root, depth + 1);
      }

      nodes.push(node);
    }

    return nodes;
  } catch {
    return [];
  }
}

export async function GET() {
  const root = getNexusRoot();
  const tree = await buildTree(root, root);
  return Response.json(tree);
}
