---
task: Build Leo Clone
responsavel: "@clone-builder-leo"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - dna_profile: Perfil de DNA estruturado de Leonardo (de @dna-extractor-leo)
  - escopo: ceo | vendas | tecnico | completo
Saida: |
  - agente_clone: Arquivo .md do agente-clone pronto para uso
  - cobertura: Quais capacidades estão cobertas vs. em lacuna
Checklist:
  - "[ ] Receber DNA profile de @dna-extractor-leo"
  - "[ ] Definir escopo do clone (CEO / Vendas / Técnico / Completo)"
  - "[ ] Estruturar persona com base no DNA"
  - "[ ] Definir comandos relevantes para o escopo"
  - "[ ] Injetar vocabulário e tom de Leonardo"
  - "[ ] Injetar heurísticas de decisão"
  - "[ ] Injetar conhecimento de contexto (transportes BR, Innovatech)"
  - "[ ] Definir limites do clone (o que ele não sabe)"
  - "[ ] Estruturar no template AIOS"
  - "[ ] Entregar para validação"
---

# *build-leo-clone — Construção do Agente-Clone de Leonardo

Monta o agente-clone com base no DNA extraído, seguindo o padrão AIOS.

## Output Esperado

```
🔨 Forge-Leo — Clone Construído
Escopo: {escopo} | [data]

━━━━━━━━━━━━━━━━━━━━━━━━
CAPACIDADES COBERTAS
━━━━━━━━━━━━━━━━━━━━━━━━
✅ [capacidade 1] — baseada em [DNA source]
✅ [capacidade 2] — baseada em [DNA source]

━━━━━━━━━━━━━━━━━━━━━━━━
LACUNAS DO CLONE
━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ [área sem DNA suficiente] — Clone irá escalonar para Leonardo
⚠️ [área sem DNA suficiente]

━━━━━━━━━━━━━━━━━━━━━━━━
ARQUIVO GERADO
━━━━━━━━━━━━━━━━━━━━━━━━
→ [path do arquivo .md do clone]

→ Próximo passo: *validate-leo-clone para testar fidelidade
```
