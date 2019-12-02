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
        { title: 'ID', field: '_id', editable: 'never' },
        { title: 'Hora', field: 'Hora', emptyValue: 'N/A' }
      ]}
    />
  );
}

export default Horarios;
