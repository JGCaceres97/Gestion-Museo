// @ts-check
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { address, port } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Municipios() {
  const [Deptos, setDeptos] = useState({});
  const [Token] = useLocalStorage('Token', '');

  /**
   * Método para ordenar un arreglo en base a una clave.
   * @param {string} key Clave a usar de base para el ordenamiento.
   * @param {'asc' | 'desc'} [sorting=asc] Forma de ordenar el arreglo.
   */
  const sortArray = (key, sorting) => {
    return (a, b) => {
      if (sorting === 'desc') {
        return b[key].localeCompare(a[key]);
      } else {
        return a[key].localeCompare(b[key]);
      }
    };
  };

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

  useEffect(() => {
    const getDeptos = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/deptos`, {
          headers: {
            Authorization: Token
          }
        });

        setDeptos(convertArrayToObject(res.data.sort(sortArray('_id')), '_id'));
      } catch (e) {
        console.error(e);
      }
    };

    getDeptos();
  }, [Token]);

  return (
    <LayoutMantenimiento
      grouping
      added='Municipio ingresado.'
      apiUrl='api/municipios'
      component='Municipios'
      dataLoaded='Municipios cargados.'
      dataNotLoaded='Error obteniendo los municipios.'
      deleted='Municipio eliminado.'
      notAdded='Error ingresando el municipio.'
      notDeleted='Error eliminando el municipio.'
      notUpdated='Error actualizando el municipio.'
      updated='Municipio actualizado.'
      titulo='Municipios'
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
          title: 'Departamento',
          field: 'IDDepartamento',
          emptyValue: 'N/A',
          defaultSort: 'asc',
          lookup: Deptos
        },
        {
          title: 'Municipio',
          field: 'Nombre',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              placeholder='Nombre'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 30, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        }
      ]}
    />
  );
}

export default Municipios;
