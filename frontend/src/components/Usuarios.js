import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Usuarios() {
  return (
    <LayoutMantenimiento
      Added='Usuario ingresado.'
      ApiUrl='api/usuarios'
      Component='Usuarios'
      DataLoaded='Usuarios cargados.'
      DataNotLoaded='Error obteniendo los usuarios.'
      Deleted='Usuario dado de baja.'
      NotAdded='Error ingresando el usuario.'
      NotDeleted='Error dando de baja el usuario.'
      NotUpdated='Error actualizando el usuario.'
      Updated='Usuario actualizado.'
      Titulo='Usuarios del sistema'
      Columnas={[
        { title: 'ID', field: '_id', editable: 'never' },
        { title: 'Rol', field: 'IDRol.Nombre', editable: 'never' },
        { title: 'Nombres', field: 'Nombres', emptyValue: 'N/A' },
        { title: 'Apellidos', field: 'Apellidos', emptyValue: 'N/A' },
        { title: 'Email', field: 'Email', editable: 'never' },
        { title: 'Última Conexión', field: 'UltimaConexion', editable: 'never' }
      ]}
    />
  );
}

export default Usuarios;
