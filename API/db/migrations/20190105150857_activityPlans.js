
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activityPlans', table =>{
    table.increments()
    
    table.timestamps(true,true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activityPlans')
};
