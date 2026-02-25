# Vendas Canhotos Squad

Squad de vendas B2B para a Innovatech Canhotos IA. Objetivo: sair de 3 para 30+ clientes com processo replicável que não depende exclusivamente de Leonardo.

---

## ICP (Perfil de Cliente Ideal)

| Critério | Detalhe |
|---------|---------|
| Tamanho | Transportadoras com 10+ veículos |
| Volume | 500+ canhotos/mês |
| Processo atual | Conferência manual de canhotos |
| Tecnologia | ERP ativo para integração |
| Decisor | Gerente de ops/TI ou dono direto |
| Dor principal | Tempo perdido, erros de faturamento, canhoto perdido |

---

## Agentes

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| 🎯 Qualificador de ICP | Filtro | Score Alta/Média/Baixa por empresa com justificativa e próximo passo | `@icp-qualifier` |
| 🏋️ Treinador de Representantes | Coach | Playbook completo: script, objeções, demonstração, cálculo de ROI ao vivo | `@sales-trainer` |
| 📡 Gestor de Pipeline | Radar | Rastreia todos os prospects com estágio, última interação e próximo passo | `@pipeline-manager` |
| 💰 Calculadora de ROI | Prova | Proposta de ROI personalizada em tempo real para cada prospect | `@roi-calculator` |

---

## Workflow Principal

```
Lead identificado → Filtro qualifica → Coach prepara representante
     ↓
Reunião/Demo
     ↓
Prova calcula ROI personalizado → Proposta enviada
     ↓
Radar gerencia follow-up até fechamento
```

---

## Início Rápido

```
# Qualificar uma empresa
@icp-qualifier
*qualify-lead "Transportadora XYZ"

# Gerar proposta de ROI
@roi-calculator
*roi-proposal

# Revisar pipeline
@pipeline-manager
*pipeline-review

# Preparar para objeção específica
@sales-trainer
*objection-response "já temos sistema"
```

---

## Estrutura do Squad

```
vendas-canhotos-squad/
├── squad.yaml
├── README.md
├── agents/
│   ├── icp-qualifier.md
│   ├── sales-trainer.md
│   ├── pipeline-manager.md
│   └── roi-calculator.md
├── tasks/
│   ├── qualify-lead.md
│   ├── roi-proposal.md
│   ├── pipeline-review.md
│   └── objection-response.md
├── workflows/
│   └── sales-cycle-workflow.md
├── checklists/
├── templates/
└── data/
```
