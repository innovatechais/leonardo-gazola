# Task: build-offer

**Agente responsável:** Vera  
**Posição no pipeline:** 4 de 12  
**Dependências:** extract-avatar + (recomendado) qa-review checkpoint 1  
**Próxima task:** create-usp

---

## Objetivo

Criar a estrutura completa da oferta: 10 opções de nome, faixa de preço, garantia, módulos/estrutura, bônus com valores percebidos e depoimentos de amostra.

---

## Contexto de referência

Esta task implementa o **OFFER PROMPT** do prompt-library. Leia `data/prompt-library.md → Seção 3: Offer` antes de executar.

---

## Processo

### Passo 1 — Ler o contexto

Abrir `outputs/{slug}.md` e ler:
- Seção 2 (Parasita) — especialmente USP preliminar e breakdown da oferta
- Seção 3 (Avatar) — especialmente Primary Goal, Objections, Promises, Benefits, Risk Tolerance

### Passo 2 — Elicitar dados faltantes (elicit=true)

Se não existirem no material de input, perguntar:

```
Para montar a oferta, preciso de algumas informações:

1. Qual é a estrutura da sua oferta? (ex: curso digital, consultoria, suplemento, software)
2. Você tem um preço em mente ou quer que eu sugira uma faixa?
3. A entrega é digital ou física?
4. Tem algum bônus em mente ou deixa por minha conta criar?
```

### Passo 3 — Criar a oferta completa

#### 3.1 — 10 opções de nome
Criar 10 nomes para a oferta usando as técnicas:
- Nome + Mecanismo único
- Nome + Resultado específico
- Nome + Identidade do avatar
- Nome + Referência histórica/cultural
- Formato: `[Nome da Oferta]™`

#### 3.2 — Faixa de preço
Recomendar faixa baseada em:
- Mercado (ex: BR massa vs. EN-US)
- Nível de transformação prometida
- Formato de entrega
- Preço de alternativas mencionadas no material

#### 3.3 — Estrutura de módulos (3 opções de formato)
Para cada opção, descrever:
- Nome do módulo
- O que o módulo entrega
- Como conecta ao objective primário do avatar
- Formato de entrega (vídeo, PDF, áudio, etc.)

#### 3.4 — Garantia de 30 dias
Escrever a garantia de forma persuasiva, que:
- Remove o risco percebido pelo avatar
- Demonstra confiança no produto
- Usa linguagem do mercado-alvo

#### 3.5 — 3 bônus complementares
Para cada bônus:
- `[Bonus Name]` — nome atrativo
- `[Bonus Value]` — valor percebido (deve justificar o preço total sozinho)
- `[Bonus Details]` — descrição tão boa que compraria só pelo bônus
- Formato ideal: audiobook, checklist, template, guia avançado

#### 3.6 — 3 depoimentos de amostra
Para cada depoimento:
- `[Testimonial Name]` — nome real (específico, não "João S.")
- `[Testimonial Details]` — resultado específico com número/tempo, contexto antes e depois

### Passo 4 — Elicitar confirmação do nome (elicit=true)

```
Criei 10 opções de nome para a oferta. Qual você prefere?
[lista numerada]

Ou prefere uma direção diferente?
```

### Passo 5 — Salvar no context.md

Preencher **Seção 4 — Oferta** do `outputs/{slug}.md`.

Atualizar `{status}` para `OFFER_COMPLETE`.

Notificar:
```
✅ Oferta criada.
Nome selecionado: {nome}
Faixa de preço: {faixa}

Próximo passo: @vera *create-usp
```

---

## Output

- Seção 4 do context.md preenchida
- Status atualizado para `OFFER_COMPLETE`

---

## Flags de qualidade

- Nomes que soem genéricos → criar mais opções
- Bônus com valor percebido abaixo do preço principal → redesenhar
- Depoimentos sem resultado específico → reescrever com número e tempo
