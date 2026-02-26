export function createProgressTracker(pipeline) {
  const total = pipeline.steps.length
  let current = 0
  const results = []

  return {
    total,
    get current() { return current },
    get results() { return [...results] },
    get percentage() { return Math.round((current / total) * 100) },

    advance(result) {
      results.push(result)
      current++
    },

    formatProgress() {
      const bar = '█'.repeat(current) + '░'.repeat(total - current)
      return `[${bar}] ${current}/${total} steps (${this.percentage}%)`
    },

    formatStepStart(step) {
      return `⏳ Step ${current + 1}/${total}: ${step.name} (${step.squad})`
    },

    formatStepComplete(result) {
      const icon = result.status === 'completed' ? '✅' : '❌'
      return `${icon} ${result.stepName || result.stepId}: ${result.status}`
    },
  }
}
