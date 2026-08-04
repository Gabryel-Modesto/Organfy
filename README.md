# 💰 Organfy

Organfy é um sistema de controle financeiro pessoal desenvolvido para ajudar usuários a gerenciar receitas, despesas, metas financeiras e acompanhar sua vida financeira de forma simples e intuitiva.

Este projeto está sendo desenvolvido como um estudo prático de arquitetura de software, Node.js, Express, Sequelize e PostgreSQL.

---

## 🚀 Tecnologias

### Backend

- Node.js
- Express
- Sequelize
- PostgreSQL

### Segurança

- JWT (em desenvolvimento)
- Bcrypt (em desenvolvimento)

### Ferramentas

- Git
- GitHub
- Postman
- pgAdmin

---

## 📂 Estrutura do projeto

```text
organfy-api
│
├── src
│   ├── config
│   ├── controllers
│   ├── database
│   │   └── models
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── utils
│   ├── app.js
│   └── server.js
│
├── database
│   └── schema.sql
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Como executar

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/organfy-api.git
```

---

### 2. Entre na pasta

```bash
cd organfy-api
```

---

### 3. Instale as dependências

```bash
npm install
```

---

### 4. Crie o banco de dados

```sql
CREATE DATABASE organfy;
```

---

### 5. Execute o script

O script está localizado em:

```text
database/schema.sql
```

Execute-o no PostgreSQL.

---

### 6. Configure o arquivo `.env`

Copie o arquivo:

```text
.env.example
```

para

```text
.env
```

e altere as informações conforme sua configuração local.

---

### 7. Execute o projeto

```bash
npm run dev
```

---

## 📌 Funcionalidades

- Cadastro de usuários
- Login
- Categorias
- Formas de pagamento
- Receitas
- Despesas
- Parcelamentos
- Metas financeiras
- Dashboard financeiro

---

## 📖 Objetivo

O Organfy está sendo desenvolvido como um projeto de estudo e portfólio, aplicando conceitos de:

- Arquitetura em camadas
- APIs REST
- Sequelize
- PostgreSQL
- Boas práticas de desenvolvimento
- Clean Code

---

## 👨‍💻 Autor

Gabryel Modesto# Organfy
