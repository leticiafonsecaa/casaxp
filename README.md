# 🏠 CasaXP

O **CasaXP** é um aplicativo desenvolvido para ajudar famílias a organizar tarefas domésticas de adolescentes de forma simples, organizada e motivadora.

A proposta é transformar as tarefas do dia a dia em um sistema de **XP e recompensas**.

---

# 💡 Como funciona

O CasaXP funciona através de um ciclo simples:

```text
👩 Responsável
       ↓
📋 Cria uma tarefa
       ↓
📱 Adolescente realiza a tarefa
       ↓
✅ Marca como concluída
       ↓
👩 Responsável aprova
       ↓
⭐ Adolescente recebe XP
       ↓
🎁 XP pode ser trocado por recompensas
```

### Exemplo

O responsável pode criar uma tarefa:

> 🧹 **Arrumar o quarto — 30 XP**

O adolescente realiza a tarefa e marca como concluída.

A tarefa deixa de aparecer entre as tarefas disponíveis naquele dia e fica aguardando a aprovação do responsável.

Depois da aprovação:

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

# 👥 Perfis

O CasaXP possui atualmente dois tipos de usuário:

### 👩 Responsável

Pode:

* Criar tarefas
* Visualizar as tarefas cadastradas
* Excluir tarefas
* Visualizar tarefas concluídas
* Aprovar tarefas realizadas
* Liberar XP
* Criar recompensas
* Excluir recompensas

### 👦 Adolescente

Pode:

* Visualizar suas próprias tarefas
* Concluir tarefas
* Acompanhar suas conclusões
* Ver se uma tarefa está aguardando aprovação
* Ver quando uma tarefa foi aprovada
* Acompanhar seu XP
* Resgatar recompensas

O sistema atualmente utiliza uma troca simples de perfil, sem autenticação ou senha.

---

# 📅 Tarefas diárias

As tarefas podem ser realizadas uma vez por dia.

Quando o adolescente conclui uma tarefa:

```text
🧹 Varrer a casa
       ↓
✅ Concluída
       ↓
A tarefa desaparece das tarefas disponíveis
       ↓
👩 Aguardando aprovação
```

A conclusão continua registrada no banco de dados.

No dia seguinte, a tarefa volta a aparecer para ser realizada novamente.

O histórico das conclusões permanece armazenado para futuras funcionalidades.

---

# ⭐ Sistema de XP

O XP é concedido somente depois que uma tarefa concluída é aprovada pelo responsável.

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

Ao resgatar uma recompensa, o custo em XP é descontado do usuário.

---

# 🎁 Sistema de recompensas

O responsável pode cadastrar recompensas com um custo em XP.

Exemplo:

```text
🎮 1 hora de videogame

Custo: 100 XP
```

O adolescente pode resgatar a recompensa caso possua XP suficiente.

O resgate é registrado no banco de dados.

---

# 🛠️ Tecnologias

## Frontend

* React Native
* Expo
* Expo Router
* TypeScript

## Backend

* Node.js
* Express
* TypeScript
* better-sqlite3

## Banco de dados

* SQLite

---

# 🏗️ Arquitetura

```text
📱 React Native / Expo
          ↓
🌐 Node.js + Express API
          ↓
🗄️ SQLite
```

O aplicativo mobile se comunica com a API REST, enquanto o backend é responsável pelas regras de negócio e pela comunicação com o banco de dados.

---

# 🌐 Backend

O backend está localizado na pasta:

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

```text
usuarios
tarefas
conclusoes
recompensas
resgates
```

Relacionamento simplificado:

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

O banco de dados é criado automaticamente pelo backend quando o projeto é executado.

O arquivo do banco é mantido localmente e não é versionado no Git.

---

# 📱 Aplicativo Mobile

O aplicativo foi desenvolvido utilizando React Native com Expo e Expo Router.

As principais telas atualmente são:

```text
🏠 Home
📋 Tarefas
✅ Aprovações
🎁 Recompensas
👤 Perfil
```

Também existem telas destinadas ao gerenciamento:

```text
➕ Nova tarefa
➕ Nova recompensa
⚙️ Gerenciar recompensas
```

O conteúdo apresentado muda de acordo com o perfil selecionado.

---

# 📦 Instalação

Clone o projeto:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd casaxp
```

Instale as dependências do projeto:

```bash
npm install
```

Entre no backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando o Backend

Dentro da pasta `backend`, execute:

```bash
npm run dev
```

A API será executada em:

```text
http://localhost:3000
```

Ao iniciar, o banco de dados SQLite será conectado e suas tabelas serão criadas automaticamente.

---

# 📱 Executando o aplicativo

Na raiz do projeto, execute:

```bash
npx expo start
```

O aplicativo pode ser executado utilizando o ambiente Expo configurado para o projeto.

---

# 🔎 Testando a API

Depois de iniciar o backend, acesse:

```text
http://localhost:3000/
```

A API deverá retornar:

```json
{
  "mensagem": "CasaXP API funcionando! 🚀"
}
```

Também é possível testar as seguintes rotas:

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

├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── tarefas.tsx
│   │   ├── aprovacoes.tsx
│   │   ├── recompensas.tsx
│   │   ├── perfil.tsx
│   │   ├── nova-tarefa.tsx
│   │   ├── nova-recompensa.tsx
│   │   └── gerenciar-recompensas.tsx
│   │
│   ├── components/
│   ├── context/
│   │   └── usuario.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   └── styles/
│
├── assets/
│
├── backend/
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
│   └── package.json
│
├── app.json
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

# 🚀 Status do projeto

O CasaXP possui atualmente um **MVP funcional**, com o fluxo principal implementado:

```text
👩 Responsável
      ↓
📋 Cria tarefa
      ↓
👦 Adolescente realiza
      ↓
✅ Conclui
      ↓
👩 Responsável aprova
      ↓
⭐ XP é liberado
      ↓
🎁 Adolescente resgata recompensa
```

Também estão implementados:

* Perfis de usuário
* Controle de funcionalidades por perfil
* Tarefas diárias
* Sistema de XP
* Aprovação de tarefas
* Recompensas
* Resgate de recompensas
* Persistência em SQLite
* API REST
* Integração entre aplicativo e backend

---

# 🔮 Possíveis melhorias futuras

Algumas funcionalidades podem ser adicionadas futuramente:

* Login e autenticação
* Cadastro de múltiplos adolescentes
* Histórico completo de tarefas e XP
* Níveis e conquistas
* Notificações
* Edição de tarefas
* Categorias de tarefas
* Recorrência configurável
* Banco de dados online
* Publicação do aplicativo

---

# 👩‍💻 Autora

**Letícia**

Projeto pessoal desenvolvido para estudo e prática de:

* Desenvolvimento mobile
* React Native
* Expo
* TypeScript
* Node.js
* APIs REST
* SQLite
* Banco de dados
* Integração entre frontend e backend
* Regras de negócio
