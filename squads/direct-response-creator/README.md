# Direct Response Creator Squad

Squad de produção de copy Direct Response completa — para qualquer nicho, idioma e mercado.

## O que esta squad produz

A partir de qualquer texto de entrada (página de vendas, transcrição de vídeo, briefing escrito), a squad executa um pipeline sequencial de 8 fases e entrega:

| Entregável | Agente responsável |
|-----------|-------------------|
| Análise de mercado e concorrente (Parasita) | Rex |
| Avatar profundo com +60 campos psicográficos | Psyche |
| Oferta estruturada (nome, preço, módulos, garantia, bônus) | Vera |
| USP + Unique Mechanism | Vera |
| 5 Order Bumps + 5 Upsells | Vera |
| Carta de vendas longa +2.000 palavras (TSL) | Quill |
| 20 Headlines para anúncios | Quill |
| Scripts de vídeo de 60 segundos (9 ângulos, on-demand) | Reel |
| Emails de Direct Response (17 templates, on-demand) | Spark |
| FAQ 5–10 perguntas + respostas persuasivas | Sage |
| Revisão de qualidade e linguagem por mercado | Judge |

## Como usar

### Fluxo completo (recomendado)

```
1. Ative @rex → *intake [cole o texto aqui]
2. @rex *analyze → gera análise Parasita
3. @psyche *extract → gera avatar profundo
4. @judge *review avatar → validação de linguagem e realidade
5. @vera *build-offer → monta oferta + USP + upsell
6. @quill *write-tsl → carta de vendas
7. @quill *write-headlines → 20 headlines
8. @reel *list-angles → escolha um ângulo → *write-script {ângulo}
9. @spark *list-templates → escolha um template → *write-email {template}
10. @sage *create-faq → FAQs
11. @judge *review-all → revisão final
```

### Módulos on-demand

Você pode ativar qualquer módulo isoladamente desde que `outputs/context.md` esteja populado com as fases anteriores:

```
@reel *write-script whistleblower  → gera apenas o script "Whistleblower"
@spark *write-email taboo-breaker  → gera apenas o email "The Taboo Breaker"
@judge *review tsl                 → revisa apenas a carta de vendas
```

## Mercados suportados

| Profile | Mercado | Idioma | Estilo |
|---------|---------|--------|--------|
| `pt-br-massa` | Brasil C/D | Português BR | Direto, coloquial, emotivo |
| `pt-br-premium` | Brasil A/B | Português BR | Sofisticado, Paulista Elite |
| `en-us-direct` | EUA Direct Response | Inglês americano | Agressivo, urgente, bolder |
| `en-us-info` | EUA Info Products | Inglês americano | Educacional, empático |
| `es-latam` | América Latina | Espanhol latino | Relacional, aspiracional |

## Estrutura

```
direct-response-creator/
├── agents/          → 8 agentes especializados
├── tasks/           → 12 tasks executáveis
├── workflows/       → Pipeline completo
├── config/
│   ├── standards.md
│   └── market-profiles/   → Perfis culturais por mercado
├── templates/
│   └── context-tmpl.md    → Template do arquivo de contexto central
├── data/
│   └── prompt-library.md  → Biblioteca dos prompts do pipeline
├── checklists/
│   └── copy-quality-checklist.md
└── outputs/         → Onde o context.md é gerado por produto
```

## O arquivo de contexto central

Todo o pipeline lê e escreve em `outputs/context.md`. Esse arquivo cresce progressivamente — cada agente enriquece com sua contribuição. É o "dossiê do produto".

Crie um arquivo por produto: `outputs/{produto-slug}.md` copiando de `templates/context-tmpl.md`.
