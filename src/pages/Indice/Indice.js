import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './Indice.css';
import Spinner from '../../components/spinner/spinner';

const Indice = (props) => {
  const [indice, setIndice] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const value = props.match.params.id.replace('+', '').trim();
    const url = `http://localhost:3200/indices/${value}`;
    // console.log('this.props.match.params.id', `http://localhost:3200/indices/${value}`);
    axios
      .get(url)
      .then(indiceResponse => {
        setIsLoading(false);
        setIndice(indiceResponse.data[0]);
        console.log(indiceResponse.data);
        console.log(indice);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        props.onError('Loading the indice failed. Please try again later');
      });
  }, []);

  // const { nombre_cuoc_indice, cod_indice } = indice;
  
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <main className="indice-page">
          <h1>Código Indice: {indice.cod_indice}</h1>
          <h2>Nombre: {indice.nombre_cuoc_indice}</h2>
            {/* <p><b>Ocupación: </b><br />{indice.ocupacion02[0].descripcion_cupacion}</p> */}
        </main>
      )}
    </Fragment>
  );
};

export default Indice;