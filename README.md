# Empreenda Mais Elas - MVP Web 

> **Documentação de Arquitetura de Software**

Este repositório contém o projeto completo de **Empreenda Mais Elas**, uma plataforma de apoio ao empreendedorismo feminino.

##  Funcionalidades Destacadas (EP3 - Impressionante!)

###  O que torna este MVP especial:

-  **Sistema de Pagamento Integrado** - PIX e Cartão de Crédito (modo teste)
-  **Avaliação de Mentorias** - Rating em estrelas + comentários
-  **Notificações em Tempo Real** - Toast notifications elegantes
-  **Video Call Integrado** - Link direto para Google Meet
-  **Carrinho de Compras** - Com contador dinâmico
-  **CRUD Completo** - Criar, editar, deletar produtos e mentorias
-  **Interface Responsiva** - Funciona em mobile e desktop
-  **Autenticação JWT** - Segura e escalável

##  Documentação

Para uma visão completa da arquitetura do sistema, consulte o documento:

**[ARQUITETURA.md](../projeto_integrado_2/ARQUITETURA.md)** - Documentação arquitetural completa com:

- Visão geral do sistema
- Estrutura em camadas
- Componentes e integrações
- Decisões arquiteturais
- Padrões e boas práticas

## Arquivos de Entrega (2 arquivos)

Para atender ao enunciado da disciplina, a entrega final deve conter exatamente:

1. **Relatório**
   - [RELATORIO_ENTREGA.md](../projeto_integrado_2/RELATORIO_ENTREGA.md)
2. **Documentação Arquitetural**
   - [ARQUITETURA.md](../projeto_integrado_2/ARQUITETURA.md)

---

##  Frontend (React SPA)

O frontend foi construído com React e se comunica com uma API REST desenvolvida em Flask.

###  Tecnologias Utilizadas

