// @ts-check
import TextField from '@material-ui/core/TextField';
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Horarios() {
  return (
    <LayoutMantenimiento
      Added='Horario ingresado.'
      ApiUrl='api/horarios'
      Component='Horarios'
      DataLoaded='Horarios cargados.'
      DataNotLoaded='Error obteniendo los horarios.'
      Deleted='Horario eliminado.'
      NotAdded='Error ingresando el horario.'
      NotDeleted='Error eliminando el horario.'
      NotUpdated='Error actualizando el horario.'
      Updated='Horario actualizado.'
      Titulo='Horarios de Atención'
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
