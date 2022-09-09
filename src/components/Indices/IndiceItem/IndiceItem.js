import React from 'react';
import { Link } from 'react-router-dom';

import './IndiceItem.css';

const indiceItem = (props) => {
  const { id } = props;
  const { nombre_cuoc_indice, cod_indice } = props.indice;
  const { descripcion_cupacion } = props.indice.ocupacion02[0];
  return (
  <article className="indice-item">
    {/* <div
      className="indice-item__image"
      style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
    /> */}
    <div className="indice-item__content">
      <h1>Código Indice: {cod_indice}</h1>
      <h2>Nombre: {nombre_cuoc_indice}</h2>
      <p><b>Ocupación: </b><br/>{descripcion_cupacion}</p>
      <div className="indice-item__controls">
        <Link to={`/indices/ + ${id}`}>Más información..</Link>
        {/* <Link to={'/indices/' + props.id + '/edit'}>Edit</Link> */}
        {/* <button onClick={props.onDelete.bind(this, props.id)}>Delete</button> */}
      </div>
    </div>
  </article>
  )
};

export default indiceItem;
