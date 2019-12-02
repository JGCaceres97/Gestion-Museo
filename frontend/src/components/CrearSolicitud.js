// @ts-check
import MomentUtils from '@date-io/moment';
import { faCheck, faCheckCircle, faEnvelope, faFileUpload, faIdCard, faMapMarkerAlt, faPaperPlane, faPhoneAlt, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, InputLabel, makeStyles, MenuItem, Paper, Radio, RadioGroup, Select, Slider, Snackbar, SnackbarContent, TextField, Typography, Zoom } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import config from '../config';

moment.locale('es-us');
moment.updateLocale('es-us', {
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
  week: {
    dow: 1,
    doy: 4
  }
});

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
  }
}));

/**
 * Formulario de Reservaciones de Visita a los Centros Culturales.
 * @param {any} props Propiedades que puede recibir de otro componente.
 */
function CrearSolicitud(props) {
  // @ts-ignore
  const classes = useStyles();

  /**
   * Método para asignar el día inicial en el calendario.
   */
  const initialDate = () => {
    switch (moment().day()) {
      case 5:
        return moment().add(3, 'days').toDate();
      case 6:
        return moment().add(2, 'days').toDate();
      default:
        return moment().add(1, 'day').toDate();
    }
  }

  const [Identidad, setIdentidad] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Email, setEmail] = useState('');
  const [Institucion, setInstitucion] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [CantPersonas, setCantPersonas] = useState(1 || []);
  const [FechaVisita, setFechaVisita] = useState(props.Fecha || initialDate);
  const [IDHorario, setIDHorario] = useState('');
  const [Charla, setCharla] = useState(false);
  const [Tema, setTema] = useState('');
  const [TemaEsp, setTemaEsp] = useState('');

  const [ErrorID, setErrorID] = useState(false);
  const [TxtID, setTxtID] = useState('');
  const [ErrorTel, setErrorTel] = useState(false);
  const [TxtTel, setTxtTel] = useState('');
  const [ErrorNombres, setErrorNombres] = useState(false);
  const [TxtNombres, setTxtNombres] = useState('');
  const [ErrorApellidos, setErrorApellidos] = useState(false);
  const [TxtApellidos, setTxtApellidos] = useState('');
  const [ErrorEmail, setErrorEmail] = useState(false);
  const [TxtEmail, setTxtEmail] = useState('');
  const [ErrorInstitucion, setErrorInstitucion] = useState(false);
  const [TxtInstitucion, setTxtInstitucion] = useState('');
  const [ErrorDireccion, setErrorDireccion] = useState(false);
  const [TxtDireccion, setTxtDireccion] = useState('');
  const [ErrorHorario, setErrorHorario] = useState(false);
  const [TxtHorario, setTxtHorario] = useState('');
  const [ErrorTema, setErrorTema] = useState(false);
  const [TxtTema, setTxtTema] = useState('');
  const [ErrorTemaEsp, setErrorTemaEsp] = useState(false);
  const [TxtTemaEsp, setTxtTemaEsp] = useState('');

  const [CheckID, setCheckID] = useState(false);
  const [CheckTel, setCheckTel] = useState(false);
  const [CheckNombres, setCheckNombres] = useState(false);
  const [CheckApellidos, setCheckApellidos] = useState(false);
  const [CheckEmail, setCheckEmail] = useState(false);
  const [CheckInstitucion, setCheckInstitucion] = useState(false);
  const [CheckDireccion, setCheckDireccion] = useState(false);
  const [ReqTema, setReqTema] = useState(Charla ? true : false);
  const [ReqTemaEsp, setReqTemaEsp] = useState(false);
  const [FileListadoTxt, setFileListadoTxt] = useState('Elegir Archivo');
  const [FileNotaTxt, setFileNotaTxt] = useState('Elegir Archivo');
  const [ColorSld, setColorSld] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [isSnackError, setIsSnackError] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [BtnTxt, setBtnTxt] = useState('Enviar Solicitud');
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [Horarios, setHorarios] = useState([]);
  const [FileListado, setFileListado] = useState(null);
  const [FileNota, setFileNota] = useState(null);

  const ColorError = '#DC143C';
  const ColorSuccess = '#008000';
  const MaxFileSize = 5 //Máximo tamaño de archivos en MB.

  useEffect(() => {
    document.title = 'Reserva de Visita a Centros Culturales';
    const reqHorarios = async () => {
      try {
        const res = await axios.get(`http://${config.address}:${config.port}/api/horarios`);
        setHorarios(res.data);
      } catch {
        showSnack('Error', 'Error obteniendo los horarios.');
      }
    }

    reqHorarios();
  }, []);

  /**
   * Método que maneja las acciones cuando se pierde el foco en un componente.
   * @param {string} value Valor contenido en el campo.
   * @param {string} field Campo al que hace referencia.
   */
  const handleBlur = (value, field) => {
    const txt = 'Por favor complete el campo requerido.';

    switch (field) {
      case 'ID':
        setCheckID(true);
        const RegExpID = /^\d{4}-\d{4}-\d{5}$/;
        if (value.search(RegExpID) !== 0 || value === '') {
          setErrorID(true);
          setTxtID('Por favor complete el campo requerido con el formato "0123-4567-89012".');
        } else {
          setErrorID(false);
          setTxtID('');
        }
        break;
      case 'Tel':
        setCheckTel(true);
        const RegExpTel = /^\d{4}-\d{4}$/;
        if (value.search(RegExpTel) !== 0 || value === '') {
          setErrorTel(true);
          setTxtTel('Por favor complete el campo requerido con el formato "9999-9999".');
        } else {
          setErrorTel(false);
          setTxtTel('');
        }
        break;
      case 'Nombres':
        setCheckNombres(true);
        if (value === '') {
          setErrorNombres(true);
          setTxtNombres(txt);
        } else {
          setErrorNombres(false);
          setTxtNombres('');
        }
        break;
      case 'Apellidos':
        setCheckApellidos(true);
        if (value === '') {
          setErrorApellidos(true);
          setTxtApellidos(txt);
        } else {
          setErrorApellidos(false);
          setTxtApellidos('');
        }
        break;
      case 'Email':
        setCheckEmail(true);
        const RegExpEmail = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/;
        if (value.search(RegExpEmail) !== 0 || value === '') {
          setErrorEmail(true);
          setTxtEmail('Por favor complete el campo requerido con el formato "ejem.plo@ejemplo.com".');
        } else {
          setErrorEmail(false);
          setTxtEmail('');
        }
        break;
      case 'Institucion':
        setCheckInstitucion(true);
        if (value === '') {
          setErrorInstitucion(true);
          setTxtInstitucion(txt);
        } else {
          setErrorInstitucion(false);
          setTxtInstitucion('');
        }
        break;
      case 'Direccion':
        setCheckDireccion(true);
        if (value === '') {
          setErrorDireccion(true);
          setTxtDireccion(txt);
        } else {
          setErrorDireccion(false);
          setTxtDireccion('');
        }
        break;
      case 'Horario':
        if (value === '') {
          setErrorHorario(true);
          setTxtHorario(txt);
        }
        break;
      case 'Tema':
        if (value === '') {
          setErrorTema(true);
          setTxtTema(txt);
        } else {
          setErrorTema(false);
          setTxtTema('');
        }
        break;
      case 'TemaEsp':
        if (value === '') {
          setErrorTemaEsp(true);
          setTxtTemaEsp(txt);
        } else {
          setErrorTemaEsp(false);
          setTxtTemaEsp('');
        }
        break;
      default:
        break;
    }
  }

  /**
   * Método que maneja las acciones cuando se realiza un cambio en un componente.
   * @param {string} value Valor contenido en el campo.
   * @param {string} field Campo al que se hace referencia.
   */
  const handleSelect = (value, field) => {
    switch (field) {
      case 'Horario':
        setIDHorario(value);
        setTxtHorario('');
        setErrorHorario(false);
        handleFechaYHora(value);
        break;
      case 'Tema':
        setTema(value);
        setTxtTema('');
        setErrorTema(false);
        break;
      default:
        break;
    }
  }

  /**
   * Método para manejar los cambios respecto a la charla académica.
   * @param {string} value Valor que contiene el campo.
   */
  const handleCharla = value => {
    if (value === 'true') {
      setCharla(true);
      setReqTema(true);
      if (Tema === 'Otro') {
        setReqTemaEsp(true);
        if (TemaEsp === '') {
          setErrorTemaEsp(true);
          setTxtTemaEsp('Por favor complete el campo requerido.');
        }
      }
    } else {
      setCharla(false);
      setReqTema(false);
      setReqTemaEsp(false);
      setTxtTema('');
      setTxtTemaEsp('');
      setErrorTema(false);
      setErrorTemaEsp(false);
    }
  }

  /**
   * Método para manejar los cambios respecto al tema de la charla académica.
   * @param {string} value Valor que contiene el campo.
   */
  const handleTema = value => {
    handleSelect(value, 'Tema');
    if (value === 'Otro') {
      setReqTemaEsp(true);
    } else {
      setTxtTemaEsp('');
      setReqTemaEsp(false);
      setErrorTemaEsp(false);
    }
  }

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
  }

  /**
   * Método para asignar la hora de visita a la fecha elegida.
   * @param {string} _id ID que identifica la hora seleccionada.
   */
  const handleFechaYHora = (_id) => {
    const hora = Horarios.find(item => item._id === _id).Hora;
    const fecha = FechaVisita.toISOString();
    let horaISO;

    if (hora.split(' ').pop() === 'PM') {
      horaISO = parseInt(hora.split(':').shift(), 10) + 12;
    } else {
      if (hora.split(':').shift().length === 1) {
        horaISO = '0'.concat(hora.split(':').shift());
      } else {
        horaISO = hora.split(':').shift();
      }
    }

    const fechaConHora = moment(`${fecha.split('T').shift()}T${horaISO}`).toDate();
    setFechaVisita(fechaConHora);
  }

  /**
   * Método para manejar los archivos adjuntos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement>} event ID del input que fue afectado por el cambio.
   */
  const handleFiles = event => {
    const files = event.target.files;
    let isListado;
    event.target.id === 'listado' ? isListado = true : isListado = false;

    if (files.length === 1) {
      const size = files[0].size;
      const ext = files[0].name.split('.').pop();
      const split = files[0].name.split('.').shift();
      const name = split.length > 30 ?
        split.substring(0, 30).concat(`...${ext}`)
        : split.concat(`.${ext}`);

      if (['pdf', 'doc', 'docx'].indexOf(ext) === -1) {
        if (isListado) {
          setFileListadoTxt('Elegir Archivo');
          setFileListado(null);
        } else {
          setFileNotaTxt('Elegir Archivo');
          setFileNota(null);
        }
        event.target.value = '';
        showSnack('Error', 'El archivo debe ser PDF o Word.');
      } else {
        if (size <= (MaxFileSize * 1048576)) {
          if (isListado) {
            setFileListadoTxt(name);
            setFileListado(files[0]);
          } else {
            setFileNotaTxt(name);
            setFileNota(files[0]);
          }
        } else {
          if (isListado) {
            setFileListadoTxt('Elegir Archivo');
            setFileListado(null);
          } else {
            setFileNotaTxt('Elegir Archivo');
            setFileNota(null);
          }
          event.target.value = '';
          showSnack('Error', `El peso máximo del archivo es ${MaxFileSize} MB.`)
        }
      }
    }
  }

  /**
   * Método que maneja las acciones al cerrar un snackbar.
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento del cierre en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  }

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {'Error' | 'Success'} type Tipo de snack a mostrar.
   * @param {string} txt Texto a mostrar en el snack.
   */
  const showSnack = (type, txt) => {
    switch (type) {
      case 'Error':
        setIsSnackError(true);
        break;
      default:
        setIsSnackError(false);
        break;
    }
    setSnackTxt(txt);
    setSnackOpen(true);
  }

  /**
   * Método para cambiar la apariencia del botón de enviar solicitud.
   * @param {boolean} disable ¿Botón deshabilitado?
   * @param {string} txt Texto a mostrar en el botón.
   */
  const toggleBtn = (disable, txt) => {
    setBtnDisabled(disable);
    setBtnTxt(txt);
  }

  /**
   * Método para verificar que todos los campos requeridos se encuentren llenados correctamente.
   */
  const validateForm = () => {
    let validID = false;
    let validTel = false;
    let validNombres = false;
    let validApellidos = false;
    let validEmail = false;
    let validInstitucion = false;
    let validDireccion = false;
    let validHorario = false;
    let validTema = false;

    validID = ErrorID || Identidad === '' ? false : true;
    validTel = ErrorTel || Telefono === '' ? false : true;
    validNombres = ErrorNombres || Nombres === '' ? false : true;
    validApellidos = ErrorApellidos || Apellidos === '' ? false : true;
    validEmail = ErrorEmail || Email === '' ? false : true;
    validInstitucion = ErrorInstitucion || Institucion === '' ? false : true;
    validDireccion = ErrorDireccion || Direccion === '' ? false : true;
    validHorario = ErrorHorario || IDHorario === '' ? false : true;
    validTema = ReqTema ? ErrorTema || Tema === '' ? false : true : true;

    if (validID && validTel && validNombres && validApellidos && validEmail && validInstitucion && validDireccion && validHorario && validTema) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Método para manejar el envío de las solicitudes.
   */
  const handleSubmit = () => {
    setSnackOpen(false);
    enviarSolicitud();
  }

  const enviarSolicitud = async () => {
    toggleBtn(true, 'Enviando...');
    if (validateForm()) {
      try {
        const estado = await axios.get(`http://${config.address}:${config.port}/api/estados/En proceso`);
        const Solicitud = new FormData();
        Solicitud.append('Identidad', Identidad);
        Solicitud.append('Nombres', Nombres);
        Solicitud.append('Apellidos', Apellidos);
        Solicitud.append('Telefono', Telefono);
        Solicitud.append('Email', Email);
        Solicitud.append('Institucion', Institucion);
        Solicitud.append('Direccion', Direccion);
        Solicitud.append('CantPersonas', JSON.stringify(CantPersonas));
        Solicitud.append('FechaVisita', FechaVisita);
        Solicitud.append('IDHorario', IDHorario);
        Solicitud.append('Charla', JSON.stringify(Charla));
        Solicitud.append('TemaCharla', Charla ? Tema === 'Otro' ? TemaEsp : Tema : '');
        Solicitud.append('IDEstado', estado.data._id);
        Solicitud.append('Adjuntos', FileListado);
        Solicitud.append('Adjuntos', FileNota);

        await axios.post(`http://${config.address}:${config.port}/api/solicitudes`, Solicitud);

        showSnack('Success', 'Solicitud enviada.');
        // Resetear el formulario al estado inicial.
      } catch (e) {
        showSnack('Error', 'Error al enviar la solicitud.');
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      showSnack('Error', 'Hay campos requeridos sin completar.');
    }
    toggleBtn(false, 'Enviar Solicitud');
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align='center' variant='h4'>
                Reserva de Visita a Centros Culturales
              </Typography>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align='left' variant='h6' className='mt-4'>
                Información de Contacto
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                autoFocus
                fullWidth
                error={ErrorID}
                value={Identidad}
                helperText={TxtID}
                label='Número de identidad'
                placeholder='0801-1980-01234'
                inputProps={{ maxLength: 15 }}
                onBlur={e => handleBlur(e.target.value, 'ID')}
                onChange={e => setIdentidad(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FAI icon={faIdCard} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Zoom in={CheckID}>
                      <InputAdornment position='end'
                        style={{ color: !ErrorID ? ColorSuccess : ColorError }}>
                        <FAI icon={!ErrorID ? faCheck : faTimes} />
                      </InputAdornment>
                    </Zoom>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                type='tel'
                label='Teléfono'
                error={ErrorTel}
                value={Telefono}
                helperText={TxtTel}
                placeholder='9999-9999'
                inputProps={{ maxLength: 9 }}
                onBlur={e => handleBlur(e.target.value, 'Tel')}
                onChange={e => setTelefono(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FAI icon={faPhoneAlt} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Zoom in={CheckTel}>
                      <InputAdornment position='end'
                        style={{ color: !ErrorTel ? ColorSuccess : ColorError }}>
                        <FAI icon={!ErrorTel ? faCheck : faTimes} />
                      </InputAdornment>
                    </Zoom>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                value={Nombres}
                label='Nombres'
                error={ErrorNombres}
                helperText={TxtNombres}
                inputProps={{ maxLength: 50 }}
                placeholder='Augusto Constantino'
                onChange={e => setNombres(e.target.value)}
                onBlur={e => handleBlur(e.target.value, 'Nombres')}
                InputProps={{
                  endAdornment: (
                    <Zoom in={CheckNombres}>
                      <InputAdornment position='end'
                        style={{ color: !ErrorNombres ? ColorSuccess : ColorError }}>
                        <FAI icon={!ErrorNombres ? faCheck : faTimes} />
                      </InputAdornment>
                    </Zoom>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                value={Apellidos}
                label='Apellidos'
                error={ErrorApellidos}
                placeholder='Coello Estévez'
                helperText={TxtApellidos}
                inputProps={{ maxLength: 50 }}
                onChange={e => setApellidos(e.target.value)}
                onBlur={e => handleBlur(e.target.value, 'Apellidos')}
                InputProps={{
                  endAdornment: (
                    <Zoom in={CheckApellidos}>
                      <InputAdornment position='end'
                        style={{ color: !ErrorApellidos ? ColorSuccess : ColorError }}>
                        <FAI icon={!ErrorApellidos ? faCheck : faTimes} />
                      </InputAdornment>
                    </Zoom>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='email'
                value={Email}
                error={ErrorEmail}
                label='Correo electrónico'
                helperText={TxtEmail}
                inputProps={{ maxLength: 50 }}
                placeholder='aug_coello@himno.hn'
                onChange={e => setEmail(e.target.value)}
                onBlur={e => handleBlur(e.target.value, 'Email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FAI icon={faEnvelope} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Zoom in={CheckEmail}>
                      <InputAdornment position='end'
                        style={{ color: !ErrorEmail ? ColorSuccess : ColorError }}>
                        <FAI icon={!ErrorEmail ? faCheck : faTimes} />
                      </InputAdornment>
                    </Zoom>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography align='left' variant='h6' className='mt-4'>
                Información de Reserva
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={Institucion}
                error={ErrorInstitucion}
                inputProps={{ maxLength: 100 }}
                helperText={TxtInstitucion}
                label='Institución que representa'
                onChange={e => setInstitucion(e.target.value)}
                onBlur={e => handleBlur(e.target.value, 'Institucion')}
                InputProps={{
                  endAdornment: (
                    <Zoom in={CheckInstitucion}>
                      <InputAdornment position='end'
                        style={{ color: !ErrorInstitucion ? ColorSuccess : ColorError }}>
                        <FAI icon={!ErrorInstitucion ? faCheck : faTimes} />
                      </InputAdornment>
                    </Zoom>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Dirección'
                value={Direccion}
                error={ErrorDireccion}
                helperText={TxtDireccion}
                inputProps={{ maxLength: 50 }}
                onChange={e => setDireccion(e.target.value)}
                onBlur={e => handleBlur(e.target.value, 'Direccion')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FAI icon={faMapMarkerAlt} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Zoom in={CheckDireccion}>
                      <InputAdornment position='end'
                        style={{ color: !ErrorDireccion ? ColorSuccess : ColorError }}>
                        <FAI icon={!ErrorDireccion ? faCheck : faTimes} />
                      </InputAdornment>
                    </Zoom>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography id='cantPersonas' gutterBottom color={!ColorSld ? 'textSecondary' : 'primary'}>
                Cantidad de personas que visitarán *
              </Typography>
              <Box pt={0.7}>
                <Slider
                  min={1}
                  max={100}
                  defaultValue={1}
                  valueLabelDisplay='auto'
                  aria-labelledby='cantPersonas'
                  onFocus={() => setColorSld(true)}
                  onChangeCommitted={(_, v) => setCantPersonas(v)}
                  onBlur={() => setColorSld(false)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  autoOk
                  required
                  fullWidth
                  disablePast
                  disableToolbar
                  variant='inline'
                  format='D/MM/YYYY'
                  value={FechaVisita}
                  label='Fecha de visita'
                  minDate={moment().add(1, 'day')}
                  shouldDisableDate={disableWeekends}
                  disabled={props.Fecha ? true : false}
                  onChange={date => setFechaVisita(date.toDate())}
                  minDateMessage='La fecha no puede ser menor al día actual.'
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl required fullWidth error={ErrorHorario}>
                <InputLabel id='Horario'>
                  Horario
                </InputLabel>
                <Select
                  value={IDHorario}
                  labelId='Horario'
                  onChange={e => handleSelect(e.target.value.toString(), 'Horario')}
                  onBlur={e => handleBlur(e.target.value, 'Horario')}
                >
                  {Horarios.map((item, i) => (
                    <MenuItem key={i} value={item._id}>{item.Hora}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{TxtHorario}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl component='fieldset' required>
                <FormLabel component='legend'>Charla académica</FormLabel>
                <RadioGroup row value={Charla} onChange={e => handleCharla(e.target.value)}>
                  <FormControlLabel
                    label='Sí'
                    value={true}
                    control={<Radio color='primary' />}
                  />
                  <FormControlLabel
                    label='No'
                    value={false}
                    control={<Radio color='primary' />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth
                error={ErrorTema}
                required={ReqTema}
                disabled={!ReqTema}
              >
                <InputLabel id='Tema'>
                  Tema
              </InputLabel>
                <Select
                  value={Tema}
                  labelId='Tema'
                  onChange={e => handleTema(e.target.value.toString())}
                  onBlur={e => handleBlur(e.target.value, 'Tema')}
                >
                  <MenuItem value='Economía'>Economía</MenuItem>
                  <MenuItem value='Sistema de Pagos'>Sistema de Pagos</MenuItem>
                  <MenuItem value='Emisión y Tesorería'>Emisión y Tesorería</MenuItem>
                  <MenuItem value='Otro'>Otro - Especificar</MenuItem>
                </Select>
                <FormHelperText>{TxtTema}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={TemaEsp}
                error={ErrorTemaEsp}
                required={ReqTemaEsp}
                disabled={!ReqTemaEsp}
                label='Tema específico'
                helperText={TxtTemaEsp}
                inputProps={{ maxLength: 20 }}
                onChange={e => setTemaEsp(e.target.value)}
                onBlur={e => handleBlur(e.target.value, 'TemaEsp')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                Listado de personas
            </Typography>
              <Typography gutterBottom variant='body2'>
                Adjunte un listado con los nombres de todas las personas del grupo que desean visitar los Centros Culturales. (Se deben incluir los nombres de los profesores).
            </Typography>
              <input
                hidden
                type='file'
                id='listado'
                accept='.pdf, .doc, .docx'
                onChange={handleFiles}
              />
              <label htmlFor='listado'>
                <Button
                  size='small'
                  component='span'
                  variant='contained'
                  startIcon={<FAI icon={faFileUpload} />}
                >
                  {FileListadoTxt}
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                Nota al Gerente
            </Typography>
              <Typography gutterBottom variant='body2'>
                Adjunte la nota dirigida al gerente solicitando la aprobación de la visita a los Centros Culturales y de la charla académica en caso de que aplique.
            </Typography>
              <input
                hidden
                id='nota'
                type='file'
                accept='.pdf, .doc, .docx'
                onChange={handleFiles}
              />
              <label htmlFor='nota'>
                <Button
                  size='small'
                  component='span'
                  variant='contained'
                  startIcon={<FAI icon={faFileUpload} />}
                >
                  {FileNotaTxt}
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Box py={2}>
                <Button
                  size='large'
                  color='primary'
                  variant='contained'
                  disabled={BtnDisabled}
                  onClick={handleSubmit}
                  endIcon={<FAI icon={faPaperPlane} />}
                >
                  {BtnTxt}
                </Button>
              </Box>
            </Grid>
          </Grid>
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
          className={isSnackError ? classes.errorSnack : classes.successSnack}
          aria-describedby='snackbar'
          message={
            <span className={classes.messageSnack} id='snackbar'>
              <FAI icon={isSnackError ? faTimesCircle : faCheckCircle} className={classes.iconSnack} />
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

export default CrearSolicitud;
