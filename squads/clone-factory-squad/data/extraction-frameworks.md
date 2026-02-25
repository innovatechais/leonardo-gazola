# Extraction Frameworks — Clone Factory Squad

> Base de conhecimento para @dna-extractor (Mira).
> Define os métodos e frameworks que Mira usa para extrair DNA cognitivo de qualquer pessoa.

---

## 1. Framework: Triangulação de Padrões

**Princípio:** Um traço só é considerado DNA válido se aparecer em **pelo menos 3 fontes diferentes**.
Um traço de uma única fonte pode ser acidental ou contextual.

**Aplicação:**
- Tom de voz formal em um livro ≠ traço de DNA
- Tom de voz formal em livro + podcast + posts = traço de DNA confirmado
- Exceção: se o material for escasso (1-2 fontes), marcar como "baixa confiança"

**Output:** Cada traço extraído deve ter `evidência: [fonte1, fonte2, fonte3]`

---

## 2. Framework: Dimensões Cognitivas (6D Model)

As 6 dimensões que definem o DNA cognitivo de qualquer pessoa:

### D1 — Voz & Estilo
*O QUE É:* Como a pessoa soa. Não o que diz, mas como diz.
*EXTRAÇÃO:*
- Ler os primeiros e últimos 10% de cada documento
- Identificar palavras que aparecem ≥5x por fonte
- Mapear comprimento médio de frase e parágrafo
- Registrar abertura e fechamento padrão

### D2 — Modelos Mentais
*O QUE É:* As lentes cognitivas que a pessoa usa para interpretar o mundo.
*EXTRAÇÃO:*
- Buscar frases como "eu penso em X como...", "o que eu chamo de...", "meu modelo é..."
- Identificar analogias recorrentes (usam sempre a mesma para explicar o mesmo conceito?)
- Mapear estrutura de argumentação: indução? dedução? abdução?
- Registrar referências intelectuais citadas (quem inspira essa pessoa?)

### D3 — Heurísticas de Decisão
*O QUE É:* As regras de bolso que a pessoa usa para decidir rapidamente.
*EXTRAÇÃO:*
- Buscar frases como "sempre que X, faço Y", "nunca faça Z", "o critério é..."
- Identificar o que a pessoa chama de "erro comum" ou "armadilha"
- Mapear o que a pessoa diz que prioriza quando há conflito de valores
- Registrar exemplos de decisões reais que a pessoa tomou e justificou

### D4 — Crenças & Worldview
*O QUE É:* O que a pessoa acredita que é verdade sobre o mundo, seu campo e sobre pessoas.
*EXTRAÇÃO:*
- Buscar declarações absolutas: "o mercado está errado sobre X", "a maioria das pessoas não entende que..."
- Identificar críticas recorrentes (o que a pessoa ataca com frequência?)
- Mapear valores que a pessoa menciona em múltiplos contextos
- Registrar posições que vão contra o mainstream (são as mais valiosas para o clone)

### D5 — Storytelling
*O QUE É:* Como a pessoa conta histórias e usa narrativas para ensinar e persuadir.
*EXTRAÇÃO:*
- Identificar histórias que aparecem em múltiplas fontes (= histórias signature)
- Mapear estrutura narrativa: começa pelo problema? pela solução? pela história pessoal?
- Registrar o tipo de prova favorita (dados, anedota, experimento, autoridade)
- Analisar como a pessoa conecta história com lição (explícito ou implícito?)

### D6 — Assinaturas Comportamentais
*O QUE É:* Os comportamentos únicos que tornam essa pessoa reconhecível e inimitável por outros.
*EXTRAÇÃO:*
- O que essa pessoa faz que outros em sua área não fazem?
- Como reage quando está errada?
- Como trata quem discorda?
- Qual é a "textura" emocional da pessoa em diferentes contextos?

---

## 3. Framework: Hierarquia de Evidências

Para cada traço extraído, classificar a qualidade da evidência:

