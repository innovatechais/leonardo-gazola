export const MAX_WORD_COUNT = 200
export const MAX_PIPELINE_STEPS = 10
export const MAX_CONTEXT_SIZE = 50 * 1024 // 50KB warning
export const MAX_ROUTING_LOG_ENTRIES = 1000

export const SUBSTRATE_CATEGORIES = [
  'identity', 'product', 'pain', 'solution', 'objection',
  'differentiator', 'proof', 'offer', 'audience', 'context',
]

export const FUNNEL_STAGES = ['awareness', 'consideration', 'decision', 'loyalty']

export const VISIBILITY_LEVELS = ['public', 'private', 'personal']

export const SUBSTRATE_STATUSES = ['draft', 'approved', 'deprecated']

export const BLOCK_STATUSES = ['current', 'stale', 'deprecated']

export const theme = {
  success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️', stale: '🔄',
  project: '📁', substrate: '🧬', block: '🧱', context: '📋',
  output: '📄', squad: '👥', campaign: '🚀', pipeline: '⛓️',
  step_done: '●', step_active: '◉', step_pending: '○',
  awareness: '🔵', consideration: '🟡', decision: '🟢', loyalty: '🟣',
}
