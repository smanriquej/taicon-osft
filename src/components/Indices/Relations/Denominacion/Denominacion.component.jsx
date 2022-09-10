import React from 'react';

const Denominacion = ({ denominacionOcu }) => {
  const { denominacion, nombre_denominacion } = denominacionOcu;

  return (
    <div>
      - <b>( {denominacion} )</b>  {nombre_denominacion}.
    </div>
  );
};

export default Denominacion;