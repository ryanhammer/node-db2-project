exports.seed = async function(knex) {
  // Truncates table - wipes it, resets primary key to 1
  await knex('cars').truncate();

  // Inserts seed entries
  await knex('cars').insert([
    {
      vin: '1FDTF4HT5FEA48134',
      make: 'ford',
      model: 'F150',
      mileage: 88291,
      title: 'clean',
      transmission: 'automatic'
    },
    {
      vin: 'JTECX9FJ7D5005956',
      make: 'toyota',
      model: 'camry',
      mileage: 18876,
      title: 'clean',
      transmission: 'auto'
    },
    {
      vin: 'JF1GE6B61AH511147',
      make: 'subaru',
      model: 'impreza',
      mileage: 61855,
      transmission: 'manual'
    },
    {
      vin: '5XYPK4A10GG047797',
      make: 'kia',
      model: 'telluride',
      mileage: 11721,
      title: 'salvage'
    }
  ]);
}