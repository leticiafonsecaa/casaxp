# 🏠 CasaXP

O **CasaXP** é um aplicativo desenvolvido para ajudar famílias a organizar as tarefas domésticas de adolescentes de uma forma simples, organizada e motivadora.

A proposta é transformar as tarefas do dia a dia em um sistema de **XP e recompensas**.

## 💡 Como funciona

O funcionamento do CasaXP é baseado em um ciclo simples:

```text
👨‍👩‍👧 Responsável
        ↓
📋 Cria uma tarefa
        ↓
📱 Adolescente realiza a tarefa
        ↓
✅ Marca como concluída
        ↓
👨‍👩‍👧 Responsável aprova
        ↓
⭐ Adolescente recebe XP
        ↓
🎁 XP pode ser trocado por recompensas
```

### Exemplo

O responsável pode criar uma tarefa:

> 🧹 **Arrumar o quarto — 30 XP**

O adolescente realiza a tarefa e marca como concluída.

Depois que o responsável aprovar:

```text
+30 XP ⭐
```

Quando tiver XP suficiente, o adolescente poderá utilizar seus pontos para resgatar recompensas.

Exemplo:

```text
🎁 +1 hora de computador
💰 Custo: 100 XP
```

---

# 🛠️ Tecnologias

O projeto utiliza:

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript

### Backend

* Node.js
* Express
* TypeScript

### Banco de dados

* SQLite
* better-sqlite3

## 🏗️ Arquitetura

```text
📱 React Native / Expo
          ↓
🌐 Node.js + Express API
          ↓
🗄️ SQLite
```

> Atualmente, o desenvolvimento está concentrado no **backend e na API**. O aplicativo mobile ainda está em desenvolvimento.

---

# 🌐 Backend

O backend é responsável pelas regras de negócio do CasaXP e pela comunicação com o banco de dados.

Ele está localizado na pasta:

```text
backend/
```

A API possui endpoints para:

* Usuários
* Tarefas
* Conclusões
* Recompensas
* Resgates

Principais rotas:

```text
/usuarios
/tarefas
/conclusoes
/recompensas
/resgates
```

---

# 🗄️ Banco de dados

O CasaXP utiliza **SQLite** para armazenar os dados.

As principais tabelas são:

* `usuarios`
* `tarefas`
* `conclusoes`
* `recompensas`
* `resgates`

O relacionamento entre elas permite controlar:

```text
Usuário
   │
   ├── Tarefas
   │
   └── Conclusões
          │
          └── XP

Recompensas
   │
   └── Resgates
```

---

# ⭐ Sistema de XP

O XP é concedido quando uma tarefa concluída é aprovada pelo responsável.

Por exemplo:

```text
Tarefa: Lavar a louça
Valor: 20 XP

        ↓

Conclusão da tarefa

        ↓

Aprovação do responsável

        ↓

Usuário recebe +20 XP
```

O sistema também verifica se o usuário possui XP suficiente antes de permitir o resgate de uma recompensa.

---

# 🧪 Testando o backend

Atualmente, o CasaXP pode ser testado diretamente através da **API**, utilizando ferramentas como:

* Insomnia
* Postman
* Thunder Client
* cURL
* Navegador, para requisições `GET`

## 📦 Instalação

Clone o projeto e entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

## ▶️ Executando a API

Inicie o servidor:

```bash
npm run dev
```

A API será executada em:

```text
http://localhost:3000
```

Ao iniciar, o banco de dados SQLite também será conectado e suas tabelas serão criadas automaticamente.

---

# 🔎 Testando uma rota

Depois de iniciar o backend, você pode acessar:

```text
http://localhost:3000/
```

A API deverá retornar:

```json
{
  "mensagem": "CasaXP API funcionando! 🚀"
}
```

Também é possível testar:

```text
GET /usuarios
GET /tarefas
GET /conclusoes
GET /recompensas
GET /resgates
```

Exemplo:

```text
http://localhost:3000/usuarios
```

---

# 📂 Estrutura principal

```text
casaxp/
│
├── app/                    # Aplicativo mobile
│
├── assets/                 # Recursos do aplicativo
│
├── backend/                # API
│   ├── src/
│   │   ├── database.ts
│   │   ├── server.ts
│   │   ├── usuarios.ts
│   │   ├── tarefas.ts
│   │   ├── conclusoes.ts
│   │   ├── recompensas.ts
│   │   ├── resgates.ts
│   │   └── database/
│   │       └── init.ts
│   │
│   └── database/
│       └── casaxp.db
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

# 👩‍💻 Autora

**Letícia**

Projeto pessoal desenvolvido para estudo e prática de desenvolvimento **mobile, backend, APIs REST e banco de dados**.
