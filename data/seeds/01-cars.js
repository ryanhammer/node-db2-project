exports.seed = async function(knex) {
  // Truncates table - wipes it, resets primary key to 1
  await knex('cars').truncate();

  // Inserts seed entries
  await knex('cars').insert([
    {
      vin: '13738492051111111',
      make: 'ford',
      model: 'F150',
      mileage: 88291,
      title: 'clean',
      transmission: 'automatic'
    },
    {
      vin: '11115672130891111',
      make: 'toyota',
      model: 'camry',
      mileage: 18876,
      title: 'clean',
      transmission: 'auto'
    },
    {
      vin: '11551111116784111',
      make: 'subaru',
      model: 'impreza',
      mileage: 61855,
      transmission: 'manual'
    },
    {
      vin: '21551164667841113',
      make: 'kia',
      model: 'telluride',
      mileage: 11721,
      title: 'salvage'
    }
  ]);
};
