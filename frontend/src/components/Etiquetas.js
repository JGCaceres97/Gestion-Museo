import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Etiquetas() {
  return (
    <LayoutMantenimiento
      Added='Etiqueta ingresada.'
      ApiUrl='api/etiquetas'
      Component='Etiquetas'
      DataLoaded='Etiquetas cargadas.'
      DataNotLoaded='Error obteniendo las etiquetas.'
      Deleted='Etiqueta eliminada.'
      NotAdded='Error ingresando la etiqueta.'
      NotDeleted='Error eliminando la etiqueta.'
      NotUpdated='Error actualizando la etiqueta.'
      Updated='Etiqueta actualizada.'
      Titulo='Etiquetas de Libros'
      Columnas={[
        { title: 'ID', field: '_id', editable: 'never', hidden: true, emptyValue: 'N/A' },
        { title: 'Nombre', field: 'Nombre', emptyValue: 'N/A' },
        { title: 'Descripción', field: 'Descripcion', emptyValue: 'N/A' }
      ]}
    />
  );
}

export default Etiquetas;
