import React from 'react';
import { Link } from 'react-router-dom';

import './ProductItem.css';

const productItem = props => (
  <article className="product-item">
    {/* <div
      className="product-item__image"
      style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
    /> */}
    <div className="product-item__content">
      <h1>{props.cod_indice}</h1>
      {/* <h2>${props.price}</h2> */}
      <p>{props.nombre_cuoc_indice}</p>
      <div className="product-item__controls">
        <Link to={'/products/' + props.id}>Details</Link>
        <Link to={'/products/' + props.id + '/edit'}>Edit</Link>
        {/* <button onClick={props.onDelete.bind(this, props.id)}>Delete</button> */}
      </div>
    </div>
  </article>
);

export default productItem;
