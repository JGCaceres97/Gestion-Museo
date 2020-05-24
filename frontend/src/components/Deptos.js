// @ts-check
import TextField from '@material-ui/core/TextField';
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Deptos() {
  return (
    <LayoutMantenimiento
      added='Departamento ingresado.'
      apiUrl='api/deptos'
      component='Departamentos'
      dataLoaded='Departamentos cargados.'
      dataNotLoaded='Error obteniendo los departamentos.'
      deleted='Departamento eliminado.'
      notAdded='Error ingresando el departamento.'
      notDeleted='Error eliminando el departamento.'
      notUpdated='Error actualizando el departamento.'
      updated='Departamento actualizado.'
      titulo='Departamentos'
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
        }
      ]}
    />
  );
}

export default Deptos;
