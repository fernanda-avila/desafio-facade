## 📄 Alterações na StockFacade
### ✅ Métodos implementados:

#### 🔍 getById(id)
Retorna um produto específico da tabela stock com base no id.
Retorna erro customizado se o produto não for encontrado.

#### ➕ create(data)
Insere um novo produto na tabela stock.
Retorna os dados completos do novo produto com id, created_at e updated_at.

#### ✏️ update(id, data)
Atualiza os dados de um produto existente com base no id.
Retorna os dados atualizados.
Retorna erro específico caso o produto não seja encontrado.

#### 🗑️ delete(id)
Remove um produto da tabela stock com base no id
Retorna { deleted: 1 } em caso de sucesso.
Retorna erro específico caso o produto não seja encontrado.

#### ⚠️ Melhorias Gerais
Todos os métodos agora utilizam a função returnDefaultError para padronizar mensagens de erro.
Tratamento explícito de erros para situações como:
Produto não encontrado (getById, update, delete)
Falhas em operações de banco de dados.

#### Possível erro
No método "create":

const [id] = await db(this.table).insert(data).returning('id');

Esse método pode não funcionar em outros banco de dados que não sejam o PostgreeSQL (banco de dados não relacional).

Possível correção: 

static async create(data) {
  try {
    let id;
    // Tenta usar returning (PostgreSQL)
    if (db.client && db.client.config && db.client.config.client === 'pg') {
      [id] = await db(this.table).insert(data).returning('id');
      if (typeof id === 'object' && id.id) id = id.id; // Ajuste para retorno como objeto
    } else {
      // Para SQLite3 e outros
      id = await db(this.table).insert(data);
      if (Array.isArray(id)) id = id[0];
    }
    const product = await db(this.table).where({ id }).first();
    return { error: false, data: product };
  } catch (error) {
    return this.returnDefaultError(error);
  }
}
