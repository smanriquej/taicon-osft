const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of indiceArr indiceArr
router.get('/', async (req, res, next) => {
  const pipeline = [
    { $match: { cod_indice: "02100" } },
    {
      $lookup: {
        from: 'cuoc_ocupacion02',
        localField: 'cod_indice',
        foreignField: "cod_indice",
        as: "ocupacion02"
      }
    },
    {
      $lookup: {
        from: 'cuoc_conocimiento05',
        localField: 'cod_indice',
        foreignField: "ocupacion",
        as: "conocimiento05"
      }
    },
    {
      $lookup: {
        from: 'cuoc_denominaciones03',
        localField: 'cod_indice',
        foreignField: "ocupacion",
        as: "denominaciones03"
      }
    },
    {
      $lookup: {
        from: 'cuoc_destreza06',
        localField: 'cod_indice',
        foreignField: "ocupacion",
        as: "destreza06"
      }
    },
    {
      $lookup: {
        from: 'cuoc_funciones04',
        localField: 'cod_indice',
        foreignField: "ocupacion",
        as: "funciones04"
      }
    },
    {
      $lookup: {
        from: 'cuoc_ocupacion_afin07',
        localField: 'cod_indice',
        foreignField: "ocupacion",
        as: "ocupacion_afin07"
      }
    },
    {
      $lookup: {
        from: 'cuoc_area_cualificacion08',
        localField: 'cod_indice',
        foreignField: "ocupacion",
        as: "area_cualificacion08"
      }
    },
    {
      $lookup: {
        from: 'cuoc_equivalencia10',
        localField: 'cod_indice',
        foreignField: "ocupacion",
        as: "equivalencia10"
      }
    },
    {
      $project: {
        "cod_indice": 1,
        "longitud_indice": 1,
        "indice_gran_grupo": 1,
        "indice_subgrupo_ppal": 1,
        "indice_subgrupo": 1,
        "indice_grupo_primario": 1,
        "indice_perfil_ocupacional": 1,
        "indice_denominacion_ocupacion": 1,
        "nombre_cuoc_indice": 1,
        "ocupacion02.cod_indice": 1,
        "ocupacion02.descripcion_cupacion": 1,
        "conocimiento05.id_conocimiento": 1,
        "conocimiento05.nombre_conocimiento": 1,
        "denominaciones03.denominacion": 1,
        "denominaciones03.nombre_denominacion": 1,
        "denominaciones03.fuente_denominacion": 1,
        "denominaciones03.codigo_ciuo": 1,
        "destreza06.id_destreza": 1,
        "destreza06.nombre_destreza": 1,
        "funciones04.consecutivo_funcion": 1,
        "funciones04.redaccion_funcion": 1,
        "funciones04.fuente_ciuo": 1,
        "funciones04.fuente_cno": 1,
        "ocupacion_afin07.ocupacion_afin": 1,
        "ocupacion_afin07.nombre_ocupacion_afin": 1,
        "area_cualificacion08.codigo_area_cualificacion": 1,
        "area_cualificacion08.area_cualificacion": 1,
        "equivalencia10.codigo_ciuo": 1,
        "equivalencia10.observacion_ciuo": 1,
        "equivalencia10.codigo_cno": 1,
        "equivalencia10.observacion_cno": 1,
        "equivalencia10.validacion": 1
      }
    }
  ];

  const indiceArr = [];
  let cont = 0;
  const aggCursor = db.getDb()
    .db()
    .collection("cuoc_indice01")
    .aggregate(pipeline);

  await aggCursor.forEach(indiceData => {
    cont += 1;
    console.log("cont: ", cont);
    console.log("indiceData", indiceData);
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
