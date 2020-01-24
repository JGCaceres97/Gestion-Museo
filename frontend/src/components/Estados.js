// @ts-check
import TextField from '@material-ui/core/TextField';
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
              inputProps={{ maxLength: 15, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        },
        {
          title: 'Descripción',
          field: 'Descripcion',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              placeholder='Descripción'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 50, style: { fontSize: 13 } }}
            />
          )
        }
      ]}
    />
  );
}

export default Estados;
