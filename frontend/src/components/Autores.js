// @ts-check
import moment from 'moment';
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Autores() {
  return (
    <LayoutMantenimiento
      Added='Autor ingresado.'
      ApiUrl='api/autores'
      Component='Autores'
      DataLoaded='Autores cargados.'
      DataNotLoaded='Error obteniendo los autores.'
      Deleted='Autor dado de baja.'
      NotAdded='Error ingresando el autor.'
      NotDeleted='Error dando de baja el autor.'
      NotUpdated='Error actualizando el autor.'
      Updated='Autor actualizado.'
      Titulo='Autores'
      Columnas={[
        {
          title: 'ID',
          field: '_id',
          editable: 'never',
          hidden: true,
          emptyValue: 'N/A'
        },
        { title: 'Nombre', field: 'Nombre', emptyValue: 'N/A', defaultSort: 'asc' },
        { title: 'Nacionalidad', field: 'Nacionalidad', emptyValue: 'N/A' },
        { title: 'Generos literarios', field: 'GenerosLiterarios', emptyValue: 'N/A' },
        {
          title: 'Fecha de nacimiento',
          field: 'FechaNacimiento',
          emptyValue: 'N/A',
          editable: 'always',
          type: 'date',
          render: rowData => (rowData ? moment(rowData.FechaNacimiento).format('DD/MM/YYYY') : '')
        }
      ]}
    />
  );
}

export default Autores;
