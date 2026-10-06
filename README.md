# NeuroTask

**Sistema web de produtividade com Inteligência Artificial**

## Sobre o projeto

O **NeuroTask** é uma aplicação web de produtividade desenvolvida para auxiliar o usuário na organização e execução de tarefas utilizando recursos de Inteligência Artificial.

A proposta é combinar gerenciamento de tarefas, análise automática por IA, acompanhamento de progresso e gamificação em uma única aplicação.

O sistema permite que o usuário registre suas tarefas e receba uma classificação automática de prioridade, além de contar com insights e interação direta com um assistente de IA.

## Objetivo

O objetivo do NeuroTask é tornar a organização de tarefas mais prática e orientada por contexto.

Ao cadastrar uma tarefa, o sistema utiliza Inteligência Artificial para analisar o conteúdo informado e identificar seu nível de prioridade. Dessa forma, o usuário consegue visualizar suas atividades organizadas e acompanhar sua evolução ao longo do uso da aplicação.

## Funcionalidades

### Gerenciamento de tarefas

O usuário pode:

* Criar novas tarefas;
* Editar tarefas existentes;
* Concluir e reabrir tarefas;
* Excluir tarefas;
* Visualizar o progresso das atividades;
* Organizar as tarefas de acordo com sua prioridade.

### Classificação automática de prioridade

Uma das principais funcionalidades do NeuroTask é a utilização de Inteligência Artificial para analisar cada tarefa cadastrada.

Após o usuário informar uma tarefa, o frontend envia a solicitação para o backend, que realiza a comunicação com a API da OpenAI.

A IA classifica a tarefa em três níveis:

* Alta prioridade;
* Média prioridade;
* Baixa prioridade.

A prioridade definida é armazenada junto com a tarefa e utilizada posteriormente para organizar sua apresentação na interface.

### Insights gerados por IA

O sistema também utiliza IA para analisar o conjunto de tarefas cadastradas e gerar sugestões e mensagens de orientação relacionadas à produtividade.

Dessa forma, a inteligência artificial não está presente apenas no cadastro das tarefas, mas também participa da experiência contínua do usuário.

### Assistente de IA

O NeuroTask possui uma área de interação direta com a Inteligência Artificial.

O usuário pode enviar uma mensagem e receber uma resposta do assistente, utilizando o backend como intermediário para comunicação com a API da OpenAI.

### Sistema de XP

O projeto utiliza um mecanismo simples de gamificação para incentivar a conclusão das tarefas.

Ao concluir uma atividade, o usuário recebe pontos de experiência (XP). Caso a tarefa seja reaberta, os pontos correspondentes são descontados.

O XP acumulado é apresentado no dashboard juntamente com o progresso das tarefas.

### Dashboard de produtividade

O dashboard apresenta informações relacionadas ao progresso do usuário, incluindo:

* Quantidade de tarefas concluídas;
* Quantidade total de tarefas;
* XP acumulado.

Essas informações permitem acompanhar visualmente a evolução da produtividade.

### Persistência de dados

As tarefas e a pontuação do usuário são armazenadas no `localStorage` do navegador.

Isso permite que as informações permaneçam disponíveis mesmo após o recarregamento da página.

## Arquitetura

O projeto possui uma estrutura separando frontend e backend.

### Frontend

Responsável pela:

* Interface da aplicação;
* Interação com o usuário;
* Gerenciamento das tarefas;
* Atualização do dashboard;
* Comunicação com o backend;
* Exibição das respostas da IA.

### Backend

Desenvolvido com Node.js e Express, o backend funciona como intermediário entre a aplicação e a API da OpenAI.

A aplicação possui uma rota `POST /ai`, responsável por receber as mensagens enviadas pelo frontend, realizar a chamada para a API de Inteligência Artificial e retornar a resposta para a aplicação.

A chave da API é obtida por meio de variável de ambiente utilizando `dotenv`, evitando sua inserção direta no código da aplicação.

## Fluxo da classificação por IA

```text
Usuário
   ↓
Cadastro da tarefa
   ↓
Frontend
   ↓
POST /ai
   ↓
Backend Node.js + Express
   ↓
API da OpenAI
   ↓
Classificação da tarefa
   ↓
Prioridade retornada
   ↓
Tarefa adicionada ao sistema
   ↓
Dashboard atualizado
```

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Express
* OpenAI API
* node-fetch
* dotenv
* CORS
* LocalStorage
* Git
* GitHub

## Conceitos aplicados

* Desenvolvimento frontend;
* Desenvolvimento backend;
* APIs REST;
* Integração com API de Inteligência Artificial;
* Requisições assíncronas;
* Manipulação do DOM;
* Persistência de dados no navegador;
* Gerenciamento de estado da aplicação;
* Classificação de dados utilizando IA;
* Gamificação;
* Organização de tarefas;
* Comunicação entre frontend e backend.

## Segurança

A comunicação com a API da OpenAI é realizada pelo backend, utilizando uma variável de ambiente para armazenar a chave de acesso.

A aplicação não precisa expor diretamente a chave da API no código do frontend, mantendo a credencial no ambiente do servidor.

## Próximas evoluções

O NeuroTask foi desenvolvido como uma base para futuras melhorias.

Entre as possibilidades de evolução estão:

* Implementação de autenticação de usuários;
* Persistência das tarefas em banco de dados;
* Histórico de produtividade;
* Sistema de metas;
* Métricas mais avançadas;
* Recomendações personalizadas de produtividade;
* Evolução do assistente de IA;
* Melhorias no sistema de gamificação;
* Integração com calendários e ferramentas externas.

## Aprendizados

O desenvolvimento do NeuroTask permitiu aplicar conceitos de desenvolvimento web e integração com Inteligência Artificial em uma aplicação funcional.

O projeto também proporcionou experiência prática na comunicação entre frontend e backend, criação de endpoints, consumo de APIs externas, utilização de variáveis de ambiente e implementação de funcionalidades baseadas em respostas de IA.

## Status

**Em desenvolvimento**

O NeuroTask possui atualmente gerenciamento de tarefas, classificação automática de prioridade por IA, geração de insights, assistente de IA, dashboard de produtividade e sistema de XP.

## Autora

**Stefany Viveiros Barboza**

Estudante de Análise e Desenvolvimento de Sistemas e Engenharia da Computação, com interesse em desenvolvimento web, Inteligência Artificial, automação e construção de soluções digitais.
