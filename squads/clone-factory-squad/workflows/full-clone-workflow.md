---
workflow: full-clone-workflow
version: 1.0.0
description: |
  Pipeline completo de clonagem cognitiva: do zero ao clone conversacional pronto.
  O usuário fornece documentos + quem quer clonar + objetivo.
  O squad faz todo o resto e entrega um clone ativável.
trigger: "*workflow full-clone | *clone {pessoa}"
estimated_time: "30-90 minutos (dependendo do volume de material)"
agents:
  - dna-extractor (Mira)
  - clone-architect (Forge)
approval_gates:
  - after_intake: Usuário confirma inventário de material
  - after_dna_extraction: Usuário revisa DNA Profile antes do build
  - after_clone_preview: Usuário aprova o clone antes de salvar
---

# Workflow: Full Clone — Do Zero ao Clone Conversacional

## Visão Geral

```
USUÁRIO FORNECE:
├── Quem quer clonar
├── Objetivo do clone
└── Documentos / conteúdo

SQUAD EXECUTA:
├── FASE 1: Intake (Mira)
│   └── Inventário + diagnóstico do material
│
├── FASE 2: Extração de DNA (Mira)
│   └── DNA Profile completo com evidências
│
├── FASE 3: Build do Clone (Forge)
│   └── Arquivo clone/{slug}.md gerado
│
├── FASE 4: Validação (Forge)
│   └── 5 cenários de teste de fidelidade
│
└── FASE 5: Entrega
    └── Clone ativo + instruções de uso
```

---

## FASE 1 — Intake & Análise de Material

**Responsável:** @dna-extractor (Mira)
**Task:** intake-and-analyze.md
**Duração estimada:** 5-10 minutos

### O que acontece:
Mira elicita informações essenciais e faz o inventário do material fornecido.

### Input necessário:
- Nome da pessoa a ser clonada
- Objetivo do clone (para que vai ser usado)
- Documentos fornecidos (textos, transcrições, livros, posts)

### Output:
- Inventário de material com score de qualidade (0-100)
- Gaps identificados
- Recomendação: prosseguir ou solicitar mais material

### Gate de aprovação:
```
🛑 CHECKPOINT 1
Mira apresenta o inventário.
Usuário confirma: prosseguir com o material disponível?
→ SIM: avança para Fase 2
→ NÃO: usuário fornece material adicional e Mira re-analisa
```

---

## FASE 2 — Extração de DNA Cognitivo

**Responsável:** @dna-extractor (Mira)
**Task:** extract-dna.md
**Duração estimada:** 15-30 minutos

### O que acontece:
Mira analisa todo o material em profundidade e extrai as 6 dimensões do DNA cognitivo.

### O que é extraído:
1. Voz & Estilo (tom, vocabulário, cadência)
2. Modelos Mentais (frameworks, analogias, referências)
3. Heurísticas de Decisão (regras de decisão, gatilhos)
4. Crenças & Worldview (posições, valores, críticas)
5. Storytelling (histórias signature, estrutura narrativa)
6. Assinaturas Comportamentais (o que é único dessa pessoa)

### Output:
- DNA Profile completo preenchido em `templates/dna-profile-tmpl.md`
- Score de confiança por dimensão
- Log de evidências para cada traço extraído

### Gate de aprovação:
```
🛑 CHECKPOINT 2
Mira apresenta o DNA Profile.
Usuário revisa: o DNA captura bem a essência da pessoa?
→ APROVADO: Mira faz handoff para Forge
→ AJUSTAR: Usuário indica o que está errado, Mira recalibra
→ MATERIAL INSUFICIENTE: solicitar documentos adicionais
```

---

## FASE 3 — Build do Clone

**Responsável:** @clone-architect (Forge)
**Task:** build-clone-agent.md
**Duração estimada:** 10-20 minutos

### O que acontece:
Forge recebe o DNA Profile e constrói o arquivo do agente clone completo,
usando o template `clone-agent-tmpl.md` como base.

### O que é construído:
- Identidade completa do clone (nome, título, ícone, persona)
- Vocabulário signature no agente
- Greetings escritos na voz real da pessoa
- Commands alinhados ao objetivo declarado
- Knowledge base com frameworks, heurísticas e histórias signature
- Regras de interação baseadas no DNA
- Lista do que o clone jamais diria

### Output:
- Preview completo do arquivo `clones/{slug}.md`
- Nota de fidelidade estimada com justificativa

### Gate de aprovação:
```
🛑 CHECKPOINT 3
Forge apresenta o preview do clone.
Usuário revisa: o clone parece a pessoa real?
→ APROVADO: Forge salva o arquivo em clones/{slug}.md
→ AJUSTAR SEÇÃO X: Forge revisa a seção específica
→ RECONSTRUIR: Forge refaz o clone com novos parâmetros
```

---

## FASE 4 — Validação de Fidelidade

**Responsável:** @clone-architect (Forge)
**Task:** validate-clone.md
**Duração estimada:** 5-10 minutos

### O que acontece:
Forge gera 5 cenários de teste e demonstra como o clone responderia a cada um,
para que o usuário possa verificar a fidelidade antes de começar a usar.

### Cenários de teste (exemplos):
1. "Me apresente você em 3 frases" — testa voz e identidade
2. "Qual é seu framework mais importante para X?" — testa modelos mentais
3. "Tenho esse problema: [problema típico da área]. O que faria?" — testa decisão
4. "O que você acha de [posição controversa que a pessoa critica]?" — testa crenças
5. "Me dê o melhor conselho para [objetivo do clone]" — testa aplicação prática

### Output:
- Score de fidelidade por dimensão
- Recomendação: Aprovar | Calibrar | Recriar

---

## FASE 5 — Entrega

**Responsável:** @clone-architect (Forge)
**Duração:** 2 minutos

### Entrega final:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ CLONE PRONTO: {NOME_DA_PESSOA}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Arquivo criado: clones/{slug}.md
Nota de fidelidade: {X}%

COMO USAR AGORA:
1. No chat, escreva: @{slug}
2. Ou use o atalho: /{slug}

FRASE PARA INICIAR A CONVERSA:
"{frase sugerida no estilo da pessoa}"

PARA CALIBRAR O CLONE:
@clone-architect *calibrate {slug} {o que ajustar}

PARA ADICIONAR MAIS MATERIAL FUTURAMENTE:
@dna-extractor *intake → @clone-architect *calibrate {slug} tudo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Workflow de Calibração Contínua (pós-entrega)

Após usar o clone, se perceber desvios de fidelidade:

```
Feedback de uso real
  → @clone-architect *calibrate {slug} {dimensão}
    → Forge ajusta a seção específica (mostra diff)
      → Aprovação do usuário
        → Clone atualizado + changelog registrado
          → *validate-clone {slug} quick
            → Score atualizado
```

---

## Níveis de Fidelidade e Expectativas

| Score | Nível | O que esperar |
|-------|-------|--------------|
| 85-100% | Alta | Clone soa como a pessoa em quase todos os contextos |
| 70-84% | Boa | Clone capta a essência, pode soar genérico em bordas |
| 55-69% | Média | Padrões corretos, mas voz ainda genérica em alguns pontos |
| < 55% | Baixa | Material insuficiente — fornecer mais conteúdo antes de usar |

**A fidelidade melhora com:**
- Mais volume de material (especialmente vídeos transcritos)
- Material em contextos diferentes (não só um tipo de formato)
- Calibrações baseadas em uso real
- Exemplos específicos de como a pessoa responderia a situações concretas
