// @ts-check
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../customHooks/useLocalStorage';
import LayoutMantenimiento from '../layouts/Mantenimiento';
import moment from 'moment';
import { address, port } from '../config';

function Usuarios() {
  const [Roles, setRoles] = useState({});
  const [Token] = useLocalStorage('Token', '');
  const [{ Usuarios }] = useLocalStorage('Permisos', '');

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/roles`, {
          headers: {
            Authorization: Token
          }
        });

        setRoles(convertArrayToObject(res.data, '_id'));
      } catch (e) {
        console.error(e);
      }
    };

    getRoles();
  }, [Token]);

  /**
   * Método para convertir un arreglo en un objeto de JavaScript.
   * @param {Array} array Arreglo inicial.
   * @param {string} key Clave de las propiedades del objeto.
   * @returns {Object} Objeto resultante con las propiedades correspondientes.
   */
  const convertArrayToObject = (array, key) => {
    const initial = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item['Nombre']
      };
    }, initial);
  };

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
        { title: 'ID', field: '_id', editable: 'never', hidden: true, emptyValue: 'N/A' },
        {
          title: 'Rol',
          lookup: Roles,
          field: 'IDRol',
          editable: Usuarios ? 'always' : 'never'
        },
        {
          title: 'Nombres',
          field: 'Nombres',
          emptyValue: 'N/A',
          editable: Usuarios ? 'always' : 'never'
        },
        {
          title: 'Apellidos',
          field: 'Apellidos',
          emptyValue: 'N/A',
          editable: Usuarios ? 'always' : 'never'
        },
        { title: 'Email', field: 'Email', editable: 'onAdd', emptyValue: 'N/A' },
        {
          editable: 'never',
          emptyValue: 'N/A',
          field: 'UltimaConexion',
          title: 'Última Conexión',
          render: rowData =>
            rowData ? moment(rowData.UltimaConexion).format('DD/MM/YYYY h:mm A') : ''
        }
      ]}
    />
  );
}

export default Usuarios;
