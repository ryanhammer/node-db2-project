const express = require('express');

const Cars = require('./cars-model');

const { checkCarPayload, checkVinNumberValid, checkCarId, checkVinNumberUnique } = require('./cars-middleware');

const router = express.Router()

router.get('/', (req, res, next) => {
  Cars.getAll()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(next)
});

router.get('/:id', checkCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post(
  '/',
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => 
  {
    Cars.create(req.body)
      .then(car => {
        res.status(201).json(car);
      })
      .catch(next);
  }
);

router.put(
  '/:id',
  checkCarPayload,
  checkCarId,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) =>
  {
    Cars.updateById(req.params.id, req.body)
      .then( car => {
        res.status(200).json(car);
      })
      .catch(next)
  }
);

router.delete('/:id', checkCarId, (req, res, next) => {
  Cars.deleteById(req.params.id)
    .then( car => {
      res.status(200).json(car);
    })
    .catch(next)
});

router.use( (err, req, res ) => {
  res.status(err.status || 500).json({
    note: "Something went wrong in the cars router",
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
