import React from 'react';

import IndiceItem from './IndiceItem/IndiceItem.component';

import './Indices.css';

const Indices = ({ indices }) => {
  return (
    <section className="indices">
      {indices.map(p => (
        <IndiceItem
          key={p._id}
          id={p._id}
          indice={p}
        />
    ))}
  </section>
  );
};

export default Indices;