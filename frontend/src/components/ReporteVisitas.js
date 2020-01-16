// @ts-check
import MomentUtils from '@date-io/moment';
import {
  faCheckCircle,
  faExclamationCircle,
  faFileExcel,
  faFilePdf,
  faSearch,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  SnackbarContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import clsx from 'clsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import XLSX from 'xlsx';
import { address, port } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1)
  },
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
  },
  alignCenter: {
    textAlign: 'center'
  },
  table: {
    overflow: 'auto'
  },
  tableCell: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  pdfBtn: {
    backgroundColor: 'crimson',
    color: 'white',
    '&:hover': {
      backgroundColor: 'firebrick'
    }
  },
  excelBtn: {
    backgroundColor: 'seagreen',
    color: 'white',
    '&:hover': {
      backgroundColor: 'forestgreen'
    }
  }
}));

/**
 * Método para mostrar el reporte de visitas a Centros Culturales.
 */
function ReporteVisitas() {
  // @ts-ignore
  const classes = useStyles();

  const [Consulta, setConsulta] = useState([
    {
      ID: '',
      FechaSolicitud: '',
      Nombre: '',
      Institución: '',
      Telefono: '',
      Email: '',
      CantPersonas: 0,
      FechaVisita: '',
      Estado: ''
    }
  ]);
  const [FechaInicial, setFechaInicial] = useState(
    moment()
      .subtract(1, 'month')
      .toDate()
  );
  const [FechaFinal, setFechaFinal] = useState(moment().toDate());
  const [IDEstado, setIDEstado] = useState('Todas');

  const [BtnTxt, setBtnTxt] = useState('Consultar');
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [IsSnackError, setIsSnackError] = useState(false);
  const [IsSnackInfo, setIsSnackInfo] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [Consultado, setConsultado] = useState(false);
  const [Page, setPage] = useState(0);
  const [RowsPerPage, setRowsPerPage] = useState(10);
  const [Estados, setEstados] = useState([{ key: '', text: '' }]);
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    document.title = 'Reporte de Visitas';
  });

  useEffect(() => {
    const getEstados = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/estados`, {
          headers: {
            Authorization: Token
          }
        });

        setEstados(
          res.data.map(estado => {
            return {
              key: estado._id,
              text: estado.Nombre
            };
          })
        );
      } catch {
        showSnack('Error', 'Error obteniendo los estados de solicitudes.');
      }
    };

    getEstados();
  }, [Token]);

  /**
   * Método que deshabilita los fines de semana en el calendario.
   * @param {moment.Moment} day Día a validar.
   */
  const disableWeekends = day => {
    if (day.day() === 6 || day.day() === 0) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Método que maneja las acciones al cerrar un snackbar.
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento del cierre en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  const handleChangeRowsPerPage = ev => {
    setRowsPerPage(+ev.target.value);
    setPage(0);
  };

  /**
   * Método para cambiar la apariencia del botón de consulta.
   * @param {string} txt Texto a mostrar en el botón.
   * @param {boolean} disable ¿Botón deshabilitado?
   */
  const toggleBtn = (txt, disable) => {
    setBtnTxt(txt);
    setBtnDisabled(disable);
  };

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

  const exportExcel = () => {
    if (Consulta.length > 0) {
      const ext = '.xlsx';
      const name = `Reporte ${moment().format('DD-MM-YYYY')}${ext}`;
      const type =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const info = Consulta.map(item => {
        return {
          'Fecha Solicitud': item.FechaSolicitud,
          Nombre: item.Nombre,
          Institución: item.Institución,
          Teléfono: item.Telefono,
          'Correo electrónico': item.Email,
          'Cant. de Personas': item.CantPersonas,
          'Fecha Visita': item.FechaVisita,
          Estado: item.Estado
        };
      });

      const sheet = XLSX.utils.json_to_sheet(info);
      const book = { Sheets: { Reporte: sheet }, SheetNames: ['Reporte'] };
      const excelBuffer = XLSX.write(book, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: type });

      saveAs(data, name);
    } else {
      showSnack('Info', 'No hay registros que exportar.');
    }
  };

  const exportPDF = () => {
    if (Consulta.length > 0) {
      const ext = '.pdf';
      const name = `Reporte ${moment().format('DD-MM-YYYY')}${ext}`;
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        size: 'letter'
      });
      doc.setFontSize(20);

      /*const logo = new Image();
      logo.src = '/img/bch.jpg';
      logo.onload = () => {
        doc.addImage(logo, 'JPEG', 40, 20, 83, 80);
      };

      const logoCC = new Image();
      logoCC.src = '/img/logo.png';
      logoCC.onload = () => {
        doc.addImage(logoCC, 'PNG', 685, 15, 115, 90);
      };*/

      const title = `Reporte de Visitas - ${moment().format('DD/MM/YYYY')}`;
      const header = [
        { title: 'Fecha Solicitud', dataKey: 'FechaSolicitud' },
        { title: 'Nombre', dataKey: 'Nombre' },
        { title: 'Institución', dataKey: 'Institucion' },
        { title: 'Teléfono', dataKey: 'Telefono' },
        { title: 'Correo electrónico', dataKey: 'Email' },
        { title: 'Cant. de Personas', dataKey: 'CantPersonas' },
        { title: 'Fecha Visita', dataKey: 'FechaVisita' },
        { title: 'Estado', dataKey: 'Estado' }
      ];

      doc.text(title, doc.internal.pageSize.getWidth() / 2, 70, 'center');
      // @ts-ignore
      doc.autoTable(header, Consulta, {
        margin: { top: 50 },
        theme: 'striped',
        startY: 115,
        showHead: 'everyPage',
        styles: {
          halign: 'center',
          valign: 'middle',
          overflow: 'linebreak'
        },
        columnStyles: {
          'Fecha Solicitud': { cellWidth: 70 },
          Nombre: { cellWidth: 100 },
          Institución: { cellWidth: 150 },
          Teléfono: { cellWidth: 70 },
          'Correo electrónico': { cellWidth: 150 },
          'Cant. de Personas': { cellWidth: 70 },
          'Fecha Visita': { cellWidth: 70 },
          Estado: { cellWidth: 80 }
        }
      });

      doc.save(name);
    } else {
      showSnack('Info', 'No hay registros que exportar.');
    }
  };

  const handleConsulta = async () => {
    try {
      toggleBtn('Consultando...', true);

      const res = await axios.get(`http://${address}:${port}/api/solicitudes`, {
        headers: {
          Authorization: Token
        }
      });

      setConsulta(
        res.data
          .filter(item => {
            const estado = item.IDEstado._id;
            const visita = moment(item.FechaVisita);
            const inicial = moment(FechaInicial);
            const final = moment(FechaFinal);

            return visita.isSameOrAfter(inicial) &&
              visita.isSameOrBefore(final) &&
              IDEstado === 'Todas'
              ? true
              : IDEstado.localeCompare(estado) === 0;
          })
          .sort(sortArray('FechaVisita'))
          .map(item => {
            return {
              ID: item._id,
              FechaSolicitud: moment(item.FechaSolicitud).format('DD/MM/YYYY'),
              Nombre: item.Nombres + ' ' + item.Apellidos,
              Institucion: item.Institucion,
              Telefono: item.Telefono,
              Email: item.Email,
              CantPersonas: item.CantPersonas,
              FechaVisita: moment(item.FechaVisita).format('DD/MM/YYYY'),
              Estado: item.IDEstado.Nombre
            };
          })
      );

      setConsultado(true);
    } catch {
      showSnack('Error', 'Error realizando la consulta.');
    } finally {
      toggleBtn('Consultar', false);
    }
  };

  const columnas = [
    { id: 'FechaSolicitud', label: 'Fecha Solicitud', maxWidth: 110 },
    { id: 'Nombre', label: 'Nombre', maxWidth: 170 },
    { id: 'Institucion', label: 'Institución', maxWidth: 250 },
    { id: 'Telefono', label: 'Teléfono', maxWidth: 110 },
    { id: 'Email', label: 'Correo electrónico', maxWidth: 170 },
    { id: 'CantPersonas', label: '# Personas', maxWidth: 90 },
    { id: 'FechaVisita', label: 'Fecha Visita', maxWidth: 90 },
    { id: 'Estado', label: 'Estado', maxWidth: 110 }
  ];

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align='center' variant='h4'>
                Reporte de Visitas
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  autoOk
                  fullWidth
                  disableToolbar
                  variant='inline'
                  format='D/MM/YYYY'
                  maxDate={moment()}
                  value={FechaInicial}
                  label='Fecha de inicio'
                  shouldDisableDate={disableWeekends}
                  onChange={date => setFechaInicial(date.toDate())}
                  maxDateMessage='La fecha inicial no puede ser mayor que el día actual.'
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  autoOk
                  fullWidth
                  disableToolbar
                  variant='inline'
                  format='D/MM/YYYY'
                  maxDate={moment().add(1, 'month')}
                  value={FechaFinal}
                  label='Fecha de cierre'
                  shouldDisableDate={disableWeekends}
                  onChange={date => setFechaFinal(date.toDate())}
                  maxDateMessage='La fecha final no puede ser mayor que el día actual.'
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id='Estado'>Estado</InputLabel>
                <Select
                  value={IDEstado}
                  labelId='Estado'
                  onChange={e => setIDEstado(e.target.value.toString())}
                >
                  <MenuItem value='Todas'>Todas</MenuItem>
                  {Estados.map((item, i) => (
                    <MenuItem key={i + 1} value={item.key}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Box py={1}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  disabled={BtnDisabled}
                  onClick={handleConsulta}
                  endIcon={<FAI icon={faSearch} />}
                >
                  {BtnTxt}
                </Button>
              </Box>
            </Grid>
          </Grid>
          {Consultado && (
            <Grid container spacing={2}>
              <Grid item md={3} xs={6}>
                <Box pt={4} pb={1}>
                  <Button
                    color='inherit'
                    variant='contained'
                    className={classes.pdfBtn}
                    onClick={() => exportPDF()}
                    startIcon={<FAI icon={faFilePdf} />}
                  >
                    Exportar PDF
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3} xs={6}>
                <Box pt={4} pb={1}>
                  <Button
                    color='inherit'
                    variant='contained'
                    className={classes.excelBtn}
                    onClick={() => exportExcel()}
                    startIcon={<FAI icon={faFileExcel} />}
                  >
                    Exportar Excel
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columnas.map(columna => (
                        <TableCell
                          align='center'
                          key={columna.id}
                          className={classes.tableCell}
                          style={{ maxWidth: columna.maxWidth }}
                        >
                          {columna.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Consulta.slice(Page * RowsPerPage, Page * RowsPerPage + RowsPerPage).map(
                      registro => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={registro.ID}>
                            {columnas.map(columna => {
                              const value = registro[columna.id];
                              return (
                                <TableCell
                                  align='center'
                                  key={columna.id}
                                  className={classes.tableCell}
                                >
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  page={Page}
                  component='div'
                  count={Consulta.length}
                  rowsPerPage={RowsPerPage}
                  rowsPerPageOptions={[10, 20, 50]}
                  labelRowsPerPage='Filas por página:'
                  onChangePage={(_, page) => setPage(page)}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from} - ${to === 1 ? count : to} de ${count}`
                  }
                />
              </Grid>
            </Grid>
          )}
        </Container>
      </Paper>
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

export default ReporteVisitas;
