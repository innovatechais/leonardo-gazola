# Task: run-parasita

**Agente responsável:** Rex  
**Posição no pipeline:** 2 de 12  
**Dependências:** intake (Seção 1 do context.md preenchida)  
**Próxima task:** extract-avatar

---

## Objetivo

Executar análise completa do material de entrada usando o método Parasita — extraindo a inteligência de mercado que vai alimentar todo o pipeline de copy.

---

## Contexto de referência

Esta task implementa o **PROMPT PARASITA** do prompt-library. Leia `data/prompt-library.md → Seção 1: Parasita` antes de executar.

---

## Processo

### Passo 1 — Ler o material

Abrir `outputs/{slug}.md` e ler a **Seção 1 — Input Material**.

### Passo 2 — Executar análise Parasita

Para cada item abaixo, analisar o material e produzir a resposta. Cada análise deve incluir **1-2 citações diretas do material** como evidência.

#### 1. Nicho do produto
- Descrever o nicho/mercado em linguagem descritiva
- Identificar características únicas que diferenciam esse nicho
- Citar trecho do material que confirma

#### 2. Avatar-alvo (raso — será expandido por Psyche)
- Perfil demográfico básico
- Interesses, desafios e desejos identificados no material
- Exemplos do mundo real que ilustram
- Citar trecho que evidencia

#### 3. Principais argumentos de venda
- Listar os pontos de venda e promessas centrais
- Explicar como cada argumento conecta ao benefício
- Citar trecho de suporte para cada

#### 4. Técnicas de persuasão identificadas
- Identificar: escassez, prova social, autoridade, reciprocidade, urgência, medo, etc.
- Descrever como cada técnica é usada
- Citar exemplo do material

#### 5. Tom de comunicação
- Resumir o tom geral (amigável, urgente, empático, autoritário, etc.)
- Identificar nível de formalidade
- 2 citações que ilustram o tom

#### 6. USP preliminar (Proposta Única de Valor)
- Extrair o que torna o produto/oferta único
- Descrever a promessa especial ou mecanismo em linguagem clara
- Justificar com citação

#### 7. Elementos de storytelling
- Identificar se usa narrativa (existe? qual estrutura?)
- Se existe: mapear as etapas (Problema → Solução → Transformação)
- Citar trecho narrativo chave

#### 8. Breakdown da oferta
- Resumir como a oferta é apresentada
- Identificar: hooks de abertura, ângulo de mercado, detalhes do produto, vantagens comparativas
- Uma citação por parágrafo de resumo

#### 9. Pontos-chave da oferta
- Parágrafo claro resumindo o que está sendo vendido, como beneficia e resultados esperados

#### 10. Triggers mentais e estratégias
- Identificar: urgência, prova social, autoridade, outros gatilhos suaves
- Descrever cada trigger em termos simples
- 1-2 citações de exemplo

### Passo 3 — Verificação final antes de salvar

Antes de salvar no context.md, verificar:
- [ ] A tarefa está claramente declarada (analisar o material de vendas)
- [ ] Contexto suficiente fornecido (propósito e audiência do material)
- [ ] Estrutura fácil de seguir com citações de suporte
- [ ] Explicações incluem citações claras sem excesso de detalhe

### Passo 4 — Salvar no context.md

Preencher **Seção 2 — Análise Parasita** do `outputs/{slug}.md` com todos os itens acima.

Atualizar `{status}` para `PARASITA_COMPLETE`.

### Passo 5 — Handoff

Apresentar ao usuário:
```
✅ Análise Parasita concluída
Nicho identificado: {nicho}
Tom: {tom}
Técnicas de persuasão: {lista breve}
USP preliminar: {frase}

Próximo passo: @psyche *extract (expandir avatar com +60 campos)
```

---

## Output

- Seção 2 do context.md preenchida com análise completa
- Status atualizado para `PARASITA_COMPLETE`

---

## Flags de qualidade

- Se o material não tiver página de vendas clara → avisar e prosseguir com o que há
- Se o material estiver em idioma diferente do perfil → executar análise no idioma do material, registrar a diferença
- Campos sem evidência no material → marcar como `{DADO NÃO ENCONTRADO NO MATERIAL}`
