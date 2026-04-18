# QuizLab IF - Backend (API)

Este é o repositório do backend (API) do **QuizLab IF**, uma plataforma de quizzes gamificados em tempo real desenvolvida para o Instituto Federal de Sergipe (IFS).

## 🚀 Sobre o Projeto

O **QuizLab IF** é uma API robusta desenvolvida em **AdonisJS 6** que gerencia toda a lógica de quizzes, salas em tempo real, pontuações e autenticação de usuários para a Rede Federal.

### Principais Funcionalidades:
- **Gestão de Quizzes:** CRUD completo de questões e quizzes.
- **Salas em Tempo Real:** Comunicação via WebSockets para interação instantânea entre professores e alunos.
- **Autenticação:** Sistema seguro de acesso para professores.
- **Gamificação:** Lógica de pontuação e ranking integrada.

## 🛠️ Stack Tecnológica

- **Framework:** AdonisJS 6 (API Mode)
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL (Lucid ORM)
- **Tempo Real:** Socket.io
- **Runtime:** Node.js v24+ (Gerenciado via FNM)
- **Deploy:** Ambiente Linux nativo (PM2)

## 🎨 Identidade Visual (Padrão IFS)
O projeto respeita as cores institucionais do IFS:
- Verde: `#32A041`
- Vermelho: `#C8191E`

---

## 🚦 Iniciando o Desenvolvimento

### Pré-requisitos
- Node.js v24 ou superior.
- Banco de Dados PostgreSQL configurado.

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure o arquivo `.env`:
```bash
cp .env.example .env
```
*(Preencha as credenciais do seu banco de dados no arquivo .env)*

3. Execute as migrations:
```bash
node ace migration:run
```

4. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

O QuizLab é dividido em dois repositórios principais:
- `/quizlab-api` -> Backend AdonisJS (este repositório).
- `/quizlab-app` -> Frontend Next.js.

---

## Saiba Mais

Acesse a [documentação do AdonisJS](https://docs.adonisjs.com) para entender mais sobre o framework.
