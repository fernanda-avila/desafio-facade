// Importa a configuração do Knex, que conecta ao banco de dados
const db = require('../knex.js');

// Define a classe StockFacade que centraliza a lógica de acesso à tabela "stock"
class StockFacade {
  // Define o nome da tabela usada em todos os métodos da classe
  static table = 'stock';

  /**
   * Método para padronizar a estrutura de erro retornada em qualquer método da classe
   * @param {Error} error - O erro capturado no bloco try/catch
   * @returns {Object} Um objeto com `error: true` e a mensagem formatada
   */
  static returnDefaultError(error) {
    return {
      error: true,
      message: `[StockFacade]: ${error.message || 'Unexpected error!'}`
    };
  }

  /**
   * Retorna todos os produtos da tabela 'stock'
   * @returns {Object} Um objeto com erro false e os dados, ou erro true com a mensagem
   */
  static async getAllProducts() {
    try {
      // Realiza um SELECT * na tabela definida
      const products = await db(this.table).select('*');
      // Retorna os produtos encontrados
      return { error: false, data: products };
    } catch (error) {
      // Em caso de erro, retorna o erro padronizado
      return this.returnDefaultError(error);
    }
  }

  /**
   * Retorna um único produto pelo ID
   * @param {number} id - ID do produto a ser buscado
   * @returns {Object} Produto encontrado ou mensagem de erro
   */
  static async getById(id) {
    try {
      // Busca um único produto pelo ID usando where + first()
      const product = await db(this.table).where({ id }).first();

      // Se não encontrar, retorna erro personalizado
      if (!product) {
        return { error: true, message: 'Produto não encontrado' };
      }

      // Retorna o produto encontrado
      return { error: false, data: product };
    } catch (error) {
      // Retorna erro padronizado em caso de exceção
      return this.returnDefaultError(error);
    }
  }

  /**
   * Cria um novo produto na tabela 'stock'
   * @param {Object} data - Dados do produto a ser criado (nome, quantidade, unidade)
   * @returns {Object} Produto criado ou mensagem de erro
   */
  static async create(data) {
    try {
      // Insere o produto no banco e retorna o ID gerado (PostgreSQL)
      const [id] = await db(this.table).insert(data).returning('id');

      // Busca novamente o produto criado com base no ID
      const product = await db(this.table).where({ id }).first();

      // Retorna os dados do novo produto
      return { error: false, data: product };
    } catch (error) {
      // Retorna erro padronizado em caso de falha
      return this.returnDefaultError(error);
    }
  }

  /**
   * Atualiza um produto existente com base no ID
   * @param {number} id - ID do produto a ser atualizado
   * @param {Object} data - Novos dados do produto
   * @returns {Object} Produto atualizado ou erro
   */
  static async update(id, data) {
    try {
      // Atualiza os dados do produto onde o ID corresponder
      const updated = await db(this.table).where({ id }).update(data);

      // Se nenhum registro foi alterado, retorna erro
      if (!updated) {
        return { error: true, message: 'Produto não encontrado para atualizar' };
      }

      // Busca o produto atualizado
      const product = await db(this.table).where({ id }).first();

      // Retorna os dados atualizados
      return { error: false, data: product };
    } catch (error) {
      // Retorna erro padronizado
      return this.returnDefaultError(error);
    }
  }

  /**
   * Exclui um produto da tabela com base no ID
   * @param {number} id - ID do produto a ser excluído
   * @returns {Object} Confirmação da exclusão ou erro
   */
  static async delete(id) {
    try {
      // Exclui o produto da tabela e retorna a quantidade de registros deletados
      const deleted = await db(this.table).where({ id }).del();

      // Se nenhum registro foi deletado, retorna erro
      if (!deleted) {
        return { error: true, message: 'Produto não encontrado para excluir' };
      }

      // Retorna confirmação de exclusão
      return { error: false, data: { deleted } };
    } catch (error) {
      // Retorna erro padronizado
      return this.returnDefaultError(error);
    }
  }
}

// Exporta a classe para ser usada em outras partes do projeto
module.exports = StockFacade;
