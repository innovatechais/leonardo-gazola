# Fontes de Conhecimento de Leonardo para o Clone

Mapa de todas as fontes disponíveis para extração do DNA de Leonardo.

---

## Fontes Prioritárias (Alta Densidade de DNA)

| Fonte | Tipo | Prioridade | Status |
|-------|------|-----------|--------|
| Transcrições de conversas com Claude | Texto | Alta | A coletar |
| Documento de contexto completo (2026-02-18) | Texto | Alta | ✅ Disponível |
| Pitch deck da Innovatech (10 slides) | Apresentação | Alta | A obter |
| Scripts de vendas e treinamentos | Texto | Média | A obter |
| Análise competitiva de 75+ empresas | Texto | Média | A obter |

---

## Categorias de DNA a Extrair por Fonte

### Transcrições de conversas com Claude
- Modelos mentais de negócio
- Heurísticas de decisão
- Forma de estruturar problemas
- Vocabulário e expressões características
- Processos de raciocínio

### Documento de contexto completo
- Perfil e identidade de Leonardo
- Dores declaradas e padrões de paralisia
- Objetivos de curto e médio prazo
- Anseios estratégicos
- Padrões cognitivos e estilo de comunicação

### Pitch deck da Innovatech
- Narrativa comercial preferida
- Como Leonardo posiciona o produto
- Argumentos de moat mais usados
- Tom persuasivo

### Scripts de vendas
- Linguagem com prospects de transportadoras
- Sequência de qualificação preferida
- Técnicas de fechamento

### Análise competitiva
- Framework de análise de mercado
- Critérios de avaliação de concorrentes
- Como Leonardo identifica oportunidades

---

## Protocolo de Extração

1. Fonte entra em @dna-extractor-leo via *extract-leo-dna
2. Padrões extraídos são indexados em @knowledge-indexer via *index-leo-knowledge
3. Quando DNA de cada categoria tiver >= 3 fontes confirmadas → flag para @clone-builder-leo
4. @clone-builder-leo monta o clone e passa para *validate-leo-clone
5. Score >= 80% → validação final por Leonardo pessoalmente
