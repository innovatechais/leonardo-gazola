# Notion Turbo — Manual de Uso

## Visão Geral

Notion Turbo roda localmente com 3 componentes:

| Componente | Tecnologia | Porta |
|------------|-----------|-------|
| Banco de dados | PostgreSQL (Docker) | 5432 |
| API | Node.js (pnpm) | — |
| Interface Web | Frontend (pnpm) | 3000 |

---

## Parar o Sistema

### Opção 1: Ctrl+C no terminal

Se os processos estão rodando em primeiro plano, pressione `Ctrl+C` no terminal.

### Opção 2: Docker Compose stop

```bash
docker compose -f docker/docker-compose.yml stop
```

Isso para todos os serviços (Postgres, API, Web).

---

## Religar o Sistema

Execute os comandos na ordem:

```bash
# 1. Subir o banco de dados
docker compose -f docker/docker-compose.yml up -d postgres

# 2. Iniciar a API (em background)
pnpm dev:api &

# 3. Iniciar o frontend (em background)
pnpm dev:web &
```

### Acessar

Abra no navegador: **http://localhost:3000**

---

## Referência Rápida

| Ação | Comando |
|------|---------|
| Parar tudo | `docker compose -f docker/docker-compose.yml stop` |
| Subir Postgres | `docker compose -f docker/docker-compose.yml up -d postgres` |
| Subir API | `pnpm dev:api &` |
| Subir Frontend | `pnpm dev:web &` |
| Acessar | http://localhost:3000 |
