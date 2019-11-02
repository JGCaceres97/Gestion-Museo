import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  Radio,
  RadioGroup,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/es-us';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import {
  faIdCard,
  faPhoneAlt,
  faEnvelope,
  faCity
} from '@fortawesome/free-solid-svg-icons';

moment.locale('es-us');
moment.updateLocale('es-us', {
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  week: {
    dow: 1
  }
});

function CrearSolicitud() {
  const initialDate = () => {
    switch (moment().day()) {
      case 5:
        return moment().add(3, 'days');
      case 6:
        return moment().add(2, 'days');
      default:
        return moment().add(1, 'day');
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
  const [Ciudad, setCiudad] = useState('');
  const [CantPersonas, setCantPersonas] = useState('');
  const [FechaVisita, setFechaVisita] = useState(initialDate);
  const [Horario, setHorario] = useState('');
  const [Charla, setCharla] = useState(true);

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
  const [ErrorCiudad, setErrorCiudad] = useState(false);
  const [TxtCiudad, setTxtCiudad] = useState('');

  const onBlur = (value, field) => {
    const txt = 'Por favor complete el campo requerido.';

    switch (field) {
      case 'Nombres':
        if (value === '') {
          setErrorNombres(true);
          setTxtNombres(txt);
        } else {
          setErrorNombres(false);
          setTxtNombres('');
        }
        break;
      case 'Apellidos':
        if (value === '') {
          setErrorApellidos(true);
          setTxtApellidos(txt);
        } else {
          setErrorApellidos(false);
          setTxtApellidos('');
        }
        break;
      case 'Institucion':
        if (value === '') {
          setErrorInstitucion(true);
          setTxtInstitucion(txt);
        } else {
          setErrorInstitucion(false);
          setTxtInstitucion('');
        }
        break;
      case 'Ciudad':
        if (value === '') {
          setErrorCiudad(true);
          setTxtCiudad(txt);
        } else {
          setErrorCiudad(false);
          setTxtCiudad('');
        }
        break;
      default:
        break;
    }
  }

  const onBlurID = value => {
    const RegExp = /^\d{4}-\d{4}-\d{5}$/;
    if (value.search(RegExp) !== 0 || value === '') {
      setErrorID(true);
      setTxtID('Por favor complete el campo requerido con el formato "0123-4567-89012".');
    } else {
      setErrorID(false);
      setTxtID('');
    }
  }

  const onBlurTel = value => {
    const RegExp = /^\d{4}-\d{4}$/;
    if (value.search(RegExp) !== 0 || value === '') {
      setErrorTel(true);
      setTxtTel('Por favor complete el campo requerido con el formato "9999-9999".');
    } else {
      setErrorTel(false);
      setTxtTel('');
    }
  }

  const onBlurEmail = value => {
    const RegExp = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/;
    if (value.search(RegExp) !== 0 || value === '') {
      setErrorEmail(true);
      setTxtEmail('Por favor complete el campo requerido con el formato "ejem.plo@ejemplo.com".');
    } else {
      setErrorEmail(false);
      setTxtEmail('');
    }
  }

  const handleCharla = value => {
    if (value === 'true') {
      setCharla(true);
    } else {
      setCharla(false);
    }
  }

  const disableWeekends = day => {
    if (day.day() === 6 || day.day() === 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align='center' variant='h4'>
              Reserva de Visita a Centros Culturales
            </Typography>
            <hr />
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
              onBlur={e => onBlurID(e.target.value)}
              onChange={e => setIdentidad(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FAI icon={faIdCard} />
                  </InputAdornment>
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
              onBlur={e => onBlurTel(e.target.value)}
              onChange={e => setTelefono(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FAI icon={faPhoneAlt} />
                  </InputAdornment>
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
              onBlur={e => onBlur(e.target.value, 'Nombres')}
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
              onBlur={e => onBlur(e.target.value, 'Apellidos')}
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
              inputProps={{ maxLength: 100 }}
              placeholder='augcoello@gmail.com'
              onChange={e => setEmail(e.target.value)}
              onBlur={e => onBlurEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FAI icon={faEnvelope} />
                  </InputAdornment>
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
              onBlur={e => onBlur(e.target.value, 'Institucion')}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl required fullWidth>
              <InputLabel id='Depto'>
                Departamento
              </InputLabel>
              <Select
                labelId='Depto'
                value={Depto}
                onChange={e => setDepto(e.target.value)}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl required fullWidth>
              <InputLabel id='Municipio'>
                Municipio
              </InputLabel>
              <Select
                labelId='Municipio'
                value={Municipio}
                onChange={e => setMunicipio(e.target.value)}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label='Ciudad'
              value={Ciudad}
              error={ErrorCiudad}
              helperText={TxtCiudad}
              inputProps={{ maxLength: 50 }}
              onChange={e => setCiudad(e.target.value)}
              onBlur={e => onBlur(e.target.value, 'Ciudad')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FAI icon={faCity} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label='Cantidad de personas'
              fullWidth
              required
              type='number'
              value={CantPersonas}
              onChange={e => setCantPersonas(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                autoOk
                fullWidth
                disablePast
                disableToolbar
                variant='inline'
                format='D/MM/YYYY'
                value={FechaVisita}
                label='Fecha de visita'
                minDate={moment().add(1, 'day')}
                onChange={date => setFechaVisita(date._d)}
                shouldDisableDate={disableWeekends}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl required fullWidth>
              <InputLabel id='Horario'>
                Horario
              </InputLabel>
              <Select
                labelId='Horario'
                value={Horario}
                onChange={e => setHorario(e.target.value)}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
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
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default CrearSolicitud;
