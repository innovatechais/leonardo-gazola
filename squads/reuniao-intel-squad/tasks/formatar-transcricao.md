# Task: formatar-transcricao

## Objetivo

Transformar uma transcrição bruta de reunião em um documento legível, bem estruturado e ortograficamente correto — sem alterar, resumir ou interpretar o conteúdo original.

## Quando executar

Quando o agente Nexo receber um bloco de texto representando a transcrição bruta de uma reunião.

---

## Workflow

### PASSO 1 — Receber e validar

- Confirmar que o texto recebido é uma transcrição (não notas avulsas)
- Se parecer ser notas avulsas: informar e sugerir @bilhete
- Estimar tamanho: curta (<500 palavras), média (500-3000), longa (>3000)

### PASSO 2 — Análise preliminar

Antes de formatar, identificar:
- [ ] Há identificação de falantes? (ex: "João:", "[00:12] Maria:")
- [ ] Há timestamps?
- [ ] Qual idioma predominante?
- [ ] Há múltiplos idiomas misturados?
- [ ] Há trechos claramente ininteligíveis?

### PASSO 3 — Aplicar formatação

#### 3a. Título e cabeçalho

```markdown
# Transcrição — [tema/título se identificável | "Reunião [data]" se data disponível | "Reunião sem título"]

**Participantes identificados:** [lista ou "Não identificados na transcrição"]
**Duração estimada:** [baseado no volume e timestamps se disponíveis]

---
```

#### 3b. Tratar identificação de falantes

Se houver padrões de falante no texto bruto:
- Formatos comuns: `João:`, `[00:12] João:`, `João disse:`, `- João:`
- Converter para: `**[JOÃO]:**`
- Normalizar nomes (capitalizar, remover duplicatas)
- Se não houver falantes identificados: formatar como bloco sequencial

#### 3c. Estruturar em parágrafos

- Agrupar falas contínuas do mesmo falante
- Quebrar parágrafo a cada mudança de falante
- Quebrar parágrafo quando a mesma pessoa muda claramente de assunto
- Limite suave: ~6 linhas por parágrafo

#### 3d. Corrigir ortografia e gramática

**Corrigir:**
- Palavras com acento faltando (reuniao → reunião)
- Palavras emendadas por reconhecimento de voz (numfim → no fim)
- Pontuação ausente ao final de frases
- Maiúsculas após ponto
- Erros óbvios de STT (Speech-to-Text)

**NÃO corrigir / NÃO alterar:**
- Gírias e expressões informais intencionais
- Linguagem característica do falante
- Frases incompletas que fazem parte do estilo de fala
- Repetições que parecem intencionais
- Conteúdo semântico de qualquer frase

#### 3e. Tratar timestamps

Se presentes: `[00:12]` → manter no início do parágrafo correspondente
Se ausentes: não inventar

#### 3f. Tratar trechos ininteligíveis

- Palavras claramente corrompidas pela transcrição automática: `[ininteligível]`
- Trechos longos corrompidos: `[trecho ininteligível — aproximadamente X segundos]`
- Nunca adivinhar ou inventar

### PASSO 4 — Adicionar rodapé de metadados

```markdown
---
**Metadados da transcrição**
- Palavras totais: [X]
- Tempo estimado de leitura: [X min]
- Falantes identificados: [X]
- Trechos ininteligíveis: [X ocorrências | "Nenhum"]
- Formatado por: @nexo — reuniao-intel-squad
```

### PASSO 5 — Exibir resultado

1. Mostrar documento completo formatado
2. Exibir stats resumidos
3. Sugerir próximo passo:

```
📋 Transcrição formatada. [X] palavras, [Y] parágrafos.
Cole este documento em @faros para extrair inteligência da reunião.
```

---

## Regras absolutas

| SEMPRE | NUNCA |
|---|---|
| Preservar todo o conteúdo original | Resumir ou condensar |
| Corrigir erros de STT óbvios | Alterar o significado de qualquer frase |
| Manter gírias e informalidades | Adicionar interpretação ou comentário |
| Sinalizar ininteligíveis | Inventar palavras que não estavam lá |
| Manter timestamps originais | Reordenar falas |

---

## Tratamento de edge cases

**Transcrição muito curta (<100 palavras):**
- Formatar normalmente
- Não expandir ou complementar

**Transcrição em múltiplos idiomas:**
- Preservar o idioma de cada trecho como está
- Não traduzir

**Transcrição com código ou termos técnicos:**
- Preservar exatamente como está
- Não "corrigir" termos que parecem erros mas são jargão técnico

**Transcrição duplicada (mesmo trecho aparece duas vezes):**
- Manter apenas uma ocorrência
- Adicionar nota: `[nota: trecho duplicado removido]`
