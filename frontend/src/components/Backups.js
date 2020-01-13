// @ts-check
import {
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { IconButton, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';
import {
  ArrowDownward,
  Backup,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Close,
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
import clsx from 'clsx';
import MaterialTable from 'material-table';
import moment from 'moment';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { address, port, tableLocalization } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  messageSnack: {
    display: 'flex',
    alignItems: 'center'
  },
  iconSnack: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  iconClose: {
    fontSize: 20
  },
  successSnack: {
    backgroundColor: '#008000'
  },
  errorSnack: {
    backgroundColor: theme.palette.error.dark
  },
  infoSnack: {
    backgroundColor: theme.palette.primary.main
  }
}));

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
  // @ts-ignore
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [isSnackError, setIsSnackError] = useState(false);
  const [isSnackInfo, setIsSnackInfo] = useState(false);
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
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      throw e;
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

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento del cierre en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
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
          maxHeight: '100.8%',
          margin: '8px',
          overflowY: 'auto',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
        options={{
          pageSize: 10,
          maxBodyHeight: 460,
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={SnackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <SnackbarContent
          className={clsx({
            [classes.errorSnack]: isSnackError,
            [classes.infoSnack]: isSnackInfo,
            [classes.successSnack]: !isSnackError && !isSnackInfo
          })}
          aria-describedby='snackbar'
          message={
            <span className={classes.messageSnack} id='snackbar'>
              <FAI
                icon={
                  isSnackError ? faTimesCircle : isSnackInfo ? faExclamationCircle : faCheckCircle
                }
                className={classes.iconSnack}
              />
              {SnackTxt}
            </span>
          }
          action={[
            <IconButton key='close' aria-label='close' color='inherit' onClick={handleSnackClose}>
              <Close className={classes.iconClose} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </React.Fragment>
  );
}

export default Backups;
