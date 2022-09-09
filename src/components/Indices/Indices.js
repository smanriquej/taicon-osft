import React from 'react';

import IndiceItem from './IndiceItem/IndiceItem';

import './Indices.css';

const indices = props => (
  <section className="indices">
    {props.indices.map(p => (
      <IndiceItem
        key={p._id}
        id={p._id}
        cod_indice={p.cod_indice}
        nombre_cuoc_indice={p.nombre_cuoc_indice}
        // price={p.price}
        // imageUrl={p.image}
        onDelete={props.onDeleteIndice}
      />
    ))}
  </section>
);

export default indices;
