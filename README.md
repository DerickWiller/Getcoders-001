```
# CRUD de Pessoas — GetCoders

Sistema CRUD completo para gerenciamento de pessoas, desenvolvido como parte do **Programa de Estágio GetCoders**.

Permite cadastrar, listar, buscar, atualizar e deletar pessoas usando duas stacks de backend diferentes, integradas ao mesmo frontend Angular com template Fuse.

---

## Estrutura do Repositório

```
Getcoders001/
├── Api Spring/               # Backend com Spring Boot (porta 8080)
│   ├── pessoa-api/           # Código-fonte do projeto Spring
│   ├── iniciar-app.sh        # Script para iniciar Spring + Frontend
│   ├── parar-app.sh          # Script para parar tudo
│   └── logs/                 # Logs gerados em tempo de execução
│
├── Api NEST/                 # Backend com NestJS (porta 3000)
│   ├── pessoa-api-nest/      # Código-fonte do projeto NestJS
│   ├── iniciar-app.sh        # Script para iniciar NestJS + Frontend
│   ├── parar-app.sh          # Script para parar tudo
│   └── logs/                 # Logs gerados em tempo de execução
│
└── Frontend/
    └── pessoa-frontend/      # Frontend Angular com template Fuse (porta 4200)
```

---

## Tecnologias

| Camada        | Tecnologia |
|---------------|---|
| Backend 1     | Java 17 + Spring Boot 3 + Spring Data JPA |
| Backend 2     | Node.js + NestJS + TypeORM |
| Frontend      | Angular 19 + Fuse Template + Tailwind CSS |
| Banco de Dados | PostgreSQL |

---

## Pre-requisitos

Certifique-se de ter instalado:

- **Java 17+** — [https://adoptium.net](https://adoptium.net)
- **Node.js 18+** e **npm** — [https://nodejs.org](https://nodejs.org)
- **PostgreSQL** rodando em `localhost:5432`
- **Angular CLI** (opcional, para rodar o frontend manualmente):
  ```bash
  npm install -g @angular/cli
  ```
- **NestJS CLI** (opcional, para rodar o NestJS manualmente):
  ```bash
  npm install -g @nestjs/cli
  ```

---

## Configuracao do Banco de Dados

Antes de rodar qualquer backend, crie os bancos no PostgreSQL:

```sql
-- Para o backend Spring Boot
CREATE DATABASE pessoa;

-- Para o backend NestJS
CREATE DATABASE pessoa_nest;
```

As credenciais padrão utilizadas são:

| Parâmetro | Valor |
|---|---|
| Host | `localhost` |
| Porta | `5432` |
| Usuário | `postgres` |
| Senha | `postgres` |

> Para alterar as credenciais, edite:
> - **Spring:** `Api Spring/pessoa-api/src/main/resources/application.properties`
> - **NestJS:** `Api NEST/pessoa-api-nest/src/app.module.ts`

---

## Escolhendo o Backend no Frontend

O frontend pode se conectar a qualquer um dos dois backends. Edite o arquivo:

```
Frontend/pessoa-frontend/src/app/modules/admin/pessoas/pessoa.service.ts
```

```typescript
private api = 'http://localhost:8080/pessoas';   // Spring Boot <- ativo
//private api = 'http://localhost:3000/pessoas'; // NestJS      <- comentado
```

Basta **comentar uma linha e descomentar a outra** para trocar de backend.

---

## Opcao 1 — Executar com Script

Os scripts iniciam o backend e o frontend automaticamente, instalam dependências se necessário e aguardam cada serviço subir antes de continuar.

### Spring Boot + Frontend

```bash
cd "Api Spring"
./iniciar-app.sh
```

### NestJS + Frontend

```bash
cd "Api NEST"
./iniciar-app.sh
```

### Parar a aplicacao

```bash
# Para Spring + Frontend
cd "Api Spring"
./parar-app.sh

# Para NestJS + Frontend
cd "Api NEST"
./parar-app.sh
```

> **Atenção:** não execute os dois scripts ao mesmo tempo, pois ambos usam a porta `4200` para o frontend.

---

## Opcao 2 — Executar Manualmente

### Backend — Spring Boot

```bash
cd "Api Spring/pessoa-api"

# Linux/Mac
chmod +x gradlew
./gradlew bootRun

# Windows
gradlew.bat bootRun
```

API disponível em: `http://localhost:8080/pessoas`

---

### Backend — NestJS

```bash
cd "Api NEST/pessoa-api-nest"

# Instalar dependências (apenas na primeira vez)
npm install

# Modo desenvolvimento (com hot-reload)
npm run start:dev

# Modo produção
npm run start:prod
```

API disponível em: `http://localhost:3000/pessoas`

---

### Frontend — Angular

```bash
cd "Frontend/pessoa-frontend"

# Instalar dependências (apenas na primeira vez)
npm install

# Iniciar
npm start
```

Frontend disponível em: `http://localhost:4200`

---

## Endpoints da API

Ambos os backends expõem os mesmos endpoints:

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/pessoas` | Cadastrar uma nova pessoa |
| `GET` | `/pessoas` | Listar todas as pessoas |
| `GET` | `/pessoas/{cpf}` | Buscar pessoa por CPF |
| `PUT` | `/pessoas/{cpf}` | Atualizar dados de uma pessoa |
| `DELETE` | `/pessoas/{cpf}` | Deletar uma pessoa |

### Exemplo de payload (JSON)

```json
{
  "cpf": "12345678901",
  "nome": "João Silva",
  "endereco": "Rua das Flores, 123",
  "telefone": "11999999999",
  "dataNascimento": "1995-06-15",
  "escolaridade": "Superior Completo"
}
```

---

## Logs

Os logs ficam salvos dentro da pasta `logs/` de cada API:

```bash
# Acompanhar log do backend em tempo real
tail -f "Api Spring/logs/backend.log"
tail -f "Api NEST/logs/backend.log"

# Acompanhar log do frontend em tempo real
tail -f "Api Spring/logs/frontend.log"
tail -f "Api NEST/logs/frontend.log"
```

---

## Entidade Pessoa

| Campo | Tipo | Descrição |
|---|---|---|
| `cpf` | String | Identificador único (chave primária) |
| `nome` | String | Nome completo |
| `endereco` | String | Endereço residencial |
| `telefone` | String | Número de telefone |
| `dataNascimento` | String (YYYY-MM-DD) | Data de nascimento |
| `escolaridade` | String | Nível de escolaridade |

---

*2026 — Programa de Estágio GetCoders*
```
