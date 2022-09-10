import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ocupacion from '../../Indices/Relations/Ocupacion/Ocupacion.component'

import './IndiceItem.css';

const IndiceItem = ({ indice, id }) => {
  const [ocupacion, setOcupacion] = useState({});

  const { nombre_cuoc_indice, cod_indice } = indice;
  
  useEffect(() => {
    setOcupacion(indice["ocupacion02"]);
    console.log("indice", indice);
    console.log("id", indice._id);
  }, []);

  return (
    <article className="indice-item">
    <div className="indice-item__content">
      <h1>Código Indice: {cod_indice}</h1>
      <h2>Nombre: {nombre_cuoc_indice}</h2>
        <br />
      <b>Ocupación:</b>{Array.isArray(ocupacion) ? (ocupacion).map((item) => { return <Ocupacion key={item.cod_indice} ocupacion={item} /> }) : "error despleganmdo ocupacion, intente mas tarde.."}<br />
      <div className="indice-item__controls">
        <Link to={`/indices/ + ${id}`}>Más información..</Link>
      </div>
    </div>
  </article>
  );
};

export default IndiceItem;