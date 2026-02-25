---
task: Generate Tech Doc
responsavel: "@tech-architect"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - audiencia: dev | cto | investidor | cliente
  - foco: overview | componente_especifico | escala | seguranca
  - componente: whatsapp | ia | erp | supabase | n8n (se foco=componente)
Saida: |
  - documento: Documentação técnica formatada para a audiência
Checklist:
  - "[ ] Identificar audiência e nível de detalhe necessário"
  - "[ ] Selecionar componentes relevantes para essa audiência"
  - "[ ] Adaptar linguagem (técnica para dev/cto, conceitual para investidor/cliente)"
  - "[ ] Incluir números técnicos relevantes (acurácia, latência, throughput)"
  - "[ ] Adicionar diagrama de arquitetura se necessário"
  - "[ ] Revisar que nenhuma informação confidencial está exposta"
---

# *generate-tech-doc — Documentação Técnica

Gera documentação da arquitetura Innovatech no nível certo para cada audiência.

## Níveis de Detalhe por Audiência

| Audiência | Foco | Linguagem |
|----------|------|----------|
| dev | Stack, APIs, integrações, código | Técnica completa |
| cto | Arquitetura, escalabilidade, decisões | Técnica estruturada |
| investidor | Diferencial técnico, moat, roadmap | Conceitual com números |
| cliente | Como funciona o fluxo, o que ele precisa fazer | Simples, sem jargão |

## Output Exemplo — Para Investidor

```
⚙️ Arquiteto — Documentação Técnica: Innovatech Canhotos IA
Audiência: Investidor | [data]

━━━━━━━━━━━━━━━━━━━━━━━━
COMO FUNCIONA
━━━━━━━━━━━━━━━━━━━━━━━━
O colaborador fotografa o canhoto e envia pelo WhatsApp.
Em 2-3 segundos, nossa IA extrai todos os dados automaticamente.
O sistema integra direto com o ERP do cliente — sem digitação, sem erro.

━━━━━━━━━━━━━━━━━━━━━━━━
DIFERENCIAIS TÉCNICOS
━━━━━━━━━━━━━━━━━━━━━━━━
• Acurácia: ~99% — validado com clientes reais
• Latência: 2-3 segundos por canhoto
• Canal: WhatsApp (zero fricção — motorista já usa)
• Integrações: 15+ ERPs brasileiros nativos

━━━━━━━━━━━━━━━━━━━━━━━━
ESCALABILIDADE
━━━━━━━━━━━━━━━━━━━━━━━━
Capacidade atual: 50.000 transações/mês
Arquitetura projetada para: 500.000 transações/mês
Caminho técnico: [roadmap de escala]

━━━━━━━━━━━━━━━━━━━━━━━━
BARREIRA DE ENTRADA (MOAT)
━━━━━━━━━━━━━━━━━━━━━━━━
• WhatsApp Business API: 3-6 meses para aprovação — Innovatech já tem
• Integrações ERP: 4-8 semanas cada — head start de 18-24 meses
• Dados proprietários: rede de dados que melhora a IA — impossível de copiar
```
