// @ts-check
import MomentUtils from '@date-io/moment';
import { faCheck, faEnvelope, faFileUpload, faIdCard, faMapMarkerAlt, faPaperPlane, faPhoneAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
//import axios from 'axios';
import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Paper, Radio, RadioGroup, Select, Slider, TextField, Typography, Zoom } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

moment.locale('es-us');
moment.updateLocale('es-us', {
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  week: {
    dow: 1,
    doy: 4
  }
});

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1)
  }
}));

/**
 * Formulario de Reservaciones de Visita a los Centros Culturales.
 */
function CrearSolicitud() {
  // @ts-ignore
  const classes = useStyles();

  const req = async () => {
    /* const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDlhYmM5ZWU1NzMwOTAyNzNkODRjMGQiLCJpYXQiOjE1NzI3Mjk5MDQsImV4cCI6MTU3MjgxNjMwNH0.uTO6GeJVHK6x6Bjlx9o2gqEIOXkuj2VESa3VB3LDu9k';

    const headers = {
      headers: { 'auth-token': token }
    }

    try {
      const res = await axios.get('http://35.185.124.104:4000/api/solicitudes', headers);
      console.log(res);
    } catch (e) {
      console.error(e);
    } */
  }

  useEffect(() => {
    req();
  }, []);

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
  const [Depto, setDepto] = useState('');
  const [Municipio, setMunicipio] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [, setCantPersonas] = useState(1 || []);
  const [FechaVisita, setFechaVisita] = useState(initialDate);
  const [Horario, setHorario] = useState('');
  const [Charla, setCharla] = useState(true);
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
  const [ErrorDepto, setErrorDepto] = useState(false);
  const [TxtDepto, setTxtDepto] = useState('');
  const [ErrorMunicipio, setErrorMunicipio] = useState(false);
  const [TxtMunicipio, setTxtMunicipio] = useState('');
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
  const [ReqTema, setReqTema] = useState(true);
  const [ReqTemaEsp, setReqTemaEsp] = useState(false);
  const [FileListadoTxt, setFileListadoTxt] = useState('Elegir Archivo');
  const [FileNotaTxt, setFileNotaTxt] = useState('Elegir Archivo');
  const [ColorSld, setColorSld] = useState(false);

  const ColorError = '#DC143C';
  const ColorSuccess = '#008000';
  const MaxFileSize = 5 //Máximo tamaño de archivos en MB.
  const RefListado = React.createRef();
  const RefNota = React.createRef();

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
      case 'Depto':
        if (value === '') {
          setErrorDepto(true);
          setTxtDepto(txt);
        }
        break;
      case 'Municipio':
        if (value === '') {
          setErrorMunicipio(true);
          setTxtMunicipio(txt);
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
  const handleChange = (value, field) => {
    switch (field) {
      case 'Depto':
        setDepto(value);
        setTxtDepto('');
        setErrorDepto(false);
        break;
      case 'Municipio':
        setMunicipio(value);
        setTxtMunicipio('');
        setErrorMunicipio(false);
        break;
      case 'Horario':
        setHorario(value);
        setTxtHorario('');
        setErrorHorario(false);
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
    handleChange(value, 'Tema');
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
   * Método para manejar los archivos adjuntos del formulario.
   * @param {string} id ID del input que fue afectado por el cambio.
   */
  const handleFiles = id => {
    let files;
    let isListado;
    if (id === 'listado') {
      files = RefListado.current.files;
      isListado = true;
    } else {
      files = RefNota.current.files;
      isListado = false;
    }

    if (files.length === 1) {
      const size = files[0].size;
      const ext = files[0].name.split('.').pop();
      const split = files[0].name.split('.').shift();
      const name = split.length > 30 ? split.substring(0, 30).concat('...') : split;

      if (['pdf', 'doc', 'docx'].indexOf(ext) === -1) {
        if (isListado) {
          RefListado.current.value = '';
          setFileListadoTxt('Elegir Archivo');
        } else {
          RefNota.current.value = '';
          setFileNotaTxt('Elegir Archivo');
        }
        //Notificar el error de extensión.
      } else {
        if (size <= (MaxFileSize * 1048576)) {
          isListado ? setFileListadoTxt(name) : setFileNotaTxt(name);
        } else {
          if (isListado) {
            RefListado.current.value = '';
            setFileListadoTxt('Elegir Archivo');
          } else {
            RefNota.current.value = '';
            setFileNotaTxt('Elegir Archivo');
          }
          // Notificar error de peso;
        }
      }
    }
  }

  /**
   * Método para manejar el envío de las solicitudes.
   */
  const handleSubmit = () => {
    alert('Enviado');
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
                Información Personal
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
                label='Teléfono'
                error={ErrorTel}
                value={Telefono}
                placeholder='9999-9999'
                helperText={TxtTel}
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
            <Grid item xs={6} md={4}>
              <FormControl required fullWidth error={ErrorDepto}>
                <InputLabel id='Depto'>
                  Departamento
              </InputLabel>
                <Select
                  value={Depto}
                  labelId='Depto'
                  onChange={e => handleChange(e.target.value.toString(), 'Depto')}
                  onBlur={e => handleBlur(e.target.value, 'Depto')}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>{TxtDepto}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl required fullWidth error={ErrorMunicipio}>
                <InputLabel id='Municipio'>
                  Municipio
              </InputLabel>
                <Select
                  value={Municipio}
                  labelId='Municipio'
                  onChange={e => handleChange(e.target.value.toString(), 'Municipio')}
                  onBlur={e => handleBlur(e.target.value, 'Municipio')}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>{TxtMunicipio}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
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
                  onChange={date => setFechaVisita(date.toDate())}
                  shouldDisableDate={disableWeekends}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl required fullWidth error={ErrorHorario}>
                <InputLabel id='Horario'>
                  Horario
              </InputLabel>
                <Select
                  value={Horario}
                  labelId='Horario'
                  onChange={e => handleChange(e.target.value.toString(), 'Horario')}
                  onBlur={e => handleBlur(e.target.value, 'Horario')}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>{TxtHorario}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl component='fieldset' required>
                <FormLabel component='legend'>Charla académica</FormLabel>
                <RadioGroup row value={Charla} onChange={e => handleCharla(e.target.value)}>
                  <FormControlLabel
                    value={true}
                    control={<Radio color='primary' />}
                    label='Sí'
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color='primary' />}
                    label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
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
                ref={RefListado}
                accept='.pdf, .doc, .docx'
                onChange={e => handleFiles(e.target.id)}
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
                ref={RefNota}
                accept='.pdf, .doc, .docx'
                onChange={e => handleFiles(e.target.id)}
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
                  onClick={handleSubmit}
                  endIcon={<FAI icon={faPaperPlane} />}
                >
                  Enviar Solicitud
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </React.Fragment>
  );
}

export default CrearSolicitud;
