const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const car = await Cars.getById(id);
    if (!car) {
      res.status(404).json({
        message: `car with id ${id} is not found`
      });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

const checkCarPayload = (req, res, next) => {
    const vin = req.body.vin.trim();
    const make = req.body.make.trim();
    const model = req.body.model.trim();
    const mileage = req.body.mileage;
    if (!vin || vin.length === 0) {
      res.status(400).json({
        message: "vin is missing"
      });
    } else if (!make || make.length === 0) {
      res.status(400).json({
        message: "make is missing"
      });
    } else if (!model || model.length === 0) {
      res.status(400).json({
        message: "model is missing"
      });
    } else if (!mileage || mileage.length === 0) {
      res.status(400).json({
        message: "mileage is missing"
      });
    } else {
      req.body.vin = vin;
      req.body.make = make;
      req.body.model = model;
      next();
    }
}

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin.trim();
  if (!vinValidator.validate(vin)) {
    res.status(400).json({
      message: `vin ${vin} is invalid`
    });
  } else {
    req.body.vin = vin;
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const allCars = await Cars.getAll();
  const getCarList = (carList) => {
    if (req.params.id) {
      const filteredCars = carList.filter( car => {
        return car.id !== req.params.id
      });
      return filteredCars;
    } else {
      return carList;
    }
  }
  const cars = getCarList(allCars);
  if (
    cars.some( car => {
      return car.vin === req.body.vin
    })
  ) {
    res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}