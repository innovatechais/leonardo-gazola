export class NexusError extends Error {
  constructor(message, { code, details } = {}) {
    super(message)
    this.name = 'NexusError'
    this.code = code
    this.details = details
  }
}

export class ValidationError extends NexusError {
  constructor(message, details) {
    super(message, { code: 'VALIDATION_ERROR', details })
    this.name = 'ValidationError'
  }
}

export class SchemaError extends ValidationError {
  constructor(message, details) {
    super(message, details)
    this.name = 'SchemaError'
  }
}

export class DuplicateIdError extends ValidationError {
  constructor(id) {
    super(`Duplicate ID: ${id}`, { id })
    this.name = 'DuplicateIdError'
  }
}

export class WordCountExceededError extends ValidationError {
  constructor(wordCount, max) {
    super(`Word count ${wordCount} exceeds maximum of ${max}`, { wordCount, max })
    this.name = 'WordCountExceededError'
  }
}

export class NotFoundError extends NexusError {
  constructor(message, details) {
    super(message, { code: 'NOT_FOUND', details })
    this.name = 'NotFoundError'
  }
}

export class ProjectNotFoundError extends NotFoundError {
  constructor(slug) {
    super(`Project not found: ${slug}`, { slug })
    this.name = 'ProjectNotFoundError'
  }
}

export class SubstrateNotFoundError extends NotFoundError {
  constructor(id, project) {
    super(`Substrate not found: ${id} in project ${project}`, { id, project })
    this.name = 'SubstrateNotFoundError'
  }
}

export class BlockNotFoundError extends NotFoundError {
  constructor(id, project) {
    super(`Block not found: ${id} in project ${project}`, { id, project })
    this.name = 'BlockNotFoundError'
  }
}

export class SquadNotFoundError extends NotFoundError {
  constructor(name) {
    super(`Squad not found: ${name}`, { name })
    this.name = 'SquadNotFoundError'
  }
}

export class PipelineNotFoundError extends NotFoundError {
  constructor(name) {
    super(`Pipeline not found: ${name}`, { name })
    this.name = 'PipelineNotFoundError'
  }
}

export class StalenessError extends NexusError {
  constructor(message, details) {
    super(message, { code: 'STALENESS', details })
    this.name = 'StalenessError'
  }
}

export class BlockStaleError extends StalenessError {
  constructor(blockId) {
    super(`Block is stale: ${blockId}`, { blockId })
    this.name = 'BlockStaleError'
  }
}

export class ContextStaleError extends StalenessError {
  constructor(squad) {
    super(`Context is stale for squad: ${squad}`, { squad })
    this.name = 'ContextStaleError'
  }
}

export class BrokenReferenceError extends NexusError {
  constructor(source, target) {
    super(`Broken reference: ${source} → ${target}`, { code: 'BROKEN_REF', details: { source, target } })
    this.name = 'BrokenReferenceError'
  }
}

export class SecurityError extends NexusError {
  constructor(message, details) {
    super(message, { code: 'SECURITY', details })
    this.name = 'SecurityError'
  }
}

export class VisibilityError extends SecurityError {
  constructor(project, requiredLevel) {
    super(`Access denied: project ${project} requires visibility ${requiredLevel}`, { project, requiredLevel })
    this.name = 'VisibilityError'
  }
}

export class SensitiveContentError extends SecurityError {
  constructor(pattern) {
    super(`Sensitive content detected: ${pattern}`, { pattern })
    this.name = 'SensitiveContentError'
  }
}

export class CampaignError extends NexusError {
  constructor(message, details) {
    super(message, { code: 'CAMPAIGN', details })
    this.name = 'CampaignError'
  }
}

export class StepExecutionError extends CampaignError {
  constructor(step, reason) {
    super(`Step execution failed: ${step} — ${reason}`, { step, reason })
    this.name = 'StepExecutionError'
  }
}

export class CampaignAbortedError extends CampaignError {
  constructor(campaignId) {
    super(`Campaign aborted: ${campaignId}`, { campaignId })
    this.name = 'CampaignAbortedError'
  }
}
