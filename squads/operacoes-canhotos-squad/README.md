# Operações Canhotos Squad

Squad de operações do produto Innovatech Canhotos IA. Garante que onboarding, saúde dos clientes e documentação técnica funcionem sem Leonardo como ponto central de falha.

---

## Clientes Monitorados

| Cliente | Setor | Status |
|---------|-------|--------|
| Jaloto | Transportadora | Ativo |
| Metaltintas | Tintas / Automotivo | Ativo |
| TareTar | Alimentos / Temperos | Ativo |

---

## Agentes

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| 🚀 Guia de Onboarding | Guia | Conduz novos clientes do contrato ao primeiro canhoto processado | `@onboarding-guide` |
| ⚙️ Arquiteto Técnico | Arquiteto | Documenta e explica a arquitetura do sistema no nível certo para cada audiência | `@tech-architect` |
| 💚 Monitor de Saúde | Sentinela | Monitora volume, erros e engajamento de cada cliente — avisa quando há risco | `@client-health-monitor` |

---

## Workflow Principal

```
Novo cliente assinado → Guia conduz onboarding (WhatsApp + ERP)
     ↓
Sentinela inicia monitoramento de saúde
     ↓
Arquiteto gera documentação técnica conforme necessário
     ↓
Sentinela alerta se cliente está em risco de churn
```

---

## Início Rápido

```
# Iniciar onboarding de novo cliente
@onboarding-guide
*onboarding-checklist {nome do cliente}

# Gerar documentação técnica
@tech-architect
*generate-tech-doc {audiência: dev|cto|investidor}

# Ver saúde dos clientes
@client-health-monitor
*client-health-report
```

---

## Estrutura do Squad

```
operacoes-canhotos-squad/
├── squad.yaml
├── README.md
├── agents/
│   ├── onboarding-guide.md
│   ├── tech-architect.md
│   └── client-health-monitor.md
├── tasks/
│   ├── onboarding-checklist.md
│   ├── generate-tech-doc.md
│   └── client-health-report.md
├── workflows/
│   └── client-onboarding-workflow.md
├── checklists/
├── templates/
└── data/
```
