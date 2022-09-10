import React from 'react';

const Funcion = ({ funcion }) => {
  const { consecutivo_funcion, fuente_ciuo, fuente_cno, redaccion_funcion } = funcion;

  return (
    <div>
      - <b>( cod: </b>{consecutivo_funcion} <b>ciuo:</b> {fuente_ciuo} <b>cno:</b> {fuente_cno} <b>) </b >{redaccion_funcion}.
    </div>
  );
};

export default Funcion;