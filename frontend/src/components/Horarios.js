// @ts-check
import TextField from '@material-ui/core/TextField';
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Horarios() {
  return (
    <LayoutMantenimiento
      added='Horario ingresado.'
      apiUrl='api/horarios'
      component='Horarios'
      dataLoaded='Horarios cargados.'
      dataNotLoaded='Error obteniendo los horarios.'
      deleted='Horario eliminado.'
      notAdded='Error ingresando el horario.'
      notDeleted='Error eliminando el horario.'
      notUpdated='Error actualizando el horario.'
      updated='Horario actualizado.'
      titulo='Horarios de Atención'
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
          title: 'Hora',
          field: 'Hora',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              placeholder='Hora'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 10, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        }
      ]}
    />
  );
}

export default Horarios;
