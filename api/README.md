# Documentação API do Projeto - PW2

# Agenda para Acompanhamento da Massa Corporal

## Introdução

A Agenda para Acompanhamento da Massa Corporal é uma aplicação web responsiva que permite aos usuários registrarem seu peso diário, acompanhar a evolução da massa corporal através de gráficos e receber indicativos sobre seu peso em relação ao ideal. A aplicação requer autenticação e armazena os dados dos usuários em um banco de dados. Foi desenvolvida utilizando as tecnologias Node.js com Express e PostgreSQL.

## Requisitos Funcionais

1. Registro e Autenticação do Usuário:
    - Os usuários devem ser capazes de realizar o cadastro informando nome, idade, e-mail válido, senha, peso atual, meta de peso, altura e tempo estimado para alcançar a meta.
    - A aplicação deve permitir que os usuários acessem o sistema através de autenticação segura usando JWT (JSON Web Token).
2. Acompanhamento da Massa Corporal:
    - Os usuários devem poder informar seu peso atual para uma determinada data.
    - A aplicação deve exibir gráficos que mostram a evolução da massa corporal ao longo do tempo, permitindo que os usuários acompanhem seu progresso.
    - Indicativos devem ser exibidos para informar aos usuários se estão acima do peso ideal, abaixo ou com o peso adequado de acordo com sua altura e idade.
3. Gerenciamento da Meta de Peso:
    - Os usuários devem ter a capacidade de definir uma meta de peso e o tempo estimado para alcançá-la.
    - Eles também devem ser capazes de atualizar essas informações conforme necessário.
4. Integração com Banco de Dados:
    - A aplicação deve se comunicar com um banco de dados PostgreSQL para armazenar os dados dos usuários e as informações de peso registradas.
5. Upload e Visualização de Mídias:
    - O sistema web deve permitir aos usuários realizar o upload de imagens relacionadas ao acompanhamento da massa corporal.
    - Os usuários devem poder visualizar as mídias que foram carregadas.

## Arquitetura

A aplicação segue uma arquitetura cliente-servidor, onde o servidor é desenvolvido com Node.js e Express e se comunica com o banco de dados PostgreSQL. O cliente é implementado em ReactJS e se integra à API fornecida pelo servidor. A comunicação entre o cliente e o servidor é realizada através de requisições HTTP.

A aplicação é composta pelos seguintes componentes:

- **Servidor**: Implementado com Node.js e Express, fornece uma API RESTful para comunicação com o cliente.
- **Banco de Dados**: Utiliza o PostgreSQL para armazenar os dados dos usuários e as informações de peso.
- **Cliente**: Implementado em ReactJS, é responsável por fornecer a interface de usuário interativa e se integra à API fornecida pelo servidor.

## Configuração

Para executar a aplicação localmente, siga as instruções abaixo:

### Pré-requisitos

- Node.js e npm (Node Package Manager) ou YARN instalados.
- Banco de dados PostgreSQL configurado.

### Configuração do Servidor (Node.js com Express)

1. Clone o repositório do projeto do servidor em sua máquina.
2. Navegue até o diretório

 do projeto e abra um terminal.
3. Execute o seguinte comando para instalar as dependências:

```
npm install
```
or
```
yarn install
```

4. Após a instalação das dependências, gere o Prisma Client para se comunicar com o banco de dados PostgreSQL:

```
npx prisma generate
```
or
```
yarn prisma generate
```

4.1 Lembre-se de atualizar o arquivo do `prisma.schema` para conseguir se conectar ao seu serviço do banco de dados e realizar as migrates para gerar as tabelas com os models pré-constituídos.

5. Execute o seguinte comando para iniciar o servidor:

```
npm run dev
```
or
```
yarn dev
```

6. Acesso o serviço no seguinte link: http://localhost:3000/api-docs/

## Estrutura do Código

A estrutura do código do projeto é organizada da seguinte forma:

### Servidor (Node.js com Express)

- **src/controllers**: Contém os controladores do servidor, que lidam com as requisições e respostas.
- **src/routes**: Contém as definições das rotas da API do servidor.
- **src/services**: Contém os serviços responsáveis por interagir com o banco de dados e realizar as operações necessárias.
- **src/repository**: Contém as requisições CRUD para o banco de dados.
- **src/models**: Contém os modelos de dados utilizados pelo servidor.
- **src/server.ts**: Arquivo de configuração para as informações do banco de dados.

## Rotas da API

A API fornecida pelo servidor possui os seguintes endpoints principais:

- **POST /login**: Realiza o login do usuário e retorna um token JWT válido.
- **GET /logout**: Realiza o logout do usuário e queima o token JWT válido.
- **POST /register/user**: Registra um novo usuário na aplicação.
- **GET /usuarios/{id}**: Obtém os detalhes de um usuário específico.
- **PUT /usuarios/{id}**: Atualiza as informações de um usuário específico.
- **DELETE /usuarios/{id}**: Faz a troca de flag do usuário para inativo no banco de dados.
- **GET /usuario/{id}/pesos**: Obtém os registros de peso de um usuário específico, de forma paginada.
- **GET /pesos/{id}**: Obtém os dados específicos para um registro de peso.
- **POST /pesos**: Realiza o registro em banco do peso do usuário.
- **PUT /usuarios/pesos/{id}**: Atualiza as informações de um registro específico de peso do usuário.
- **DELETE /usuarios/pesos/{id}**: Realiza a exclusão do registro no banco de dados.
- **GET /usuario/{id}/midias**: Obtém os registros de mídia de um usuário específico, de forma paginada.
- **GET /midias/{id}**: Obtém os dados específicos para um registro de mídia.
- **POST /midias**: Realiza o registro em banco da mídia do usuário.
- **PUT /usuarios/midias/{id}**: Atualiza as informações de um registro específico de mídia do usuário.
- **DELETE /usuarios/midias/{id}**: Realiza a exclusão do registro de mídias no banco de dados.

## Referências

- Documentação oficial do Node.js: https://nodejs.org/en/docs/
- Documentação oficial do Express: https://expressjs.com/
- Documentação oficial do PostgreSQL: https://www.postgresql.org/docs