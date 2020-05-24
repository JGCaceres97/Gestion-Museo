// @ts-check
import { TextField } from '@material-ui/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Refresh,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { address, port, tableLocalization } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';
import Snack from '../utils/Snack';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

/**
 * Método para el mantenimiento de la biblioteca de libros.
 */
function Biblioteca() {
  const [data, setData] = useState([]);
  const [Autores, setAutores] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [IsSnackInfo, setIsSnackInfo] = useState(false);
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    document.title = 'Biblioteca';
  });

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

  const loadData = useCallback(async () => {
    try {
      const res = await axios.get(`http://${address}:${port}/api/libros`, {
        headers: {
          authorization: Token
        }
      });

      setData(res.data);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, [Token]);

  useEffect(() => {
    setSnackOpen(false);
    setIsLoading(true);

    const getData = async () => {
      try {
        await loadData();
        showSnack('Info', 'Información cargada.');
      } catch {
        showSnack('Error', 'Error obteniendo la información.');
      }
    };

    getData();
  }, [loadData]);

  useEffect(() => {
    const getAutores = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/autores`, {
          headers: {
            authorization: Token
          }
        });

        setAutores(convertArrayToObject(res.data.sort(sortArray('Nombre')), '_id'));
      } catch (e) {
        console.error(e);
      }
    };

    getAutores();
  }, [Token]);

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {'Info' | 'Error' | 'Success'} type Tipo de snack a mostrar.
   * @param {string} txt Texto a mostrar en el snack.
   */
  const showSnack = (type, txt) => {
    switch (type) {
      case 'Info':
        setIsSnackInfo(true);
        setIsSnackError(false);
        break;
      case 'Error':
        setIsSnackInfo(false);
        setIsSnackError(true);
        break;
      default:
        setIsSnackInfo(false);
        setIsSnackError(false);
        break;
    }
    setSnackTxt(txt);
    setSnackOpen(true);
  };

  /**
   * Método para guardar nuevos registros.
   * @param {any} data Información a guardar.
   */
  const onRowAdd = async data => {
    try {
      await axios.post(`http://${address}:${port}/api/libros`, data, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', 'Libro ingresado.');
    } catch {
      showSnack('Error', 'Error ingresando el libro.');
    }
  };

  /**
   * Método para actualizar registros.
   * @param {any} data Información actualizada.
   */
  const onRowUpdate = async data => {
    try {
      await axios.put(`http://${address}:${port}/api/libros/${data._id}`, data, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
    } catch {
      showSnack('Error', 'Error actualizando el registro.');
    }
  };

  /**
   * Método para eliminar registros.
   * @param {Object} data Información del registro.
   * @param {string} data._id ID que identifica el registro a eliminar.
   */
  const onRowDelete = async ({ _id }) => {
    try {
      await axios.delete(`http://${address}:${port}/api/libros/${_id}`, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
    } catch {
      showSnack('Error', 'Error eliminando el registro.');
    }
  };

  return (
    <React.Fragment>
      <MaterialTable
        data={data}
        icons={tableIcons}
        isLoading={IsLoading}
        title='Biblioteca'
        localization={tableLocalization}
        style={{
          maxHeight: '100%',
          margin: '8px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
        options={{
          pageSize: 10,
          grouping: true,
          columnsButton: true,
          maxBodyHeight: '100%',
          addRowPosition: 'first',
          emptyRowsWhenPaging: false
        }}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete
        }}
        actions={[
          {
            icon: () => <Refresh />,
            tooltip: 'Recargar',
            isFreeAction: true,
            onClick: async () => {
              setIsLoading(true);
              await loadData();
            }
          }
        ]}
        columns={[
          { title: 'ID', field: '_id', editable: 'never', hidden: true, emptyValue: 'N/A' },
          {
            title: 'Autor',
            field: 'IDAutor._id',
            lookup: Autores,
            emptyValue: 'N/A'
          },
          {
            title: 'Título',
            field: 'Titulo',
            emptyValue: 'N/A',
            defaultSort: 'asc',
            editComponent: props => (
              <TextField
                placeholder='Título'
                value={props.value || ''}
                onChange={e => props.onChange(e.target.value)}
                inputProps={{ maxLength: 100, minLength: 1, style: { fontSize: 13 } }}
              />
            )
          },
          {
            title: 'Sinopsis',
            field: 'Sinopsis',
            emptyValue: 'N/A',
            editComponent: props => (
              <TextField
                placeholder='Sinopsis'
                value={props.value || ''}
                onChange={e => props.onChange(e.target.value)}
                inputProps={{ maxLength: 150, minLength: 1, style: { fontSize: 13 } }}
              />
            )
          },
          {
            title: 'Año',
            field: 'Año',
            emptyValue: 'N/A',
            editComponent: props => (
              <TextField
                type='number'
                placeholder='Año'
                value={props.value || ''}
                onChange={e => props.onChange(e.target.value)}
                inputProps={{
                  max: 2020,
                  min: 1000,
                  maxLength: 4,
                  minLength: 4,
                  pattern: /\d{4}/,
                  style: { fontSize: 13 }
                }}
              />
            )
          },
          {
            title: 'ISBN',
            field: 'ISBN',
            emptyValue: 'N/A',
            editComponent: props => (
              <TextField
                placeholder='ISBN'
                value={props.value || ''}
                onChange={e => props.onChange(e.target.value)}
                inputProps={{ maxLength: 13, minLength: 10, style: { fontSize: 13 } }}
              />
            )
          },
          {
            title: 'Editorial',
            field: 'Editorial',
            emptyValue: 'N/A',
            editComponent: props => (
              <TextField
                placeholder='Editorial'
                value={props.value || ''}
                onChange={e => props.onChange(e.target.value)}
                inputProps={{ maxLength: 100, minLength: 1, style: { fontSize: 13 } }}
              />
            )
          }
        ]}
      />
      <Snack
        show={SnackOpen}
        texto={SnackTxt}
        isInfo={IsSnackInfo}
        setShow={setSnackOpen}
        isError={IsSnackError}
      />
    </React.Fragment>
  );
}

export default Biblioteca;
