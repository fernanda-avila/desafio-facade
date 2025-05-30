exports.up = async function(knex) {
  await knex.schema.createTable('stock', function(table) {
    table.increments('id').primary();
    table.string('product_name').notNullable();
    table.integer('quantity').defaultTo(0);
    table.string('unit').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('stock');
};
