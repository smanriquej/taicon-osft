import React from 'react';

import IndiceItem from './IndiceItem/IndiceItem';

import './Indices.css';

const indices = (props) => {
  return (
  <section className="indices">
    {props.indices.map(p => (
      <IndiceItem
        key={p._id}
        id={p._id}
        indice={p}
      />
    ))}
  </section>
  )
};

export default indices;