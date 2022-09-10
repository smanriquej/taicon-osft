import React from 'react';

const AreaCualificacion = ({ area }) => {
  const { codigo_area_cualificacion, area_cualificacion } = area;

  return (
    <div>
      - <b>( {codigo_area_cualificacion} )</b>  {area_cualificacion}.
    </div>
  );
};

export default AreaCualificacion;