| Nível | Tipo de evidência | Confiança |
|-------|-----------------|-----------|
| A | A pessoa afirma explicitamente + exemplifica | 90-100% |
| B | A pessoa afirma explicitamente (sem exemplo) | 70-89% |
| C | Inferido de comportamento descrito em 3+ fontes | 50-69% |
| D | Inferido de comportamento descrito em 1-2 fontes | 30-49% |
| E | Especulação / extrapolação | < 30% (marcar com ⚠️) |

---

## 4. Framework: Calibração de Tom (Escala de 5 Eixos)

Para definir o tom preciso do clone, Mira avalia cada eixo:

| Eixo | Escala | Marcação |
|------|--------|---------|
| Formalidade | 1 (street) → 5 (acadêmico) | {X}/5 |
| Energia | 1 (calmo) → 5 (intenso) | {X}/5 |
| Diretividade | 1 (sugere) → 5 (ordena) | {X}/5 |
| Empatia | 1 (frio/analítico) → 5 (acolhedor) | {X}/5 |
| Provocação | 1 (consensual) → 5 (confrontador) | {X}/5 |

**Exemplo de uso:** Gary Halbert = Formalidade 1 | Energia 5 | Diretividade 5 | Empatia 2 | Provocação 5
**Exemplo de uso:** Naval Ravikant = Formalidade 3 | Energia 2 | Diretividade 3 | Empatia 3 | Provocação 3

---

## 5. Framework: Vocabulário Signature

Palavras que fazem um clone soar como a pessoa real vs. genérico:

**Nível 1 — Vocabulário técnico da área**
Palavras que qualquer especialista da área usa. NÃO são signature.
Ex: "funil", "conversão", "ROI" para marketer.

**Nível 2 — Vocabulário preferido da pessoa**
Palavras que outros especialistas também usam, mas essa pessoa usa com mais frequência.
São relevantes como padrão de ênfase.

**Nível 3 — Vocabulário único da pessoa**
Palavras, expressões ou neologismos que só essa pessoa usa.
São as mais valiosas para o clone. Devem ser preservadas exatamente.

**Critério de seleção para o clone:** Priorizar Nível 3 > Nível 2 > Nível 1

---

## 6. Framework: Anti-Padrões (O Que Não Fazer)

Armadilhas comuns que tornam um clone genérico em vez de fiel:

| Anti-Padrão | Problema | Correção |
|------------|---------|---------|
| Usar linguagem de IA padrão | "Certamente!", "Ótima pergunta!" | Usar a abertura típica real da pessoa |
| Frameworks genéricos de liderança | SWOT, matriz 2x2, etc. | Usar apenas os frameworks reais da pessoa |
| Respostas equilibradas e diplomáticas | A maioria das pessoas reais tem posições fortes | Preservar as posições polêmicas |
| Tom consistentemente formal | Pessoas reais variam o tom por contexto | Mapear variações de tom da pessoa real |
| Evitar controvérsia | Clones "seguros" são clones inúteis | Preservar as críticas e confrontos da pessoa |

---

## 7. Método: Extração por Tipo de Material

### De livros/textos longos:
1. Ler introdução e conclusão completas (visão geral da voz)
2. Extrair primeiros parágrafos de cada capítulo (padrão de abertura)
3. Mapear frases em negrito, itálico ou recuadas (ênfase = crença forte)
4. Registrar anedotas e histórias (storytelling signatures)

### De transcrições de vídeo/podcast:
1. Identificar filler words característicos (o que a pessoa fala quando pensa)
2. Mapear interrupções e autocorreções (revela processo de pensamento)
3. Extrair momentos de alta energia (o que empolga a pessoa)
4. Registrar como responde a perguntas difíceis

### De posts e threads:
1. Analisar o que gera mais engajamento (= toca na crença mais forte)
2. Mapear formato preferido (listas? threads longas? paragráfos curtos?)
3. Extrair as "teses" dos posts (uma frase que resume o post)

### De e-mails e newsletters:
1. Analisar assunto dos e-mails (é direto? cria curiosidade? provoca?)
2. Mapear como personaliza e como escala
3. Extrair o CTA padrão (como pede ação)
