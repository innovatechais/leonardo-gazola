# Knowledge Refinery Squad 🧠

**Archimedes — Second Brain Manager**

Um sistema de captura, organização e reativação inteligente de insights pessoais que transforma ideias temporárias em conhecimento permanente.

---

## 🎯 O Problema

Você tem ideias brilhantes, reflexões, insights — mas eles se perdem nas demandas do dia a dia.

- ❌ Ideias capturadas em bilhetes que você nunca revisa
- ❌ Pasta "organizar" que vira 4-6 cópias desorganizadas
- ❌ Nenhuma reativação proativa (você esquece sozinho)
- ❌ Sem conexão entre ideias relacionadas
- ❌ Tudo fica no Obsidian mas você não consulta

## ✅ A Solução

**Archimedes** é seu segundo cérebro pessoal:

1. **Captura rápida** — Bilhetes sem atrito (`@archimedes *capture Trabalho "Sua ideia"`)
2. **Armazenamento temporário organizado** — Por timeframe (1d, 3d, 7d, 30d)
3. **Reativação proativa** — "Você tem ideias dormentes há 10+ dias"
4. **Sugestões contextuais** — "Você está trabalhando com X? Tem Y relacionada aqui!"
5. **Integração Obsidian** — Tudo vira permanente automaticamente

---

## 🚀 Como Usar

### 1️⃣ Capturar Bilhete

```bash
@archimedes *capture Trabalho "Integração com cliente X" "Falei com eles ontem"
```

**Output:**
```
✅ Bilhete capturado!
   ID: nota-20250219-1745-abc123
   Status: inbox-0d (revisão em 3 dias)
```

### 2️⃣ Revisar por Timeframe

```bash
@archimedes *review-inbox 1d    # Últimas 24h
@archimedes *review-inbox 7d    # Últimos 7 dias
@archimedes *review-inbox all   # Tudo
```

### 3️⃣ Procurar Insights Dormentes

```bash
@archimedes *reactivate         # Top 3 sugestões
@archimedes *reactivate 10      # Top 10
```

**Exemplo de sugestão:**
```
🎯 Insights Dormentes

1️⃣ ⭐ ALTA PRIORIDADE (14 dias dormindo)
   "Integração API cliente X"
   💡 Você marcou como importante (8/10). Hora de decidir?
```

### 4️⃣ Arquivar para Permanente

```bash
@archimedes *archive nota-20250219-1745-abc123 Trabalho
```

Moves nota de inbox temporário para Obsidian permanente.

---

## 📁 Estrutura

```
/Users/leonardogazola/Obsidian/
├── Archive/
│   ├── 0-CAPTURE/              # Bilhetes novos (últimas 24h)
│   ├── 1-INBOX-3D/             # Review em 3 dias
│   ├── 2-INBOX-7D/             # Review em 7 dias
│   └── 3-ARCHIVE/
│       ├── Trabalho/
│       ├── Pessoal/
│       ├── Lazer/
│       ├── Estudos/
│       ├── Livros/
│       └── Aulas/
├── .archimedes-index.json      # Índice de todas as notas
└── .archimedes-config.yaml     # Configuração
```

---

## 🧠 Comandos do Archimedes

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `*capture` | Capturar bilhete rápido | `*capture Trabalho "Ideia"` |
| `*review-inbox` | Revisar por timeframe | `*review-inbox 7d` |
| `*reactivate` | Procurar dormentes | `*reactivate 5` |
| `*archive` | Arquivar para permanente | `*archive nota-xxx Trabalho` |
| `*search` | Buscar notas | `*search "cliente X"` |
| `*stats` | Ver estatísticas | `*stats` |
| `*status` | Ver status atual | `*status` |
| `*help` | Ver todos os comandos | `*help` |

---

## 📊 Categorias

Default (extensível):
- **Trabalho** — Projetos, clientes, tarefas profissionais
- **Pessoal** — Vida pessoal, família, relacionamentos
- **Lazer** — Hobbies, diversão, relaxamento
- **Estudos** — Cursos, aprendizado, pesquisa
- **Livros** — Ideias de livros para escrever
- **Aulas** — Aulas para dar, conteúdo educacional

Pode criar mais categorias conforme necessário.

---

## 🔄 Fluxo Completo

```
1. CAPTURA
   @archimedes *capture Categoria "Ideia" [contexto]
   → Arquivo criado em Archive/0-CAPTURE/
   → Index atualizado

2. MONITORAMENTO (automático)
   → Após 3 dias: move para Archive/1-INBOX-3D/
   → Após 7 dias: move para Archive/2-INBOX-7D/

3. REVISÃO
   @archimedes *review-inbox 1d|3d|7d|30d|all
   → Lista todas as notas do período
   → Highlights do que precisa atenção

4. REATIVAÇÃO
   @archimedes *reactivate
   → Procura notas dormentes (10+ dias)
   → Sugere quando revistar

5. ARQUIVAMENTO
   @archimedes *archive nota-id Categoria
   → Move para Archive/3-ARCHIVE/{Categoria}/
   → Transforma em nota permanente no Obsidian
   → Index atualizado
```

---

## 💾 Metadados de Nota

Cada bilhete tem:

```yaml
id: nota-20250219-1745-abc123
title: Resumo da ideia (primeiros 60 chars)
category: Trabalho
date_captured: 2025-02-19T17:45:00Z
last_reviewed: null (atualizado quando revisar)
status: inbox-0d | inbox-3d | inbox-7d | archived
relevance_score: 5 (1-10)
tags: [tag1, tag2]
connections: []  (para ligar notas relacionadas)
```

---

## 🎯 Próximas Fases

### Fase 1 (Current) ✅
- [x] Squad + Agent Archimedes criados
- [x] 4 Tasks principais (capture, review, reactivate, archive)
- [x] Script de sincronização básico
- [x] Integração Obsidian

### Fase 2 (Planned)
- [ ] Monitoring automático (background sync)
- [ ] Detecção de padrões aprofundada
- [ ] Sugestões contextuais (baseadas no que você está fazendo)
- [ ] Exportação de relatórios

### Fase 3 (Future)
- [ ] Integração com IA para sugestões mais inteligentes
- [ ] Análise de conexões entre ideias
- [ ] Dashboard visual
- [ ] Colaboração (compartilhar insights com outros)

---

## 📝 Referências

- Agent definition: `agents/archimedes.md`
- Tasks: `tasks/{capture,review,reactivate,archive}-*.md`
- Script: `scripts/sync-obsidian.js`
- Templates: `templates/*.md`
- Config: `squad.yaml`

---

## 🤝 Contato

Criado como parte do **Synkra AIOS** para Leonardo Gazola.

**Última atualização:** 2025-02-19
**Versão:** 1.0.0
