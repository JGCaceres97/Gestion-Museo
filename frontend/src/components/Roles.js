// @ts-check
import TextField from '@material-ui/core/TextField';
import React from 'react';
import useLocalStorage from '../customHooks/useLocalStorage';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Roles() {
  const [{ Usuarios }] = useLocalStorage('Permisos', '');

  return (
    <LayoutMantenimiento
      Added='Rol ingresado.'
      ApiUrl='api/roles'
      Component='Roles'
      DataLoaded='Roles cargados.'
      DataNotLoaded='Error obteniendo los roles.'
      Deleted='Rol eliminado.'
      NotAdded='Error ingresando el rol.'
      NotDeleted='Error eliminando el rol.'
      NotUpdated='Error actualizando el rol.'
      Updated='Rol actualizado.'
      Titulo='Roles'
      Columnas={[
        {
          title: 'ID',
          field: '_id',
          editable: 'never',
          hidden: true,
          emptyValue: 'N/A',
          defaultSort: 'desc'
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
          type: 'boolean',
          title: 'Permiso Bitácora',
          field: 'Permisos.Bitacora',
          editable: Usuarios ? 'always' : 'never'
        },
        {
          type: 'boolean',
          title: 'Permiso Reportería',
          field: 'Permisos.Reporteria',
          editable: Usuarios ? 'always' : 'never'
        },
        {
          type: 'boolean',
          title: 'Permiso Usuarios',
          field: 'Permisos.Usuarios',
          editable: Usuarios ? 'always' : 'never'
        },
        {
          type: 'boolean',
          title: 'Permiso Backup',
          field: 'Permisos.Backup',
          editable: Usuarios ? 'always' : 'never'
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

export default Roles;
