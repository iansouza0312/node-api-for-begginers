# Criando API's de forma escalável

Esse projeto visa demonstrar um exemplo prático, desde a criação e configurações iniciais de um projeto _backend_ simples, de um sistema de acervo de cursos, até a otimização e refatoração dos códigos, juntamente com a utilização de uma boa arquitetura/design pattern, utilizando boas práticas de programação e técnologias atuais que são muito utilizadas no mercado, trazendo boa escalabilidade, disponibilidade e manutenibilidade para as aplicações.

## Técnologias utilizadas no desenvolvimento da aplicação :

- NodeJS (Version 23.8.0)
- Typescript
- Fastify
- Swagger
- Docker
- Drizzle
- Postgres (docker image)
- Git (controle de versionamento)

## IMPORTANTE - Para criar e manter uma boa documentação, foram utilizadas as libs :

- fastify-type-provider-zod
- zod
- @fastify/swagger

Com essa combinação, além de desenvolver validações consistentes e completas, é possível automatizar o desenvolvimento de documentações robustas e muito bem-escritas, facilitando o trabalho de integração com o dev frontend.

## Boas práticas que devem ser utilizadas, sempre que possível :

1. Armazenar credenciais de segurança e acesso em variáveis de ambiente (`.env` file).
2. Utilizando docker para realizar todo o 'setup' do banco de dados de maneira simples e objetiva, sem ter que configurar localmente (para executar o container basta utilizar o comando : `docker compose up -d`).
3. Utilização de ORM (`Drizzle`) para utilização de migrations do banco de dados.
4. HTTP Status Code's coerentes e objetivos para cada requisição e tratamento de erros.

## Termos técnicos importantes :

- Object-Relational Mapping | ORM : técnica que traduz o código orientado a objetos de uma aplicação para o modelo relacional de um banco de dados, atuando como uma camada que gera certo nível de abstração na escrita de consultas SQL dentro do seu código, permitindo que traalhe diretamente com objetos dentro da linguagem de programação do projeto, sem utilizar SQL puro.

## Arquivos de ORM (Object-Relational Mapping)

- [schema.ts](./src/database/schema.ts)
  - Estrutura das tabelas do DataBase
- [client.ts](./src/database/client.ts)
  - Conexão com DataBase

### Diferenças entre `validação` e `serialização` de dados

- Validação : validar que os dados de entrada estão conforme os requisitos
- Serialização : uma forma de converter/transformar dados de saída de uma rota eum um outro formato

### Exemplo de validação de dados

- Server.ts (validate title field)

```
...
"/courses",
  {
    schema: {
      body: z.object({
        title: z.string().min(5, "Title must be at least 5 characters long"),
      }),
    },
  },
  async (request, reply) => {...}
...
```

- Output (with bad request) :

```
HTTP/1.1 400 Bad Request
content-type: application/json; charset=utf-8
content-length: 132
Date: Sat, 06 Dec 2025 02:28:51 GMT
Connection: close

{
  "statusCode": 400,
  "code": "FST_ERR_VALIDATION",
  "error": "Bad Request",
  "message": "body/title Title must be at least 5 characters long"
}

```
