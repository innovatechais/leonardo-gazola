# Produto — Evidex

> Documento base (substrato) — derivado de: `ideation.json` (sessão: inovatec-2026-02-17)
> Última atualização: 2026-02-17
> Status: rascunho — aguardando revisão do fundador

---

## O que é o Evidex

O Evidex é a plataforma de gestão e validação de provas de entrega da Innovatech. Automatiza o processamento de comprovantes físicos de entrega — os canhotos — usando inteligência artificial, eliminando o retrabalho manual, reduzindo perdas de documentos e centralizando registros auditáveis em tempo real.

**Nome:** Evidex = Evidências + dex (de "rapidex" no contexto brasileiro / "express" em inglês).
**Essência do nome:** evidências rápidas, confiáveis e seguras.

---

## A dor que resolve

O Evidex não é "um leitor de canhotos". O canhoto é apenas o artefato físico — o que importa é a **prova de entrega**: a evidência confiável de que uma entrega aconteceu, nas condições corretas, no momento registrado.

Distribuidoras e transportadoras com alto volume de entregas enfrentam hoje:
- Canhotos perdidos por motoristas
- Atraso de dias no retorno dos comprovantes à sede
- Equipes inteiras processando papéis manualmente
- Faturamento atrasado por falta de baixa no sistema
- Ausência de carimbo em entregas que o exigem
- Falta de rastreabilidade para auditoria e defesa jurídica

O Evidex elimina esses problemas ao digitalizar e automatizar todo esse fluxo.

---

## Como funciona (fluxo atual)

```
1. Motorista realiza a entrega
       ↓
2. Cliente final assina (e carimba) o canhoto físico
       ↓
3. Motorista tira foto do canhoto e envia via WhatsApp
       ↓
4. Sistema Evidex recebe a imagem
       ↓
5. IA processa e valida:
   - Nome da empresa destinatária
   - Número da nota fiscal
   - Presença/ausência de carimbo
   - Se a empresa exige carimbo (validação cruzada)
       ↓
6. Resposta enviada ao motorista em segundos com os dados validados
       ↓
7. Todos os dados são armazenados:
   - Foto do canhoto
   - Dados estruturados da entrega
   - Data e hora
   - Identificação do motorista
   - Placa do caminhão
```

---

## Interface de gestão

O Evidex conta com uma interface web para uso pelo time interno da empresa cliente. Permite:

- Visualização de todas as transações e validações realizadas
- Filtros por data, motorista, placa, empresa destinatária
- Acesso à foto do canhoto para auditoria
- Confirmação de presença de carimbo e conformidade da entrega

A interface elimina a dependência de integração via API com o sistema interno do cliente — o que amplia o alcance comercial para empresas que não possuem APIs abertas.

---

## Tecnologia

O Evidex é um sistema multiagentes de IA combinado com automações estruturadas. Componentes:

- **Agentes de IA:** responsáveis pela leitura, interpretação e validação das imagens dos canhotos
- **Automações:** processos sem IA nos pontos de entrada e saída do fluxo
- **Banco de dados:** armazenamento de todas as transações e registros
- **VPS:** infraestrutura de hospedagem do sistema
- **WhatsApp:** canal de entrada atual para envio das fotos pelos motoristas

---

## Modelo de negócio

Cobrança baseada em volume de transações:

- Cada foto processada = uma transação
- Preço por transação × volume mensal = mensalidade variável
- Exemplo: R$ 0,50/canhoto × 50.000 entregas/mês = R$ 25.000/mês

Esse modelo alinha o custo ao valor gerado: empresas que processam mais canhotos pagam mais — mas também economizam mais em retrabalho e pessoal.

---

## Cliente-alvo

**Perfil:** Distribuidoras e transportadoras de médio e grande porte, com alto volume de entregas mensais.

**Por que grande porte?**
- Alto volume = alto volume de problemas no processo atual
- Maior impacto financeiro de canhotos perdidos ou atrasados
- Maior capacidade e disposição de pagar por uma solução
- Processos mais complexos que justificam automação

**Clientes atuais:**
- Arilu (em operação)
- Novos clientes sendo prospecatados via representante comercial

---

## Validação de mercado

- Produto desenvolvido a partir de dores reais extraídas de um operador do nicho (dono da Arilu)
- Testes extensivos de acurácia da IA realizados antes da implantação
- Reunião com o Grupo Braveo (holding de grande porte) em São Paulo, com interesse na expansão para todo o grupo
- Aproximação de investidores com conhecimento do nicho
- Representante comercial com carteira consolidada já prospecatando ativamente

---

## Visão de futuro

A Innovatech tem clareza de que o canhoto físico é temporário. À medida que o setor avança tecnologicamente, o processo de prova de entrega evoluirá — e o Evidex evoluirá junto.

Direções possíveis:
- **Canhoto digital:** assinatura eletrônica pelo cliente final no momento da entrega
- **Plataforma integrada:** conectando as três pontas da cadeia (fabricante, distribuidor, cliente final) em tempo real
- **Token de confirmação:** validação instantânea sem papel físico
- **Integração nativa em apps de motorista:** como sinalizado pelo Grupo Braveo para o ecossistema da NS Tech

A dor (prova de entrega confiável) permanece. A tecnologia se adapta.

---

## Resumo do produto

| Atributo | Descrição |
|---|---|
| **Nome** | Evidex |
| **Categoria** | Plataforma de validação de provas de entrega |
| **Tecnologia** | Sistema multiagentes de IA + automações + interface web |
| **Canal atual** | WhatsApp (envio de fotos pelo motorista) |
| **Modelo de receita** | Por volume de transações (mensalidade variável) |
| **Cliente-alvo** | Distribuidoras e transportadoras de grande porte |
| **Status** | Em operação (cliente: Arilu) |
| **Site** | Tem site próprio |

---

*Fontes: ideias I16–I24, I32 do `ideation.json` desta sessão.*
