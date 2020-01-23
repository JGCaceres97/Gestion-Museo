import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';
import { TextField } from '@material-ui/core';

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
        {
          title: 'ID',
          field: '_id',
          editable: 'never',
          hidden: true,
          emptyValue: 'N/A',
          defaultSort: 'asc'
        },
        {
          title: 'Nombre',
          field: 'Nombre',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              placeholder='Nombre'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 20, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        },
        {
          title: 'Descripción',
          field: 'Descripcion',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              value={props.value || ''}
              placeholder='Descripción'
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 100, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        }
      ]}
    />
  );
}

export default Etiquetas;
