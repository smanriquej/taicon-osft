import React from 'react';

import ProductItem from './ProductItem/ProductItem';

import './Products.css';

const products = props => (
  <section className="products">
    {props.indices.map(p => (
      <ProductItem
        key={p._id}
        id={p._id}
        cod_indice={p.nombre_cuoc_indice}
        nombre_cuoc_indice={p.nombre_cuoc_indice}
        // price={p.price}
        // imageUrl={p.image}
        onDelete={props.onDeleteIndice}
      />
    ))}
  </section>
);

export default products;
