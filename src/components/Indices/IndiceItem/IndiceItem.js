import React from 'react';
import { Link } from 'react-router-dom';

import './IndiceItem.css';

const indiceItem = props => (
  <article className="indice-item">
    {/* <div
      className="indice-item__image"
      style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
    /> */}
    <div className="indice-item__content">
      <h1>{props.cod_indice}</h1>
      <h2>{props.nombre_cuoc_indice}</h2>
      <p>{props.nombre_cuoc_indice}</p>
      <div className="indice-item__controls">
        <Link to={'/indices/' + props.id}>Details</Link>
        <Link to={'/indices/' + props.id + '/edit'}>Edit</Link>
        {/* <button onClick={props.onDelete.bind(this, props.id)}>Delete</button> */}
      </div>
    </div>
  </article>
);

export default indiceItem;
