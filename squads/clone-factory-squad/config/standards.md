# Coding & Quality Standards — Clone Factory Squad

## Padrões de Nomenclatura

### Slugs de clones
- Formato: `{primeiro-nome}-{sobrenome}` ou `{primeiro-nome}` se suficiente
- Lowercase, hifenizados, sem espaços ou underscores
- Exemplos: `gary-halbert`, `naval`, `pedro-valerio`, `alan-nicolas`

### Arquivos de clone
- Localização: `clones/{slug}.md`
- Changelog: `clones/{slug}-changelog.md` (criado automaticamente ao calibrar)
- DNA Profile: `clones/{slug}-dna-profile.md` (artefato intermediário de Mira)

## Padrões de Qualidade

### Fidelidade mínima para entrega
- Score geral ≥ 70% para marcar como "Boa" fidelidade
- Score < 55%: avisar o usuário que o material é insuficiente antes de usar

### Vocabulário no clone
- Mínimo 7 palavras/expressões no `vocabulary` — todas extraídas do material real
- Proibido adicionar palavras genéricas de IA ou da área sem evidência no DNA

### Heurísticas
- Mínimo 4 heurísticas em `knowledge_base.decision_heuristics`
- Cada heurística deve ser específica o suficiente para orientar uma decisão real

## Padrões Éticos

### Transparência
- Todo clone deve declarar claramente no cabeçalho que é um clone cognitivo
- O campo `clone_of` é obrigatório
- Nunca criar um clone de pessoa viva que possa causar dano à reputação dela

### Limitações
- Clones são baseados em conteúdo público — não fingem saber informações privadas
- O clone deve recusar responder por uma pessoa em contextos onde errar seria prejudicial
  (ex: decisões médicas, jurídicas, financeiras específicas)

## Padrões de Processo

### Gates obrigatórios
Os 3 checkpoints do workflow são obrigatórios — nenhum pode ser pulado mesmo em modo YOLO.
O motivo: calibrar o clone errado desde o início desperdiça mais tempo do que as aprovações.

### Calibração
- Sempre mostrar diff antes de salvar calibração
- Sempre registrar no changelog após calibração
- Sugerir re-validação após cada calibração significativa
