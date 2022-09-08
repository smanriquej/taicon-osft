const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of indiceArr indiceArr
router.get('/', (req, res, next) => {
  const queryPage = req.query.page;
  const pageSize = 100;
  const indiceArr = [];
  let cont = 0;
  db.getDb()
    .db()
    .collection('cuoc_indice01')
    .find()
    .sort({ cod_indice: 1})
    .limit(pageSize)
    .forEach(indiceData => {
      cont += 1;
      console.log("cont: ", cont);
      indiceArr.push(indiceData);
    })
    .then(result => {
      console.log('indiceArr.length', indiceArr.length);
      res.status(200).json(indiceArr);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

// Get single product
router.get('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('cuoc_indice01')
    .findOne({ _id: new ObjectId(req.params.id)})
    .then(indiceData => {
      res.status(200).json(indiceData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
  
});

// Add new product
// Requires logged in user
router.post('', (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image
  };
  db.getDb()
    .db()
    .collection('cuoc_indice01')
    .insertOne(newProduct)
    .then(result => {
      res
        .status(201)
        .json({ message: 'Product added', productId: result.insertedId });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});
// Edit existing product
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image
  };
  db.getDb()
    .db()
    .collection('cuoc_indice01')
    .updateOne(
      { _id: new ObjectId(req.params.id) }, 
      { $set: updatedProduct })
  .then(result => {
    res.status(200).json({ message: 'Product updated', productId: req.params.id });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'An error occurred.' });
  })
});

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('cuoc_indice01')
    .deleteOne({ _id: new ObjectId(req.params.id)})
    .then(result => {
      res.status(200).json({ message: 'Product deleted' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred.' });
    });
});

module.exports = router;
