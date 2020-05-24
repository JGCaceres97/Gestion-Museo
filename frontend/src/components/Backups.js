// @ts-check
import {
  ArrowDownward,
  Backup,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  FilterList,
  FirstPage,
  LastPage,
  Refresh,
  Remove,
  RestoreRounded,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import axios from 'axios';
import MaterialTable from 'material-table';
import moment from 'moment';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { address, port, tableLocalization } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';
import Snack from '../utils/Snack';

const tableIcons = {
  Add: forwardRef((props, ref) => <Backup {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <RestoreRounded {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
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
 * Método para manejar las copias de seguridad y restauración.
 */
function Backups() {
  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [IsSnackInfo, setIsSnackInfo] = useState(false);
  const [Token] = useLocalStorage('Token', '');

  const { body, grouping, header, pagination, toolbar } = tableLocalization;
  const { emptyDataSourceMessage, addTooltip, editTooltip, filterRow, editRow } = body;
  const { cancelTooltip } = editRow;

  useEffect(() => {
    document.title = 'Backups y Restauración';
  });

  /**
   * Método para obtener la información a mostrar.
   */
  const loadData = useCallback(async () => {
    try {
      const res = await axios.get(`http://${address}:${port}/api/getBackups`, {
        headers: {
          authorization: Token
        }
      });

      setData(
        res.data.map(folder => {
          return {
            folder: folder.split('--').pop()
          };
        })
      );
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

  const onBackup = async () => {
    try {
      await axios.get(`http://${address}:${port}/api/backup`, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', 'Copia de seguridad realizada con éxito.');
    } catch {
      setIsLoading(false);
      showSnack('Error', 'Error realizando la copia de seguridad.');
    }
  };

  /**
   * Método para restaurar una copia de seguridad.
   * @param {Object} data Información del registro.
   * @param {string} data.folder Carpeta de la copia de seguridad a restaurar.
   */
  const onRestore = async ({ folder }) => {
    try {
      await axios.post(
        `http://${address}:${port}/api/restore`,
        { Restore: `Backup--${folder}` },
        {
          headers: {
            authorization: Token
          }
        }
      );

      await loadData();
      showSnack('Success', 'Restauración realizada con éxito.');
    } catch {
      setIsLoading(false);
      showSnack('Error', 'Error restaurando la copia de seguridad.');
    }
  };

  return (
    <React.Fragment>
      <MaterialTable
        data={data}
        icons={tableIcons}
        isLoading={IsLoading}
        title='Copias de Seguridad y Restauración'
        style={{
          maxHeight: '100%',
          margin: '8px',
          overflowY: 'auto',
          paddingLeft: '10px',
          display: 'flex',
          flexDirection: 'column'
        }}
        options={{
          pageSize: 10,
          maxBodyHeight: '100%',
          pageSizeOptions: [5, 10],
          emptyRowsWhenPaging: false
        }}
        editable={{
          onRowDelete: onRestore
        }}
        columns={[
          {
            title: 'Fecha y hora',
            field: 'folder',
            defaultSort: 'desc',
            render: rowData => (rowData ? moment(rowData.folder).format('DD/MM/YYYY h:mm A') : '')
          }
        ]}
        actions={[
          {
            icon: () => <Refresh />,
            tooltip: 'Recargar',
            isFreeAction: true,
            onClick: async () => {
              setIsLoading(true);
              await loadData();
            }
          },
          {
            icon: () => <Backup />,
            tooltip: 'Realizar copia de seguridad',
            isFreeAction: true,
            onClick: async () => {
              setIsLoading(true);
              await onBackup();
            }
          }
        ]}
        localization={{
          body: {
            emptyDataSourceMessage,
            addTooltip,
            deleteTooltip: 'Restaurar',
            editTooltip,
            filterRow,
            editRow: {
              deleteText: '¿Desea restaurar esta copia de seguridad?',
              cancelTooltip,
              saveTooltip: 'Restaurar'
            }
          },
          grouping: grouping,
          header: header,
          pagination: pagination,
          toolbar: toolbar
        }}
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

export default Backups;
