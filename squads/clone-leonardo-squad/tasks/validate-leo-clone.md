---
task: Validate Leo Clone
responsavel: "@clone-builder-leo"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - clone_path: Caminho para o arquivo .md do clone
  - cenarios: Cenários de teste ou usar os padrão
Saida: |
  - score_fidelidade: Percentual de respostas alinhadas ao DNA real
  - aprovado: Sim (>= 80%) / Não (< 80%)
  - gaps_criticos: Áreas onde o clone falhou significativamente
Checklist:
  - "[ ] Selecionar 10 cenários de decisão reais de Leonardo"
  - "[ ] Executar o clone em cada cenário"
  - "[ ] Comparar resposta do clone com decisão/resposta real conhecida"
  - "[ ] Calcular score de fidelidade"
  - "[ ] Identificar gaps críticos"
  - "[ ] Definir aprovado (>= 80%) ou reprovado"
  - "[ ] Se reprovado: gerar plano de calibração"
  - "[ ] Se aprovado: recomendar validação final por Leonardo"
---

# *validate-leo-clone — Validação do Clone de Leonardo

Testa o clone com cenários reais para garantir fidelidade ao DNA de Leonardo.

## Cenários de Teste Padrão

1. "Um prospect diz que já tem sistema ERP — o que você faz?"
2. "Como você avalia se uma transportadora é um bom cliente?"
3. "Um investidor diz que o mercado de canhotos é pequeno demais"
4. "Qual é o maior diferencial competitivo da Innovatech?"
5. "Como você prioriza o que fazer quando tudo parece urgente?"
6. "Um cliente está sem usar o sistema há 2 semanas — o que você faz?"
7. "Quanto ROI a Innovatech gera para um cliente típico?"
8. "Como você pensa sobre a concorrência no mercado de transportes?"
9. "Qual é o próximo passo depois de fechar o round de R$1M?"
10. "O que diferencia um bom representante de vendas de um ruim?"

## Output Esperado

```
🔨 Forge-Leo — Validação do Clone
[data]

━━━━━━━━━━━━━━━━━━━━━━━━
RESULTADOS DOS CENÁRIOS
━━━━━━━━━━━━━━━━━━━━━━━━
✅ Cenário 1: [alinhado / parcialmente alinhado / desalinhado]
✅ Cenário 2: [resultado]
...
❌ Cenário 7: [resultado — gap identificado]

━━━━━━━━━━━━━━━━━━━━━━━━
SCORE DE FIDELIDADE: [X]%
━━━━━━━━━━━━━━━━━━━━━━━━
APROVADO: [Sim / Não]

GAPS CRÍTICOS:
• [área que o clone falhou] — Plano: [calibração necessária]

PRÓXIMO PASSO:
[Se aprovado] → Validação final por Leonardo pessoalmente
[Se reprovado] → Calibração em [áreas específicas] → nova rodada de testes
```
