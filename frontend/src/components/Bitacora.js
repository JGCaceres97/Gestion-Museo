// @ts-check
import {
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { IconButton, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Close,
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
 * Método para mostrar la bitácora de eventos del sistema.
 */
function Bitacora() {
  // @ts-ignore
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [IsSnackInfo, setIsSnackInfo] = useState(false);
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    document.title = 'Bitácora de Eventos';
  });

  /**
   * Método para obtener la información a mostrar.
   */
  const loadData = useCallback(async () => {
    try {
      const res = await axios.get(`http://${address}:${port}/api/bitacora`, {
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
        showSnack('Info', 'Bitácora cargada.');
      } catch {
        showSnack('Error', 'Error obteniendo la bitácora.');
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

  return (
    <React.Fragment>
      <MaterialTable
        data={data}
        icons={tableIcons}
        isLoading={IsLoading}
        title='Bitácora de Eventos'
        localization={tableLocalization}
        style={{
          maxHeight: '100.8%',
          margin: '8px',
          overflowY: 'auto'
        }}
        options={{
          pageSize: 10,
          grouping: true,
          maxBodyHeight: 405,
          columnsButton: true,
          emptyRowsWhenPaging: false
        }}
        columns={[
          { title: 'IDUsuario', field: 'IDUsuario', hidden: true },
          { title: 'Usuario', field: 'Email' },
          { title: 'IP', field: 'IP' },
          { title: 'Acción', field: 'Accion' },
          {
            title: 'Marca de Tiempo',
            field: 'MarcaDeTiempo',
            defaultSort: 'desc',
            render: rowData =>
              rowData ? moment(rowData.MarcaDeTiempo).format('DD/MM/YYYY h:mm A') : ''
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
          }
        ]}
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
            [classes.errorSnack]: IsSnackError,
            [classes.infoSnack]: IsSnackInfo,
            [classes.successSnack]: !IsSnackError && !IsSnackInfo
          })}
          aria-describedby='snackbar'
          message={
            <span className={classes.messageSnack} id='snackbar'>
              <FAI
                icon={
                  IsSnackError ? faTimesCircle : IsSnackInfo ? faExclamationCircle : faCheckCircle
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

export default Bitacora;
