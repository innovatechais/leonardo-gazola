# Clone Leonardo Squad

Squad estratégico para capturar, estruturar e escalar o modelo mental de Leonardo Gazola. O maior ativo da Innovatech não é o produto — é o CEO. Este squad transforma esse ativo em algo que não depende da presença física de Leonardo.

> **Fase 5 — iniciar após Squads 1-5 operacionais.** Não tente construir o clone antes de ter o sistema rodando.

---

## O que Capturar

| Conhecimento | Fonte |
|-------------|-------|
| 6+ anos em transportes brasileiro | Conversas com Claude, pitch decks |
| Modelos mentais de mercado | Análise competitiva de 75+ empresas |
| Heurísticas de decisão comercial | Scripts de vendas, treinamentos |
| Tom de voz nas comunicações | Histórico de conversas, VSLs |
| Frameworks de análise competitiva | Documentos existentes |
| Princípios de liderança | Estudos bíblicos, referências declaradas |

---

## Agentes

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| 🧬 Extratora de DNA | Mira-Leo | Extrai padrões de pensamento, heurísticas e vocabulário de Leonardo | `@dna-extractor-leo` |
| 🔨 Construtor do Clone | Forge-Leo | Monta o agente-clone com base no DNA extraído | `@clone-builder-leo` |
| 🗃️ Indexador de Conhecimento | Índice | Organiza e indexa todo o conhecimento de Leonardo para consulta pelos outros agentes | `@knowledge-indexer` |

---

## Workflow Principal

```
Fontes coletadas (transcrições, docs, scripts)
     ↓
Mira-Leo extrai DNA → Índice organiza em categorias
     ↓
Forge-Leo monta o agente-clone
     ↓
Validação: clone responde como Leonardo responderia?
     ↓
Deploy: clone disponível para treinamento de time
```

---

## Fontes para ETL do Clone

1. Transcrições de conversas com Claude (histórico rico de raciocínio)
2. Pitch deck e materiais da Innovatech
3. Análise competitiva das 75+ empresas mapeadas
4. Scripts de vendas e treinamentos criados
5. Estudos bíblicos e princípios de liderança

---

## Estrutura do Squad

```
clone-leonardo-squad/
├── squad.yaml
├── README.md
├── agents/
│   ├── dna-extractor-leo.md
│   ├── clone-builder-leo.md
│   └── knowledge-indexer.md
├── tasks/
│   ├── extract-leo-dna.md
│   ├── build-leo-clone.md
│   ├── index-leo-knowledge.md
│   └── validate-leo-clone.md
├── workflows/
│   └── leo-clone-workflow.md
├── checklists/
├── templates/
└── data/
```