- **[React](https://react.dev/) 19.2.6** - Biblioteca para construção da interface
- **[Vite](https://vitejs.dev/) 8.0.12** - Ferramenta de build rápida com HMR
- **JavaScript ES2024** - Linguagem padrão do projeto
- **[React Router Dom](https://reactrouter.com/) 7.1.1** - Roteamento SPA
- **[Tailwind CSS](https://tailwindcss.com/) 3.4.19** - Utility-first styling
- **[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** - Comunicação com backend

###  Pré-requisitos

- **[Node.js](https://nodejs.org/)** 16+
- **npm** ou **yarn**

###  Como rodar o projeto

1. Clone este repositório:

```bash
git clone <URL-DO-REPOSITORIO>
cd empreendamaiselas
```

1. Instale as dependências:

```bash
npm install
```

1. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

1. Acesse no navegador:

```
http://127.0.0.1:5173
```

###  Estrutura de Diretórios

```
empreendamaiselas/
├── src/
│   ├── App.jsx              # Componente raiz com rotas
│   ├── main.jsx             # Entry point
│   ├── index.css            # Estilos globais
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ProtectedRoute.jsx
│   │   ├── TopNavBar.jsx
│   │   ├── Footer.jsx
│   │   └── botao.jsx
│   ├── layouts/             # Layouts compartilhados
│   │   └── authlayout.jsx
│   ├── pages/               # Páginas (rotas)
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Marketplace.jsx
│   │   ├── Mentorias.jsx
│   │   ├── Trilhas.jsx
│   │   ├── Diagnostico.jsx
│   │   ├── PainelEmpreendedora.jsx
│   │   └── PainelAdministrativoVisaoGeral.jsx
│   ├── services/            # Camada de integração com API
│   │   ├── api.js           # Cliente HTTP
│   │   └── adapters.js      # Normalização de dados
│   ├── styles/              # Arquivos CSS específicos
│   └── assets/              # Imagens e arquivos estáticos
├── package.json
├── vite.config.js           # Configuração Vite + proxy
├── tailwind.config.js       # Configuração Tailwind
└── README.md
```

###  Recursos Principais

- ✅ Autenticação com JWT
- ✅ Rotas protegidas
- ✅ Formulários funcionais (Login, Cadastro, Produto, Mentoria)
- ✅ Integração com backend Flask
- ✅ Normalização de dados com adaptadores
- ✅ Responsividade mobile-first
- ✅ Dashboard com dados reais

---

## ⚙️ Backend (Flask REST API)

Consulte o arquivo [README_BACKEND.md](../projeto_integrado_2/README_BACKEND.md) ou [GUIA_EXECUCAO_VENV.md](../projeto_integrado_2/GUIA_EXECUCAO_VENV.md) para informações sobre o backend.

---

##  Processo de Desenvolvimento

### Sprint - Divisão de Tarefas

A equipe organizou o desenvolvimento do MVP em etapas bem definidas:

**Fase 1: Planejamento & Arquitetura**
- Análise de requisitos e casos de uso
- Definição da arquitetura cliente-servidor
- Escolha de tecnologias (React, Flask, SQLAlchemy)
- Documentação arquitetural completa

**Fase 2: Backend API**
- Configuração inicial do Flask e banco de dados
- Implementação de modelos (User, Produto, Mentoria, Trilha, Pedido, etc.)
- Desenvolvimento de Controllers e Services
- Autenticação com JWT
- Endpoints REST para 8 módulos principais

**Fase 3: Frontend**
- Setup de React com Vite
- Componentização (Navbar, Footer, Forms, Cards)
- Implementação de rotas e navegação (React Router)
- Integração com API backend (Fetch API + Adaptadores)
- Telas principais (Login, Register, Dashboard, Marketplace, Mentorias, Trilhas, Painel Admin)

**Fase 4: Testes & Validação**
- Testes de funcionalidades principais
- Validação de fluxo autenticação → dados
- Correção de bugs e ajustes de UX
- Documentação final

### GitHub & Versionamento

- **Repositório:** Estrutura clara com `/empreendamaiselas` (frontend) e `/projeto_integrado_2` (backend)
- **Commits:** Histórico representando evolução (setup, features, fixes)
- **Branches:** main + feature branches para trabalho paralelo
- **Documentação:** README, ARQUITETURA.md, RELATORIO_ENTREGA.md centralizados

### Dificuldades Encontradas & Soluções

| Dificuldade | Solução |
|---|---|
| Integração CORS entre React (porta 5173) e Flask (porta 7000) | Implementar proxy no vite.config.js |
| Token JWT armazenado no localStorage | Usar adaptador para incluir `Authorization: Bearer {token}` em todas requisições |
| Normalização de dados da API | Criar adaptadores (adapters.js) para mapear respostas |
| Rotas protegidas no frontend | Implementar ProtectedRoute.jsx com validação de token |
| Estrutura do banco de dados | Definir relacionamentos (User → Mentoria, Produto → Pedido, etc.) |
| Autenticação e autorização | JWT no backend + validação em Controllers |

### Status Atual

✅ **Concluído:**
- Backend: 8 módulos funcionais com endpoints REST
- Frontend: Navegação, autenticação, integração com API
- Banco: Modelos e relacionamentos implementados
- Documentação: Arquitetura e README completos

 **Em evolução:**
- Testes automatizados (pytest no backend, Jest no frontend)
- Deploy em produção
- Escalabilidade para múltiplos usuários simultâneos

---

## 🎬 Demonstração do MVP

### Tela de Login & Registro

O sistema inicia com autenticação segura via JWT:

```
1. Usuária acessa http://127.0.0.1:5173
2. Seleciona "Login" ou "Registrar"
3. Preenche email e senha
4. Backend valida credenciais e retorna access_token
5. Frontend armazena token e redireciona para Dashboard
```

**Status:** ✅ Funcional

### Dashboard Principal

Após login, usuária é direcionada para Dashboard com:
- Saudação personalizada ("Olá, [Nome]")
- Cards com atalhos para principais módulos
- Indicadores de progresso (Trilhas, Mentorias, Vendas)

**Endpoints utilizados:**
- `GET /auth/me` - Obter dados da usuária logada
- `GET /trilhas` - Listar trilhas de aprendizagem
- `GET /mentorias` - Listar mentorias agendadas
- `GET /pedidos` - Listar pedidos realizados

**Status:** ✅ Funcional

### Marketplace

Vitrine de produtos com busca e filtros:
- Listagem de produtos cadastrados
- Filtro por categoria
- Detalhes do produto (preço, descrição, vendedor)
- **Carrinho de compras com contador**  
- **Sistema de pagamento com PIX e Cartão**  

**Endpoints utilizados:**
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/<id>` - Obter detalhes
- `POST /pedidos` - Criar novo pedido
- `POST /pagamentos` - Processar pagamento
- `POST /notificacoes` - Enviar notificação de compra

**Fluxo de Pagamento:**
1. Usuária adiciona produtos ao carrinho ("🛒 Adicionar ao Carrinho")
2. Toast notification confirma adição
3. Clica em "Carrinho (N)" no topo para abrir modal
4. Seleciona método (PIX ou Cartão)
5. **PIX:** Gera QR code simulado para cópia
6. **Cartão:** Preenche dados (teste: 4242 4242 4242 4242)
7. Clica "Pagar" e recebe confirmação

**Status:**  Funcional

### Módulo de Mentorias

Agendamento de sessões com mentoras:
- Listagem de mentoras disponíveis
- Formulário de agendamento com data/hora
- **Editar mentorias agendadas**  
- **Cancelar mentorias com confirmação** 
- **Avaliação pós-mentoria com rating em estrelas** 
- **Link para Google Meet integrado** 

**Endpoints utilizados:**
- `GET /mentorias` - Listar mentorias
- `POST /mentorias` - Agendar nova mentoria
- `PUT /mentorias/<id>` - Editar mentoria
- `DELETE /mentorias/<id>` - Deletar mentoria
- `POST /avaliacoes-mentoria` - Avaliar mentoria

**Fluxo de Avaliação:**
1. Usuária clica em "⭐ Avaliar" na mentoria
2. Modal abre com seletor de 1-5 estrelas
3. Campo de comentário opcional
4. Clica "Avaliar" e feedback é registrado

**Status:** ✅ Funcional

**Status:** ✅ Funcional

### Trilhas de Aprendizagem

Conteúdo estruturado por nível:
- Trilhas de "Alfabetização Digital", "Finanças", "Gestão", etc.
- Conteúdos progressivos dentro de cada trilha
- Rastreamento de progresso

**Endpoints utilizados:**
- `GET /trilhas` - Listar trilhas
- `POST /aprendizagem/diagnosticos` - Submeter diagnóstico
- `GET /aprendizagem/progressos` - Obter progresso

**Status:** ✅ Funcional

### Painel Administrativo

Dashboard para monitoramento de impacto:
- Métricas de usuárias cadastradas
- Vendas totalizadas
- Mentorias realizadas
- Progresso nas trilhas

**Endpoints utilizados:**
- `GET /usuarios` - Listar todas as usuárias
- `GET /produtos` - Total de produtos
- `GET /pedidos` - Total de vendas
- `GET /trilhas` - Engajamento em trilhas

**Status:** ✅ Funcional

### Fluxo Completo de Uso

```
Usuária Anônima
    ↓
    └─→ Cadastro (POST /auth/register)
        └─→ Login (POST /auth/login)
            └─→ Dashboard
                ├─→ Trilhas (GET /trilhas)
                ├─→ Mentorias (GET /mentorias → POST /mentorias)
                ├─→ Marketplace (GET /produtos → POST /pedidos)
                └─→ Diagnóstico (POST /aprendizagem/diagnosticos)

Admin/Mentora
    ↓
    └─→ Login com role especial
        └─→ Painel Administrativo
            ├─→ Ver todas as usuárias
            ├─→ Monitorar vendas
            ├─→ Confirmar mentorias
            └─→ Gerar relatórios
```

---

##  O que é Arquitetura de Software?

### Entendimento da Equipe

Arquitetura de Software é o **projeto estrutural de um sistema**, semelhante ao projeto arquitetônico de um edifício. Assim como um arquiteto define como os cômodos de uma casa se organizam, os materiais usados, como a eletricidade fluirá e como o prédio evitará desabamentos, um arquiteto de software define:

- **Como os componentes se organizam** (o que comunica com o quê)
- **Quais tecnologias usar** (linguagens, frameworks, bancos de dados)
- **Como o fluxo de dados acontece** (da interface até o banco)
- **Como o sistema mantém-se estável** (tratamento de erros, segurança)

É o "mapa mental" que guia todos os desenvolvedores do projeto, garantindo consistência e qualidade.

### Importância no Desenvolvimento

Uma boa arquitetura é fundamental porque:

1. **Evita caos:** Sem estrutura, cada desenvolvedor faz do seu jeito, código fica incompreensível
2. **Facilita manutenção:** Novo desenvolvedor consegue entender o projeto rapidamente
3. **Reduz bugs:** Componentes bem separados são testáveis e previsíveis
4. **Economiza tempo:** Padrões bem definidos aceleram desenvolvimento de novas features

### Como a Arquitetura Impacta Escalabilidade

**Escalabilidade = capacidade de crescer sem quebrar.**

Uma arquitetura bem pensada permite:

- **Adicionar novos usuários** sem derrubar o servidor (separando frontend de backend)
- **Adicionar novas features** sem refatorar tudo (componentes reutilizáveis)
- **Mudar de tecnologia** sem reescrever tudo (abstrações bem feitas)

Exemplo: Se todas as funcionalidades estivessem em um único arquivo gigante, adicionar um novo módulo seria impossível. Com arquitetura em camadas, é só criar um novo controller e integrar.

### Como a Arquitetura Impacta Segurança

**Segurança = proteção contra acessos não autorizados.**

Uma boa arquitetura garante:

- **Tokens JWT** armazenados e validados em cada requisição (em vez de deixar tudo aberto)
- **Separação backend/frontend** significa que lógica sensível nunca vai para o navegador
- **Validação em dois pontos** (frontend e backend) reduz risco de ataque
- **Banco de dados isolado** que só fala com backend (frontend não acessa diretamente)

Exemplo: Sem separação frontend/backend, um usuário malicioso poderia acessar o banco de dados diretamente. Com arquitetura cliente-servidor, o backend protege o banco.

### Como a Arquitetura Impacta Desempenho

**Desempenho = velocidade de resposta.**

Uma boa arquitetura otimiza:

- **Cache:** Dados frequentes armazenados em memória (não buscam do BD toda vez)
- **Roteamento eficiente:** Requisições chegam rápido no endpoint certo
- **Índices do banco:** Buscas no BD retornam em milissegundos
- **Componentes leves:** JavaScript que não bloqueia a UI renderização

Exemplo: Se todos os dados fossem carregados de uma vez, a página teria lentidão. Com arquitetura em camadas e lazy loading, cada página carrega só o necessário.

### Como a Arquitetura Impacta Manutenção

**Manutenção = conseguir mexer no código sem medo de quebrar tudo.**

Uma boa arquitetura permite:

- **Encontrar bugs rápido:** Services isolados são testáveis
- **Modificar sem efeito cascata:** Mudança em um Controller não quebra outro
- **Onboard novos devs:** Padrões claros permitem aprendizado rápido
- **Versionar com confiança:** Git workflows organizados rastreiam todas mudanças

Exemplo: Se lógica de negócio estivesse espalhada em 100 componentes React, um bug demoraria horas para encontrar. Com Services centralizados, achamos em minutos.

### Como a Arquitetura Impacta Evolução do Sistema

**Evolução = capacidade de mudar e melhorar continuamente.**

Uma boa arquitetura permite:

- **Migrar tecnologias:** React → Vue, Flask → FastAPI sem reescrever tudo (if abstrações boas)
- **Adicionar microsserviços:** Separar Finance de Mentoria em serviços independentes (if bem estruturado)
- **Escalar bancos de dados:** SQLite → PostgreSQL → Sharding (if ORM abstrai BD)
- **Integrar novos serviços:** Stripe, SendGrid, AI (if camadas bem definidas)

Exemplo: Este MVP começou com SQLite. Com SQLAlchemy na arquitetura, mudamos para PostgreSQL em produção sem reescrever queries.

### Qualidade do Projeto de Software

Uma boa arquitetura é o indicador número 1 de qualidade porque:

**Código ruim** é escrito rápido, mas lido 10x mais (manutenção cara)
**Código bem arquitetado** leva mais tempo no início, mas é barato de manter e evoluir

Projeto de qualidade significa:

- ✅ Código legível e previsível
- ✅ Fácil adicionar features novas
- ✅ Fácil encontrar e corrigir bugs
- ✅ Fácil treinar novos desenvolvedores
- ✅ Sistema confiável que não cai à toa

Exemplo: Este MVP de Empreenda Mais Elas foi estruturado com arquitetura sólida desde o início. Por isso conseguimos adicionar 6 novos módulos (Mentorias, Trilhas, Marketplace, Finanças, etc.) sem precisar refatorar o core.

---

##  Arquitetura do Projeto

```
┌─ Frontend (React)
│  ├─ Componentes React
│  ├─ React Router (Roteamento SPA)
│  └─ Fetch API + Adaptadores (Integração)
│
├─ API REST (Flask)
│  ├─ Controllers (Roteamento)
│  ├─ Services (Lógica de Negócio)
│  └─ Repositories (Acesso ao BD)
│
└─ Banco de Dados (SQLite/PostgreSQL)
   └─ SQLAlchemy ORM
```

---
