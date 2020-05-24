import TextField from '@material-ui/core/TextField';
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Etiquetas() {
  return (
    <LayoutMantenimiento
      added='Etiqueta ingresada.'
      apiUrl='api/etiquetas'
      component='Etiquetas'
      dataLoaded='Etiquetas cargadas.'
      dataNotLoaded='Error obteniendo las etiquetas.'
      deleted='Etiqueta eliminada.'
      notAdded='Error ingresando la etiqueta.'
      notDeleted='Error eliminando la etiqueta.'
      notUpdated='Error actualizando la etiqueta.'
      updated='Etiqueta actualizada.'
      titulo='Etiquetas de Libros'
      columnas={[
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
