export function validateConsistency(stepResults, substrates = []) {
  const issues = []

  // Extract data for validation
  const allContent = stepResults
    .filter(r => r.status === 'completed' && r.output?.content)
    .map(r => r.output.content.toLowerCase())
    .join('\n')

  // Check tone consistency across outputs
  const toneIssues = checkToneConsistency(stepResults)
  issues.push(...toneIssues)

  // Check product name consistency against substrates
  const nameIssues = checkProductNameConsistency(allContent, substrates)
  issues.push(...nameIssues)

  // Check CTA presence
  const ctaIssues = checkCtaPresence(stepResults)
  issues.push(...ctaIssues)

  return {
    status: issues.length === 0 ? 'OK' : issues.some(i => i.severity === 'error') ? 'Inconsistência' : 'Warning',
    issues,
    totalChecks: 3,
    passed: 3 - (issues.length > 0 ? 1 : 0),
  }
}

function checkToneConsistency(stepResults) {
  const issues = []
  const copyResults = stepResults.filter(r =>
    r.outputType && ['landing-page', 'tsl', 'email-sequences', 'ad-copy'].includes(r.outputType),
  )

  if (copyResults.length > 1) {
    // Simplified check: just flag that tone should be reviewed
    issues.push({
      check: 'tone_consistency',
      severity: 'warning',
      message: `${copyResults.length} copy outputs detected — verify tone consistency across outputs`,
      suggestion: 'Review all copy outputs use the same tone and voice',
    })
  }

  return issues
}

function checkProductNameConsistency(allContent, substrates) {
  const issues = []

  const productSubstrates = substrates.filter(s =>
    s.frontmatter?.category === 'product' || s.frontmatter?.category === 'identity',
  )

  if (productSubstrates.length > 0 && allContent.length > 0) {
    for (const sub of productSubstrates) {
      const title = sub.frontmatter?.title?.toLowerCase()
      if (title && !allContent.includes(title)) {
        issues.push({
          check: 'product_name',
          severity: 'warning',
          message: `Product/identity "${sub.frontmatter.title}" (${sub.frontmatter.id}) not found in outputs`,
          suggestion: `Verify outputs reference "${sub.frontmatter.title}" correctly`,
        })
      }
    }
  }

  return issues
}

function checkCtaPresence(stepResults) {
  const issues = []
  const ctaKeywords = ['compre', 'clique', 'saiba mais', 'garanta', 'acesse', 'buy', 'click', 'get', 'start']

  const landingResults = stepResults.filter(r =>
    r.outputType && ['landing-page', 'ad-copy'].includes(r.outputType) && r.output?.content,
  )

  for (const result of landingResults) {
    const content = result.output.content.toLowerCase()
    const hasCta = ctaKeywords.some(kw => content.includes(kw))
    if (!hasCta) {
      issues.push({
        check: 'cta_presence',
        severity: 'warning',
        message: `No CTA detected in ${result.outputType} (${result.stepId})`,
        suggestion: 'Add a clear call-to-action to the output',
      })
    }
  }

  return issues
}

export function formatValidationReport(validation) {
  const lines = []
  lines.push(`## Consistency Validation: ${validation.status}`)
  lines.push('')

  if (validation.issues.length === 0) {
    lines.push('✅ All consistency checks passed')
  } else {
    for (const issue of validation.issues) {
      const icon = issue.severity === 'error' ? '❌' : '⚠️'
      lines.push(`${icon} **${issue.check}**: ${issue.message}`)
      if (issue.suggestion) {
        lines.push(`   💡 ${issue.suggestion}`)
      }
    }
  }

  return lines.join('\n')
}
