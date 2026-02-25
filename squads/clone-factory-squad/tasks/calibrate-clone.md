---
task: Calibrate Clone
responsavel: "@clone-architect"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug do clone a calibrar
  - dimension: tom | frameworks | vocabulario | decisoes | crenças | storytelling | tudo
  - feedback: Descrição do problema observado durante uso ou validação
  - example_expected: Exemplo de como o clone deveria ter respondido
  - example_actual: Como o clone respondeu na prática
Saida: |
  - calibration_diff: O que foi alterado no clone (before/after)
  - updated_clone_file: Arquivo clone/{slug}.md atualizado
  - changelog: Registro da calibração com data e motivo
Checklist:
  - "[ ] Elicitar dimensão que precisa de calibração"
  - "[ ] Elicitar exemplo do comportamento incorreto"
  - "[ ] Elicitar como deveria ter sido a resposta"
  - "[ ] Localizar a seção correspondente no arquivo do clone"
  - "[ ] Propor ajuste específico (mostrar diff)"
  - "[ ] Pedir aprovação antes de salvar"
  - "[ ] Salvar arquivo atualizado"
  - "[ ] Registrar no changelog do clone"
  - "[ ] Sugerir novo teste de validação"
---

# *calibrate — Calibrate Clone

Forge ajusta o clone com base em feedback de uso real ou resultado de validação.
Mostra o diff exato do que vai mudar antes de salvar.

## Elicitação

```
⚗️ Forge — Calibração de Clone

? Qual clone você quer calibrar?
  → [slug ou nome]

? Qual dimensão precisa de ajuste?
  1. Tom de voz (muito formal, muito informal, etc.)
  2. Frameworks (não está usando os certos)
  3. Vocabulário (palavras erradas, não soa como a pessoa)
  4. Tomada de decisão (decisões incoerentes com a pessoa real)
  5. Crenças e posições (defendendo coisas que a pessoa não defenderia)
  6. Storytelling (não conta histórias como a pessoa)
  7. Tudo (recalibração geral)

? Descreva o problema observado:
  → [comportamento incorreto]

? Como deveria ter respondido?
  → [comportamento esperado]
```

## Output de Calibração

```
⚗️ Calibração — {pessoa} → Dimensão: {dimensão}

ANTES:
━━━━━━━━━━━━━━━━━━━
{trecho atual do arquivo}

DEPOIS:
━━━━━━━━━━━━━━━━━━━
{trecho proposto}

Confirmar calibração?
1. Sim, salvar
2. Ajustar a proposta antes de salvar
3. Cancelar

→ Após salvar: execute *validate-clone {slug} para confirmar melhoria
```

## Changelog do Clone

Cada calibração é registrada em `clones/{slug}-changelog.md`:

```markdown
## Calibração — {data}

**Dimensão ajustada:** {dimensão}
**Motivo:** {feedback do usuário}
**Alteração:** {resumo do diff}
**Score antes:** {X}%
**Score depois:** (pendente re-validação)
```
