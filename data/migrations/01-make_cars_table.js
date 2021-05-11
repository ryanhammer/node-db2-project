exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
    // primary key fruit_id integers, autoincrementing...
    table.increments('vehicle_id');
    table.text('vin', 255).unique().notNullable();
    table.text('make', 128).notNullable();
    table.text('model', 128).notNullable();
    table.float('mileage').notNullable();
    table.text('title', 128);
    table.text('transmission', 128);
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};

