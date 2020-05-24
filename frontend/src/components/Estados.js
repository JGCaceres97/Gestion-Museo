// @ts-check
import TextField from '@material-ui/core/TextField';
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Estados() {
  return (
    <LayoutMantenimiento
      added='Estado ingresado.'
      apiUrl='api/estados'
      component='Estados'
      dataLoaded='Estados cargados.'
      dataNotLoaded='Error obteniendo los estados.'
      deleted='Estado eliminado.'
      notAdded='Error ingresando el estado.'
      notDeleted='Error eliminando el estado.'
      notUpdated='Error actualizando el estado.'
      updated='Estado actualizado.'
      titulo='Estados de Solicitudes'
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
