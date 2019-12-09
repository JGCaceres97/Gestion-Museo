// @ts-check
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutMantenimiento from '../layouts/Mantenimiento';
import { address, port } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';

function Municipios() {
  const [Deptos, setDeptos] = useState({});
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    const getDeptos = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/deptos`, {
          headers: {
            Authorization: Token
          }
        });

        setDeptos(convertArrayToObject(res.data, '_id'));
      } catch (e) {
        console.error(e);
      }
    };

    getDeptos();
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
      Added='Municipio ingresado.'
      ApiUrl='api/municipios'
      Component='Municipios'
      DataLoaded='Municipios cargados.'
      DataNotLoaded='Error obteniendo los municipios.'
      Deleted='Municipio eliminado.'
      NotAdded='Error ingresando el municipio.'
      NotDeleted='Error eliminando el municipio.'
      NotUpdated='Error actualizando el municipio.'
      Updated='Municipio actualizado.'
      Titulo='Municipios'
      Columnas={[
        { title: 'ID', field: '_id', editable: 'never', hidden: true, emptyValue: 'N/A' },
        {
          title: 'Departamento',
          field: 'IDDepartamento',
          emptyValue: 'N/A',
          lookup: Deptos
        },
        { title: 'Municipio', field: 'Nombre', emptyValue: 'N/A' }
      ]}
    />
  );
}

export default Municipios;
