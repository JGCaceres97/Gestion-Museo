// @ts-check
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';
import useLocalStorage from '../customHooks/useLocalStorage';

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
        { title: 'ID', field: '_id', editable: 'never', hidden: true, emptyValue: 'N/A' },
        { title: 'Nombre', field: 'Nombre', emptyValue: 'N/A' },
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
        { title: 'Descripción', field: 'Descripcion', emptyValue: 'N/A' }
      ]}
    />
  );
}

export default Roles;
