// @ts-check
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Deptos() {
  return (
    <LayoutMantenimiento
      Added='Departamento ingresado.'
      ApiUrl='api/deptos'
      Component='Departamentos'
      DataLoaded='Departamentos cargados.'
      DataNotLoaded='Error obteniendo los departamentos.'
      Deleted='Departamento eliminado.'
      NotAdded='Error ingresando el departamento.'
      NotDeleted='Error eliminando el departamento.'
      NotUpdated='Error actualizando el departamento.'
      Updated='Departamento actualizado.'
      Titulo='Departamentos'
      Columnas={[
        {
          title: 'ID',
          field: '_id',
          editable: 'never',
          hidden: true,
          emptyValue: 'N/A',
          defaultSort: 'asc'
        },
        { title: 'Nombre', field: 'Nombre', emptyValue: 'N/A' }
      ]}
    />
  );
}

export default Deptos;
