# React + shadcn/ui

Projeto de estudo para aprender a usar shadcn/ui em aplicações React.

## O que foi aprendido

### Fundamentos
- Setup inicial de um projeto React com Vite e shadcn/ui
- Estilização com Tailwind CSS e ajustes de CSS
- Componentes UI customizados (Card, Button, Input, Field, Label, Separator)

### Autenticação
- **Login** com autenticação via API (dummyjson)
- **Registro** com validação usando React Hook Form + Zod
- Armazenamento de sessão com cookies
- Proteção de rotas (redirect se já logado)
- Gerenciamento de estado com Context API + useReducer

### Rotas
- Aplicação de TanStack Router para navegação entre páginas
- Validação de query/search parameters com Zod
- Rotas protegidas (dashboard) e públicas (login, registro)

### Dados
- Requisições HTTP para buscar dados de uma API
- Busca e filtragem de dados com TanStack Query
- Service layer para organização de requisições (api.ts)
- Tipagem TypeScript para responses da API

### Validação
- Schemas Zod para validação de formulários
- Validação de dados de entrada (username, password, confirmPassword)
- Validação de search params nas rotas

## Tecnologias

- **React 19** + Vite
- **TypeScript**
- **Tailwind CSS v4** + shadcn/ui
- **TanStack Router** - navegação e rotas
- **TanStack Query** - gerenciamento de dados
- **React Hook Form** - formulários
- **Zod** - validação de schemas
- **js-cookie** - gerenciamento de cookies
- **dummyjson API** - API REST para testes

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Redireciona para /login |
| `/login` | Página de login |
| `/register` | Página de registro |
| `/dashboard` | Página protegida (requer login) |
| `/dashboard/product?id=` | Detalhes de produto |