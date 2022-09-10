import React from 'react';

import IndiceItem from './IndiceItem/IndiceItem.component';

import './Indices.css';

const Indices = ({ indices, filter }) => {
  return (
    <section className="indices">
      <div className="form-group">
        <select name="Indices" className='form-control'>
        {filter.map(indiceItem => (
          <option key={indiceItem.cod_indice} value={indiceItem.cod_indice}>{indiceItem.cod_indice} - {indiceItem.nombre_cuoc_indice}</option>
        ))}
        </select>
      </div>
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