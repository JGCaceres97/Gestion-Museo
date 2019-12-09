import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Estados() {
  return (
    <LayoutMantenimiento
      Added='Estado ingresado.'
      ApiUrl='api/estados'
      Component='Estados'
      DataLoaded='Estados cargados.'
      DataNotLoaded='Error obteniendo los estados.'
      Deleted='Estado eliminado.'
      NotAdded='Error ingresando el estado.'
      NotDeleted='Error eliminando el estado.'
      NotUpdated='Error actualizando el estado.'
      Updated='Estado actualizado.'
      Titulo='Estados de Solicitudes'
      Columnas={[
        { title: 'ID', field: '_id', editable: 'never', hidden: true, emptyValue: 'N/A' },
        { title: 'Nombre', field: 'Nombre', emptyValue: 'N/A' },
        { title: 'Descripción', field: 'Descripcion', emptyValue: 'N/A' }
      ]}
    />
  );
}

export default Estados;
