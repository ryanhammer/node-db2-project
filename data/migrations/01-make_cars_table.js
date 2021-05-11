exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
    // primary key car_id is an integer, autoincrementing...
    table.increments('car_id');
    table.text('car_vin', 255).unique().notNullable();
    table.text('car_make', 128).notNullable();
    table.text('car_model', 128).notNullable();
    table.float('car_mileage').notNullable();
    table.text('car_title', 128);
    table.text('car_transmission', 128);
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};

