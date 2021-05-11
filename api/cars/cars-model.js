const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = async (id) => {
  const car = await db('cars').where({ id }).first();
  return car;
}

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create
}