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
  const [FechaVisita, setFechaVisita] = useState(moment().add(1, 'day'));
  const [Horario, setHorario] = useState('');
  const [Charla, setCharla] = useState(true);

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
              label='Número de identidad'
              placeholder='0801-1980-01234'
              autoFocus
              fullWidth
              required
              value={Identidad}
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
              label='Teléfono'
              placeholder='9999-9999'
              fullWidth
              required
              value={Telefono}
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
              label='Nombres'
              placeholder='Augusto Constantino'
              fullWidth
              required
              value={Nombres}
              onChange={e => setNombres(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label='Apellidos'
              placeholder='Coello Estévez'
              fullWidth
              required
              value={Apellidos}
              onChange={e => setApellidos(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Correo electrónico'
              placeholder='augcoello@gmail.com'
              fullWidth
              required
              value={Email}
              onChange={e => setEmail(e.target.value)}
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
              label='Institución que representa'
              fullWidth
              required
              value={Institucion}
              onChange={e => setInstitucion(e.target.value)}
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
              label='Ciudad'
              fullWidth
              required
              value={Ciudad}
              onChange={e => setCiudad(e.target.value)}
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
