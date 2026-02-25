# 🧠 Archimedes — Quick Start Guide

**Segunda versão do seu cérebro. Captura. Organiza. Reativa.**

---

## 5 Minutos para Começar

### 1️⃣ Capturar Sua Primeira Ideia

```bash
@archimedes *capture Trabalho "Integração com API do cliente X" "Falei com eles ontem"
```

✅ **Output esperado:**
```
✅ Bilhete capturado!
   ID: nota-20250219-1745-abc123
   Arquivo: Archive/0-CAPTURE/20250219-1745-Trabalho-abc123.md
   Status: inbox-0d
```

### 2️⃣ Revisar o Que Capturou

```bash
@archimedes *review-inbox 1d
```

Mostra todas as notas das últimas 24h, agrupadas por categoria.

### 3️⃣ Procurar Ideias Dormentes

```bash
@archimedes *reactivate
```

Encontra notas que você não revisa há 10+ dias e sugere retomar.

### 4️⃣ Arquivar para Permanente

```bash
@archimedes *archive nota-20250219-1745-abc123 Trabalho
```

Move de inbox temporário para `Archive/3-ARCHIVE/Trabalho/` no seu Obsidian permanente.

---

## 📁 Onde Tudo Fica

```
Seu Obsidian em: /Users/leonardogazola/Obsidian/

Archive/
├── 0-CAPTURE/          👈 Bilhetes NOVOS (últimas 24h)
├── 1-INBOX-3D/         👈 REVISÃO em 3 dias
├── 2-INBOX-7D/         👈 REVISÃO em 7 dias
└── 3-ARCHIVE/          👈 PERMANENTE
    ├── Trabalho/
    ├── Pessoal/
    ├── Lazer/
    ├── Estudos/
    ├── Livros/
    └── Aulas/

.archimedes-index.json  👈 Índice de todas as notas
.archimedes-config.yaml 👈 Configuração
```

---

## 🎯 Os 7 Comandos Principais

| Comando | O que faz | Exemplo |
|---------|-----------|---------|
| **capture** | Capturar bilhete | `*capture Trabalho "Ideia"` |
| **review-inbox** | Ver notas de um período | `*review-inbox 7d` |
| **reactivate** | Achar dormentes | `*reactivate 5` |
| **archive** | Arquivar para permanente | `*archive nota-xxx Trabalho` |
| **search** | Buscar por termo | `*search "cliente X"` |
| **stats** | Ver estatísticas | `*stats` |
| **status** | Status atual | `*status` |

---

## 💡 Exemplos Práticos

### Exemplo 1: Capturar Rápido (sem contexto)
```bash
@archimedes *capture Pessoal "Treinar 3x por semana"
```

### Exemplo 2: Capturar com Contexto
```bash
@archimedes *capture Livros "Livro sobre produtividade extrema" "Conversei com Murilo sobre isso"
```

### Exemplo 3: Capturar com Tags
```bash
@archimedes *capture Trabalho "Integração Stripe" "Separar taxa de processamento" "pagamento,stripe,financeiro"
```

### Exemplo 4: Revisar Últimos 7 Dias
```bash
@archimedes *review-inbox 7d
```

**Output:**
```
📊 Review — Últimos 7 dias

✅ Total: 8 notas
   • Trabalho: 5
   • Pessoal: 2
   • Lazer: 1

⭐ Atenção:
   1. "Integração API" (Trabalho, 5 dias)
   2. "Livro produtividade" (Livros, 7 dias)
```

### Exemplo 5: Procurar Dormentes
```bash
@archimedes *reactivate 10
```

**Output:**
```
🎯 Insights Dormentes (encontradas 5, mostrando 3)

1️⃣ "Integração cliente X" (Trabalho)
   Dormindo: 14 dias | Score: 8/10
   💡 Você marcou como importante. Hora de decidir?

2️⃣ "Livro mindfulness" (Livros)
   Dormindo: 11 dias | Score: 5/10
   💡 Passa um tempo. Ainda relevante?
```

---

## 🔄 Fluxo Típico de Um Dia

```
Manhã:
  📝 @archimedes *capture Trabalho "Ideia com cliente"
  📝 @archimedes *capture Pessoal "Treinar hoje"

Meio do dia:
  📋 @archimedes *review-inbox 1d      (revisar tudo de hoje)
  🎯 @archimedes *reactivate            (checar dormentes)

Fim do dia:
  ✅ @archimedes *archive nota-xxx Trabalho  (arquivar o que finalizou)
  📊 @archimedes *stats                      (ver evolução)
```

---

## 🎓 Mentalidade de Uso

### ✅ Bom
- Capturar **rapidinho** — bilhete, não ensaio
- Revisar regularmente — 1x/dia é ideal
- Arquivar quando amadurecer — virar permanente no Obsidian
- Usar tags para conectar — "cliente-x", "api", etc

### ❌ Evitar
- Capturar mas nunca revisar — derrota o propósito
- Deixar tudo em 0-CAPTURE — move para 1D/3D/7D
- Informações sensitivas — não é para banco de dados
- Bagunça — categorize direito

---

## 🚨 Troubleshooting

### P: Não vejo minhas notas?
**R:** Verifique se estão em `/Users/leonardogazola/Obsidian/Archive/0-CAPTURE/`

### P: Quer sincronizar meu Obsidian local?
**R:** Sim! Tudo fica em `/Users/leonardogazola/Obsidian/` — você pode usar normalmente

### P: Posso editar as notas diretamente?
**R:** Sim, mas o index pode ficar desatualizado. Melhor usar `*archive` para mover

### P: Como deletar uma nota?
**R:** Não existe comando yet. Delete manualmente do Obsidian ou use `*archive` para limpar depois

---

## 📚 Leia Mais

- **Agent completo:** `agents/archimedes.md`
- **Tasks em detalhe:** `tasks/` (capture, review, reactivate, archive)
- **README completo:** `README.md`
- **Config:** `squad.yaml`

---

## 🎯 Próximos Passos

1. ✅ Capture sua primeira ideia
2. ✅ Revisar com `*review-inbox 1d`
3. ✅ Procure dormentes com `*reactivate`
4. ✅ Arquive quando pronto com `*archive`
5. 🚀 Integre no seu dia a dia!

---

**Bem-vindo ao seu segundo cérebro! 🧠**

*Criado com ❤️ usando Synkra AIOS*
**Versão 1.0.0 | Fev 2025**
