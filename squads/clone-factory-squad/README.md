# 🧬 Clone Factory Squad

> **Squad especializado em criar clones cognitivos de qualquer pessoa ou especialista.**
> Você fornece os documentos + quem quer clonar + objetivo. O squad faz todo o resto
> e entrega um clone conversacional pronto para usar imediatamente.

---

## Como usar em 3 passos

### Passo 1 — Ativar o squad

```
@dna-extractor
```
ou
```
*workflow full-clone
```

### Passo 2 — Fornecer o material

Quando Mira elicitar, informe:
1. **Quem quer clonar** (ex: Gary Halbert, Naval Ravikant, Pedro Valério)
2. **Para que o clone serve** (ex: "revisar minha copy", "me dar conselhos de estratégia")
3. **O conteúdo** (cole textos, transcrições, posts, trechos de livros)

### Passo 3 — Receber e usar o clone

O squad entrega um arquivo `clones/{slug}.md`. Para conversar:
```
@{slug}
```

---

## Agentes do Squad

| Agente | Papel | Ativar com |
|--------|-------|-----------|
| **🧬 Mira** | Analisa documentos e extrai o DNA cognitivo | `@dna-extractor` |
| **⚗️ Forge** | Constrói o arquivo do clone a partir do DNA | `@clone-architect` |
| **Clone gerado** | Pensa e fala como a pessoa real | `@{slug}` |

---

## Pipeline Completo

```
Você fornece:
  ├── Quem clonar
  ├── Objetivo do clone
  └── Documentos / conteúdo

         │
         ▼
🧬 Mira — Intake & Análise
  └── Inventário + score de qualidade do material

         │
         ▼
🧬 Mira — Extração de DNA
  └── Voz & Estilo, Frameworks, Heurísticas,
      Crenças, Storytelling, Assinaturas

         │
         ▼
⚗️ Forge — Build do Clone
  └── Arquivo clones/{slug}.md completo

         │
         ▼
⚗️ Forge — Validação de Fidelidade
  └── 5 cenários de teste + score

         │
         ▼
✅ Clone pronto → @{slug}
```

---

## O que o clone captura

- **Voz & Estilo** — Tom, vocabulário real, cadência, abertura e fechamento típicos
- **Modelos Mentais** — Frameworks explícitos e implícitos, analogias favoritas
- **Heurísticas** — Regras de decisão, gatilhos de sim/não
- **Crenças** — Worldview, posições polêmicas, valores fundamentais
- **Storytelling** — Histórias signature, estrutura narrativa, tipo de prova preferido
- **Assinaturas** — O que torna essa pessoa única e inimitável

---

## Calibrar um clone existente

Se o clone soar errado após uso:

```
@clone-architect *calibrate {slug} {dimensão}
```

Dimensões: `tom | frameworks | vocabulario | decisoes | crenças | storytelling | tudo`

---

## Estrutura de arquivos

```
clone-factory-squad/
├── squad.yaml
├── README.md
├── agents/
│   ├── mira.md              ← DNA Extractor
│   └── forge.md             ← Clone Architect
├── tasks/
│   ├── intake-and-analyze.md
│   ├── extract-dna.md
│   ├── build-clone-agent.md
│   ├── validate-clone.md
│   └── calibrate-clone.md
├── templates/
│   ├── dna-profile-tmpl.md  ← Mira preenche este
│   └── clone-agent-tmpl.md  ← Forge usa este para construir
├── data/
│   └── extraction-frameworks.md
├── workflows/
│   └── full-clone-workflow.md
├── checklists/
│   └── clone-quality-checklist.md
├── config/
│   └── standards.md
└── clones/                  ← Clones gerados ficam aqui
    └── {slug}.md
```

---

## Quanto material é necessário?

| Volume | Score esperado | Resultado |
|--------|---------------|-----------|
| 1 livro ou 10+ transcrições | 75-85% | Clone bom para uso cotidiano |
| 2+ livros + transcrições | 85-95% | Clone de alta fidelidade |
| 1 transcrição curta ou 20 posts | 50-65% | Clone básico — calibrar após uso |
| Menos que isso | < 50% | Solicitar mais material primeiro |

**Dica:** Transcrições de vídeo/podcast são o melhor tipo de material — capturam tom de voz, ritmo e processo de pensamento espontâneo.
