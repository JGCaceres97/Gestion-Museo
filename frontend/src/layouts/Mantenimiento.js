// @ts-check
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
 * Método para mostrar el mantenimiento de un componente.
 * @param {Object} props Props que recibe de otro componente.
 * @param {boolean} [props.grouping] Agrupación por columnas.
 * @param {string} props.added Mensaje de notificación cuando se agregar un registro.
 * @param {string} props.apiUrl Dirección correspondiente en la API.
 * @param {string} props.component Nombre del componente.
 * @param {string} props.dataLoaded Mensaje de notificación cuando se carga la información.
 * @param {string} props.dataNotLoaded Mensaje de notificación cuando no se carga la información.
 * @param {string} props.deleted Mensaje de notificación cuando se eliminar un registro.
 * @param {string} props.notAdded Mensaje de notificación cuando ocurre un error al agregar un registro.
 * @param {string} props.notDeleted Mensaje de notificación cuando ocurre un error al eliminar un registro.
 * @param {string} props.notUpdated Mensaje de notificación cuando ocurre un error al actualizar un registro.
 * @param {string} props.updated Mensaje de notificación cuando se actualiza un registro.
 * @param {string} props.titulo Título de la tabla.
 * @param {import('material-table').Column[]} props.columnas Columnas de la tabla.
 * @param {(rowData: any) => boolean} [props.isEditable] Determina si se puede editar una fila dependiendo una condición.
 * @param {(rowData: any) => boolean} [props.isDeletable] Determina si se puede eliminar una fila dependiendo una condición.
 */
function LayoutMantenimiento({
  grouping = false,
  added,
  notAdded,
  apiUrl,
  component,
  dataLoaded,
  dataNotLoaded,
  updated,
  notUpdated,
  deleted,
  notDeleted,
  titulo,
  columnas,
  isEditable = rowData => true,
  isDeletable = rowData => true
}) {
  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [IsSnackInfo, setIsSnackInfo] = useState(false);
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    document.title = `Mantenimiento de ${component}`;
  });

  /**
   * Método para obtener la información a mostrar.
   */
  const loadData = useCallback(async () => {
    try {
      const res = await axios.get(`http://${address}:${port}/${apiUrl}`, {
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
  }, [apiUrl, Token]);

  useEffect(() => {
    setSnackOpen(false);
    setIsLoading(true);
    const getData = async () => {
      try {
        await loadData();
        showSnack('Info', dataLoaded);
      } catch {
        showSnack('Error', dataNotLoaded);
      }
    };

    getData();
  }, [dataLoaded, dataNotLoaded, loadData]);

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
      await axios.post(`http://${address}:${port}/${apiUrl}`, data, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', added);
    } catch {
      showSnack('Error', notAdded);
    }
  };

  /**
   * Método para actualizar registros.
   * @param {any} data Información actualizada.
   */
  const onRowUpdate = async data => {
    try {
      await axios.put(`http://${address}:${port}/${apiUrl}/${data._id}`, data, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', updated);
    } catch {
      showSnack('Error', notUpdated);
    }
  };

  /**
   * Método para eliminar registros.
   * @param {Object} data Información del registro.
   * @param {string} data._id ID que identifica el registro a eliminar.
   */
  const onRowDelete = async ({ _id }) => {
    try {
      await axios.delete(`http://${address}:${port}/${apiUrl}/${_id}`, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', deleted);
    } catch {
      showSnack('Error', notDeleted);
    }
  };

  return (
    <React.Fragment>
      <MaterialTable
        data={data}
        title={titulo}
        columns={columnas}
        icons={tableIcons}
        isLoading={IsLoading}
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
          grouping,
          columnsButton: true,
          maxBodyHeight: '100%',
          addRowPosition: 'first',
          emptyRowsWhenPaging: false
        }}
        editable={{
          isEditable,
          isDeletable,
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

export default LayoutMantenimiento;
