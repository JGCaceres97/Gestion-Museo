// @ts-check
import TextField from '@material-ui/core/TextField';
import React from 'react';
import useLocalStorage from '../customHooks/useLocalStorage';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Roles() {
  const [{ Usuarios }] = useLocalStorage('Permisos', '');

  return (
    <LayoutMantenimiento
      added='Rol ingresado.'
      apiUrl='api/roles'
      component='Roles'
      dataLoaded='Roles cargados.'
      dataNotLoaded='Error obteniendo los roles.'
      deleted='Rol eliminado.'
      notAdded='Error ingresando el rol.'
      notDeleted='Error eliminando el rol.'
      notUpdated='Error actualizando el rol.'
      updated='Rol actualizado.'
      titulo='Roles'
      isEditable={rowData => rowData.Nombre !== 'Admin'}
      isDeletable={rowData => rowData.Nombre !== 'Admin'}
      columnas={[
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
              inputProps={{ maxLength: 100, style: { fontSize: 13 } }}
            />
          )
        }
      ]}
    />
  );
}

export default Roles;
