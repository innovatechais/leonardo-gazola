# Standards — Direct Response Creator Squad

## Princípio central

Todo output desta squad deve soar como se tivesse sido escrito por um copywriter humano nativo do mercado-alvo — não por uma IA traduzindo conceitos americanos para outros idiomas.

---

## Regras globais (valem para todos os mercados)

### Anti-devaneio (Zero Hallucination Policy)
- Proibido inventar estatísticas sem fonte clara
- Proibido criar claims impossíveis de sustentar (ex: "perde 30kg em 7 dias")
- Se o input não fornece prova, o agente deve sinalizar `[PROVA NECESSÁRIA]` no output
- Resultados numéricos só podem aparecer se vieram do material de input

### Anti-AI Writing
- Proibido: "mergulhe em", "eleve seu", "transforme sua vida", "revolucionário", "inovador"
- Proibido: adjetivos empilhados sem substância ("incrível, poderoso, transformador")
- Proibido: abertura com "Eu" em emails e cartas
- Permitido: linguagem visceral, específica, com imagens mentais concretas

### Estrutura de output
- Todo output de copy deve ter suas seções claramente delimitadas com `## SEÇÃO`
- Versões alternativas devem ser numeradas: `[Versão 1]`, `[Versão 2]`
- Campos que dependem de input humano devem ser marcados: `{PREENCHER: descrição}`

### Consistência interna
- O avatar criado em `extract-avatar` deve ser citado explicitamente nos outros outputs
- A USP criada em `create-usp` deve aparecer refletida no TSL, nos emails e nos vídeos
- Contradições entre seções devem ser flagradas pelo Judge antes de entrega

---

## Regras por tipo de output

### Avatar
- Mínimo 20 campos preenchidos com linguagem visceral (não genérica)
- Cada campo deve ter exemplos do mundo real do avatar, não abstrações
- Proibido: "quer melhorar sua vida" — obrigatório: "quer pagar o cartão antes do vencimento"

### TSL (Carta de Vendas)
- Mínimo 2.000 palavras
- Deve seguir obrigatoriamente as 9 seções do template
- Abertura deve ser um hook emocional, não uma apresentação de produto

### Headlines
- Entregar exatamente 20 opções
- Variação obrigatória: mínimo 5 estruturas de template diferentes entre as 20
- Proibido repetir o mesmo ângulo com palavras diferentes

### Scripts de Vídeo
- Máximo 60 segundos de leitura (≈ 150 palavras em PT-BR, ≈ 165 em EN-US)
- Deve seguir exatamente as seções do ângulo escolhido
- O CTA deve ser específico (não "saiba mais" — sim "clique no link abaixo agora")

### Emails
- Assunto: máximo 50 caracteres, sem ponto de exclamação
- Abertura: hook em 1-2 frases sem "Olá" ou "Espero que esteja bem"
- CTA: máximo 1 por email, linkado uma única vez

### FAQ
- Mínimo 5, máximo 10 perguntas
- Perguntas devem ser as que o avatar de fato se faz, na linguagem dele
- Respostas devem vender, não apenas informar

---

## Regras de revisão (Judge)

### Checkpoint 1 — Após avatar
- [ ] Avatar usa linguagem do mercado-alvo (não tradução literal)
- [ ] Dores são específicas e reconhecíveis pelo avatar real
- [ ] Nenhum campo genérico ou vazio

### Checkpoint 2 — Final
- [ ] Consistência de voz entre TSL, emails e vídeos
- [ ] Nenhuma promessa não sustentada pelo material de input
- [ ] Linguagem calibrada para o perfil de mercado selecionado
- [ ] Ausência de "gringo-isms" em outputs de mercado BR
- [ ] Ausência de "brasileirisms" em outputs de mercado EN/ES
