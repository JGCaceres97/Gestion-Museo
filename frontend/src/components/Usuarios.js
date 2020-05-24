// @ts-check
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { address, port } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';
import LayoutMantenimiento from '../layouts/Mantenimiento';

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
      grouping
      added='Usuario ingresado.'
      apiUrl='api/usuarios'
      component='Usuarios'
      dataLoaded='Usuarios cargados.'
      dataNotLoaded='Error obteniendo los usuarios.'
      deleted='Usuario dado de baja.'
      notAdded='Error ingresando el usuario.'
      notDeleted='Error dando de baja el usuario.'
      notUpdated='Error actualizando el usuario.'
      updated='Usuario actualizado.'
      titulo='Usuarios del Sistema'
      isEditable={rowData => rowData.Nombres !== 'Admin'}
      isDeletable={rowData => rowData.Nombres !== 'Admin'}
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
          title: 'Rol',
          lookup: Roles,
          field: 'IDRol',
          editable: Usuarios ? 'always' : 'never'
        },
        {
          title: 'Nombres',
          field: 'Nombres',
          emptyValue: 'N/A',
          editable: Usuarios ? 'always' : 'never',
          editComponent: props => (
            <TextField
              placeholder='Nombres'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 50, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        },
        {
          title: 'Apellidos',
          field: 'Apellidos',
          emptyValue: 'N/A',
          editable: Usuarios ? 'always' : 'never',
          editComponent: props => (
            <TextField
              placeholder='Apellidos'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 50, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        },
        {
          title: 'Email',
          field: 'Email',
          editable: 'onAdd',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              placeholder='Email'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{
                maxLength: 50,
                minLength: 1,
                pattern: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}/,
                style: { fontSize: 13 }
              }}
            />
          )
        },
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
