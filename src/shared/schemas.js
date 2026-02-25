import { z } from 'zod'

export const ProjectManifest = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().optional(),
  visibility: z.enum(['public', 'private', 'personal']).default('private'),
  market_profile: z.string().default('pt-br-massa'),
  tone: z.string().default('professional'),
  created_at: z.string().datetime(),
  tags: z.array(z.string()).default([]),
  shared_substrates: z.array(z.string()).default([]),
  design_system: z.string().optional(),
})

export const SubstrateCategory = z.enum([
  'identity', 'product', 'pain', 'solution', 'objection',
  'differentiator', 'proof', 'offer', 'audience', 'context',
])

export const SubstrateFrontmatter = z.object({
  id: z.string().regex(/^S\d+$/),
  title: z.string().min(1),
  category: SubstrateCategory,
  version: z.number().int().positive().default(1),
  status: z.enum(['draft', 'approved', 'deprecated']).default('draft'),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  source: z.string().optional(),
})

export const FunnelStage = z.enum(['awareness', 'consideration', 'decision', 'loyalty'])

export const BlockFrontmatter = z.object({
  id: z.string().regex(/^[ACDL]\d+$/),
  title: z.string().min(1),
  funnel_stage: FunnelStage,
  substrates: z.array(z.string().regex(/^S\d+$/)).min(1),
  version: z.number().int().positive().default(1),
  status: z.enum(['current', 'stale', 'deprecated']).default('current'),
  compiled_at: z.string().datetime(),
})

export const ContextFrontmatter = z.object({
  project: z.string(),
  squad: z.string(),
  generated_at: z.string().datetime(),
  substrates_included: z.array(z.string()),
  blocks_included: z.array(z.string()),
  stale_blocks: z.array(z.string()).default([]),
})
