
exports.up = function(knex, Promise) {
  return knex.schema.createTable('body_comp', table=>{
    table.increments('id')
    table.integer('user_id')
    table.float('weight')
    table.float('bf_per')
    table.timestamps(true,true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('body_comp')
};
