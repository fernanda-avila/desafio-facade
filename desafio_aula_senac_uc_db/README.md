# 🏗️ Desafio: Implementação de Facade com Knex.js
<br><br>
## 📋  Descrição

Este desafio consiste na criação de uma **Facade** para gerenciamento de produtos em um sistema de estoque, utilizando o **Knex.js** como query builder para interação com o banco de dados.

A classe `StockFacade` centraliza operações CRUD na tabela `stock` com tratamento de erros e respostas padronizado.

## 🎯 Objetivos do desafio

- ✅ Implementar o padrão Facade.
- ✅ Aplicar boas práticas de tratamento de erros.
- ✅  Utilizar Knex.js para abstração do banco de dados.
- ✅ Garantir uma interface consistente para operações CRUD.
<br><br>
### 🚀 Tecnologias utilizadas
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Knex.js](https://img.shields.io/badge/Knex.js-000000?style=for-the-badge&logo=knex&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JSDoc](https://img.shields.io/badge/JSDoc-43853d?logo=jsdoc&logoColor=white&style=for-the-badge)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white&style=for-the-badge)
![Faker.js](https://img.shields.io/badge/Faker.js-03dffc?logo=faker&logoColor=white&style=for-the-badge)

<br><br>
## 📝 Requisitos
- Node.js instalado.
- Banco de dados configurado e migrado com a tabela stock.
- Knex.js configurado no projeto (knexfile.js).
<br><br>
### 🛠️ Estrutura da Facade

|Método|	Descrição
|--|--|
`returnDefaultError(error)` |	Retorna um erro padrão formatado pela Facade.
`getAllProducts()` |	Retorna todos os produtos cadastrados.
`getById(id)`	| Retorna um produto específico pelo ID.
`create(data)` |	Cria um novo produto no estoque.
`update(id, data)` |	Atualiza um produto existente.
`delete(id)` |	Exclui um produto do estoque.

<br><br>

## 💡 Dicas
- Mantenha o código limpo e modular.
- Priorize a clareza na interface da Facade.
- Utilize async/await para garantir operações assíncronas bem tratadas.
<br><br>
## 🧑‍💻 Autor

##### Desenvolvido por `@thesckurtt`
##### GitHub: https://github.com/thesckurtt
