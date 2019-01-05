
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table=>{
    table.increments()
    table.string('username')
    table.string('email')
    table.string('password')
    table.integer('sunday_nonexercise_activity')
    table.integer('sunday_light_cardio')
    table.integer('sunday_moderate_cardio')
    table.integer('sunday_intense_cardio')
    table.integer('sunday_str')
    table.integer('monday_nonexercise_activity')
    table.integer('monday_light_cardio')
    table.integer('monday_moderate_cardio')
    table.integer('monday_intense_cardio')
    table.integer('monday_str')
    table.integer('tuesday_nonexercise_activity')
    table.integer('tuesday_light_cardio')
    table.integer('tuesday_moderate_cardio')
    table.integer('tuesday_intense_cardio')
    table.integer('tuesday_str')
    table.integer('wednesday_nonexercise_activity')
    table.integer('wednesday_light_cardio')
    table.integer('wednesday_moderate_cardio')
    table.integer('wednesday_intense_cardio')
    table.integer('wednesday_str')
    table.integer('thursday_nonexercise_activity')
    table.integer('thursday_light_cardio')
    table.integer('thursday_moderate_cardio')
    table.integer('thursday_intense_cardio')
    table.integer('thursday_str')
    table.integer('friday_nonexercise_activity')
    table.integer('friday_light_cardio')
    table.integer('friday_moderate_cardio')
    table.integer('friday_intense_cardio')
    table.integer('friday_str')
    table.integer('saturday_nonexercise_activity')
    table.integer('saturday_light_cardio')
    table.integer('saturday_moderate_cardio')
    table.integer('saturday_intense_cardio')
    table.integer('saturday_str')  
    table.timestamps(true,true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};