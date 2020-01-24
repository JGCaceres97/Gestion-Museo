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
 * Método para mostrar el mantenimiento de un componente.
 * @param {Object} props Props que recibe de otro componente.
 * @param {boolean} [props.Grouping] Agrupación por columnas.
 * @param {number} [props.MaxBodyHeight] Altura máxima del cuerpo de la tabla.
 * @param {string} props.Added Mensaje de notificación cuando se agregar un registro.
 * @param {string} props.ApiUrl Dirección correspondiente en la API.
 * @param {string} props.Component Nombre del componente.
 * @param {string} props.DataLoaded Mensaje de notificación cuando se carga la información.
 * @param {string} props.DataNotLoaded Mensaje de notificación cuando no se carga la información.
 * @param {string} props.Deleted Mensaje de notificación cuando se eliminar un registro.
 * @param {string} props.NotAdded Mensaje de notificación cuando ocurre un error al agregar un registro.
 * @param {string} props.NotDeleted Mensaje de notificación cuando ocurre un error al eliminar un registro.
 * @param {string} props.NotUpdated Mensaje de notificación cuando ocurre un error al actualizar un registro.
 * @param {string} props.Updated Mensaje de notificación cuando se actualiza un registro.
 * @param {string} props.Titulo Título de la tabla.
 * @param {import('material-table').Column[]} props.Columnas Columnas de la tabla.
 */
function LayoutMantenimiento({
  Grouping = false,
  Added,
  NotAdded,
  ApiUrl,
  Component,
  DataLoaded,
  DataNotLoaded,
  Updated,
  NotUpdated,
  Deleted,
  NotDeleted,
  Titulo,
  Columnas,
  MaxBodyHeight = 460
}) {
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
    document.title = `Mantenimiento de ${Component}`;
  });

  /**
   * Método para obtener la información a mostrar.
   */
  const loadData = useCallback(async () => {
    try {
      const res = await axios.get(`http://${address}:${port}/${ApiUrl}`, {
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
  }, [ApiUrl, Token]);

  useEffect(() => {
    setSnackOpen(false);
    setIsLoading(true);
    const getData = async () => {
      try {
        await loadData();
        showSnack('Info', DataLoaded);
      } catch {
        showSnack('Error', DataNotLoaded);
      }
    };

    getData();
  }, [DataLoaded, DataNotLoaded, loadData]);

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

  /**
   * Método para guardar nuevos registros.
   * @param {any} data Información a guardar.
   */
  const onRowAdd = async data => {
    try {
      await axios.post(`http://${address}:${port}/${ApiUrl}`, data, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', Added);
    } catch {
      showSnack('Error', NotAdded);
    }
  };

  /**
   * Método para actualizar registros.
   * @param {any} data Información actualizada.
   */
  const onRowUpdate = async data => {
    try {
      await axios.put(`http://${address}:${port}/${ApiUrl}/${data._id}`, data, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', Updated);
    } catch {
      showSnack('Error', NotUpdated);
    }
  };

  /**
   * Método para eliminar registros.
   * @param {Object} data Información del registro.
   * @param {string} data._id ID que identifica el registro a eliminar.
   */
  const onRowDelete = async ({ _id }) => {
    try {
      await axios.delete(`http://${address}:${port}/${ApiUrl}/${_id}`, {
        headers: {
          authorization: Token
        }
      });

      await loadData();
      showSnack('Success', Deleted);
    } catch {
      showSnack('Error', NotDeleted);
    }
  };

  return (
    <React.Fragment>
      <MaterialTable
        data={data}
        title={Titulo}
        columns={Columnas}
        icons={tableIcons}
        isLoading={IsLoading}
        localization={tableLocalization}
        style={{
          maxHeight: '100.8%',
          margin: '8px',
          overflowY: 'auto'
        }}
        options={{
          pageSize: 10,
          maxBodyHeight: MaxBodyHeight,
          grouping: Grouping,
          columnsButton: true,
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

export default LayoutMantenimiento;
