---
checklist: Clone Quality
version: 1.0.0
usage: Executar ao final de *build-clone antes de marcar o clone como aprovado
responsavel: "@clone-architect (Forge)"
---

# Clone Quality Checklist

Execute este checklist antes de entregar qualquer clone ao usuário.
Um clone só é aprovado se passar em todos os itens ✅ ou tiver justificativa documentada para ⚠️.

---

## Seção 1: Identidade & Persona

- [ ] O nome do agente é o nome real ou primeiro nome da pessoa (não um apelido genérico)
- [ ] O `title` descreve como a pessoa se definiria — não uma descrição genérica de cargo
- [ ] O `whenToUse` descreve claramente para que o clone é útil e para que NÃO serve
- [ ] A `identity` (3-5 frases) soa como a pessoa falaria sobre si mesma, não como IA
- [ ] O `style` captura a textura real da comunicação (não apenas "direto e objetivo")

## Seção 2: Voz & Vocabulário

- [ ] O `vocabulary` contém palavras REAIS extraídas do material (não palavras genéricas da área)
- [ ] Os `greeting_levels` estão escritos na voz real da pessoa (sem "Certamente!" ou "Ótima pergunta!")
- [ ] A `signature_closing` é algo que a pessoa real diria ao encerrar
- [ ] O tom declarado no `communication.tone` é específico o suficiente para ser útil

## Seção 3: Frameworks & Conhecimento

- [ ] Todos os frameworks em `knowledge_base.frameworks` existem no DNA Profile com evidência
- [ ] Cada framework tem `when_to_apply` claro — o clone sabe quando usar cada um
- [ ] As `decision_heuristics` são específicas (não vagas como "sempre pense no cliente")
- [ ] As `beliefs` incluem pelo menos uma posição contraintuitiva ou polêmica da pessoa real
- [ ] As `signature_stories` são histórias que a pessoa de fato conta (com evidência no DNA Profile)

## Seção 4: Comportamento & Interação

- [ ] As `interaction_rules` descrevem comportamentos específicos, não genéricos
- [ ] A seção `what_this_clone_never_says` tem pelo menos 2 frases reais que seriam incoerentes
- [ ] Os `commands` são nomes que fazem sentido para o contexto da pessoa (não nomes genéricos)
- [ ] O clone tem o comando `*challenge-me` para simular provocação no estilo da pessoa

## Seção 5: Honestidade & Limitações

- [ ] O cabeçalho do arquivo indica claramente que é um clone (não engana o usuário)
- [ ] A `clone_fidelity` está preenchida com score real (não sempre "Alta")
- [ ] O campo `clone_objective` está preenchido com o objetivo declarado pelo usuário
- [ ] A nota de fidelidade tem justificativa baseada na qualidade do material

## Seção 6: Arquivo & Estrutura

- [ ] O arquivo foi salvo em `clones/{slug}.md` (não em outra pasta)
- [ ] O slug é legível: `gary-halbert`, não `Gary Halbert` ou `gary_halbert_copy_2`
- [ ] O template não tem comentários `# INSTRUÇÕES PARA FORGE` no arquivo final
- [ ] Todos os placeholders `{CAMPO}` foram substituídos por conteúdo real

## Seção 7: Entrega ao Usuário

- [ ] As instruções de ativação foram fornecidas (como usar `@{slug}`)
- [ ] A frase de abertura sugerida foi criada no estilo da pessoa
- [ ] Os 5 cenários de teste foram gerados e são relevantes para o objetivo do clone
- [ ] O score final de fidelidade foi comunicado com justificativa

---

## Resultado

| Status | Critério |
|--------|---------|
| ✅ Aprovado | Todos os itens marcados ou com justificativa documentada |
| ⚠️ Aprovado com ressalvas | Máximo 3 itens em ⚠️ com justificativa clara |
| ❌ Reprovado | Mais de 3 itens não atendidos — reconstruir seções problemáticas |

**Score do checklist:** ___/30 itens

**Observações:**
> {registrar aqui qualquer item ⚠️ com justificativa}
