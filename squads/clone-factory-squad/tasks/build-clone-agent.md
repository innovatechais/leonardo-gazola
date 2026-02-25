---
task: Build Clone Agent
responsavel: "@clone-architect"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - person_name: Nome da pessoa
  - person_slug: Slug para o arquivo (ex: gary-halbert, naval-ravikant)
  - objective: Objetivo do clone
  - dna_profile: DNA Profile completo entregue por Mira
  - language: PT | EN | bilingual
Saida: |
  - clone_file: Arquivo clones/{slug}.md completo e ativável
  - activation_instructions: Como ativar e iniciar conversa com o clone
  - test_scenarios: 5 cenários de teste para validar fidelidade
  - fidelity_score: Nota de fidelidade estimada com justificativa
Checklist:
  - "[ ] Receber DNA Profile de @dna-extractor"
  - "[ ] Definir slug do clone (ex: gary-halbert)"
  - "[ ] Preencher seção agent (name, id, title, icon, whenToUse)"
  - "[ ] Preencher persona_profile baseado em Voz & Estilo do DNA"
  - "[ ] Definir vocabulary com as palavras-chave reais da pessoa"
  - "[ ] Escrever greeting_levels na voz real da pessoa"
  - "[ ] Preencher persona (role, identity, core_principles) com o DNA"
  - "[ ] Criar commands alinhados ao objetivo do clone"
  - "[ ] Criar seção knowledge_base com frameworks e heurísticas"
  - "[ ] Criar seção interaction_rules com como o clone responde"
  - "[ ] Criar seção what_this_clone_never_says"
  - "[ ] Criar seção signature_stories com histórias recorrentes"
  - "[ ] Gerar preview para aprovação do usuário"
  - "[ ] Salvar arquivo em clones/{slug}.md"
  - "[ ] Gerar 5 cenários de teste de fidelidade"
  - "[ ] Calcular fidelity score e justificar"
  - "[ ] Entregar instruções de ativação"
---

# *build-clone — Build Clone Agent

Forge transforma o DNA Profile em um agente clone funcional. O output é um arquivo `.md`
completo, salvo em `clones/`, imediatamente ativável para conversa.

## Processo de Construção

### Passo 1: Montar a Identidade (agent + persona_profile)

A partir de **Voz & Estilo** e **Assinaturas Comportamentais** do DNA:
- `agent.name`: primeiro nome da pessoa real (ex: Gary, Naval, Pedro)
- `agent.title`: como a pessoa se definiria (ex: "The Copywriting Agitator")
- `persona_profile.communication.tone`: direto do DNA
- `persona_profile.communication.vocabulary`: palavras-chave reais extraídas
- `greeting_levels`: escrito na voz real da pessoa, usando o vocabulário dela

### Passo 2: Construir a Persona (persona)

A partir de **Modelos Mentais** + **Crenças** + **Heurísticas**:
- `persona.role`: como a pessoa se vê profissionalmente
- `persona.identity`: DNA encapsulado em 3-5 frases
- `persona.core_principles`: heurísticas de decisão transformadas em princípios
- `persona.style`: tom de voz e abordagem de comunicação

### Passo 3: Criar os Commands

A partir do **objetivo do clone**:
- Commands que fazem sentido para o que a pessoa faz melhor
- Nomes de commands que a pessoa usaria (ex: Gary Halbert teria `*write-promo`, não `*write-copy`)
- Incluir `*challenge-me` — para o clone criticar e provocar como a pessoa real faria

### Passo 4: Encapsular o Conhecimento (knowledge_base)

A partir de **Frameworks** + **Storytelling** + **Crenças**:
- Frameworks explícitos com descrição e exemplo de uso
- Heurísticas como regras numeradas
- Histórias signature que o clone pode usar como exemplos
- Posições polêmicas que a pessoa defende

### Passo 5: Regras de Interação

A partir de todo o DNA:
- `interaction_rules`: como o clone responde a diferentes tipos de pergunta
- `what_this_clone_never_says`: frases que essa pessoa jamais diria
- `triggers`: o que ativa a energia máxima do clone

## Preview do Clone

Antes de salvar, Forge exibe:

```
⚗️ Preview do Clone — {pessoa}

[INÍCIO DO ARQUIVO clones/{slug}.md]

---
agent:
  name: {nome}
  id: {slug}
  ...

[...conteúdo completo...]

---

✅ Pronto para salvar?
1. Salvar como está
2. Ajustar [especifique o que mudar]
3. Ver mais detalhes de uma seção
```

## Output Final

```
✅ Clone criado: clones/{slug}.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMO ATIVAR SEU CLONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Abra o arquivo: clones/{slug}.md
2. No chat, escreva: @{slug}
3. Ou use o shortcut: /{slug}

FRASE DE ABERTURA SUGERIDA:
"{frase que inicia a conversa no estilo da pessoa}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CENÁRIOS DE TESTE DE FIDELIDADE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. {pergunta de teste 1}
2. {pergunta de teste 2}
3. {pergunta de teste 3}
4. {pergunta de teste 4}
5. {pergunta de teste 5}

Nota de fidelidade estimada: {Alta|Média|Baixa}
Baseado em: {justificativa em 1-2 frases}

→ Para calibrar: @clone-architect *calibrate {ajuste}
```
