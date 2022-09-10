import React from 'react';

const Ocupacion = ({ ocupacion }) => {
  const { descripcion_ocupacion } = ocupacion;

  return (
    <div>
      {descripcion_ocupacion}
    </div>
  );
};

export default Ocupacion;