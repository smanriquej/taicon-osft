const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');
const router = Router();

router.get('/', async (req, res, next) => {
  const indiceFilter = [];
  db.getDb()
    .db()
    .collection("cuoc_indice01")
    .find()
    .toArray((err, results) => {
      if (err) throw err;

      results.forEach((value) => {
        if (value.longitud_indice==5)
        indiceFilter.push({ cod_indice:value.cod_indice, nombre_cuoc_indice:value.nombre_cuoc_indice});
      });
      
      res.status(200).json(indiceFilter);
    })
    // .then(indice => {
    //   console.log("indice", indice);
    //   res.status(200).json(indice);
    // })
    // .catch(err => {
    //   console.log(err);
    //   res.status(500).json({ message: 'An error occurred.' });
    // });
});

module.exports = router;