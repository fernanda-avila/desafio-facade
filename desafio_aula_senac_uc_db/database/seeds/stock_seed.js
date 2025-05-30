const { faker } = require('@faker-js/faker');

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('stock').del();

  const stocks = [];

  for (let i = 0; i < 10; i++) {
    stocks.push({
      product_name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 100 }), 
      unit: faker.helpers.arrayElement(['unid', 'kg', 'litro', 'm']),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // Inserts seed entries
  await knex('stock').insert(stocks);
};
