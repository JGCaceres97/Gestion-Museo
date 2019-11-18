// @ts-check
import { faCheckCircle, faEnvelope, faExclamationCircle, faIdCard, faPhoneAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, InputLabel, makeStyles, MenuItem, Paper, Radio, RadioGroup, Select, Snackbar, SnackbarContent, TextField, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import config from '../config';
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
  }
}));

/**
 * Formulario para mostrar la información de una solicitud y poder cambiar el estado de la misma.
 * @param {Object} props Props que recibe de otro componente.
 * @param {string} props._id ID que identifica la solicitud.
 */
function InfoSolicitud({ _id }) {
  // @ts-ignore
  const classes = useStyles();

  const [Solicitud, setSolicitud] = useState({
    Apellidos: '',
    CantPersonas: 1,
    Charla: false,
    Direccion: '',
    Email: '',
    FechaVisita: '',
    IDEstado: { _id: '' },
    IDHorario: { Hora: '' },
    Identidad: '',
    Institucion: '',
    Nombres: '',
    Telefono: '',
    TemaCharla: ''
  });

  const [Estados, setEstados] = useState([]);
  const [BtnTxt, setBtnTxt] = useState('Actualizar');
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [isSnackError, setIsSnackError] = useState(false);
  const [isSnackInfo, setIsSnackInfo] = useState(false);
  const [Token] = useLocalStorage('Token', '');
  const { Apellidos, CantPersonas, Charla, Direccion, Email, FechaVisita, IDEstado,
    IDHorario, Identidad, Institucion, Nombres, Telefono, TemaCharla } = Solicitud;

  useEffect(() => {
    const reqEstados = async () => {
      try {
        const res = await axios.get(`http://${config.address}:${config.port}/api/estados`, {
          headers: {
            auth: Token
          }
        });
        setEstados(res.data);
      } catch (e) {
        console.error(e.response.data.message);
      }
    }
    reqEstados();
  }, [Token]);

  useEffect(() => {
    showSnack('Info', 'Cargando...');
    document.title = 'Información de Solicitud';
    const reqSolicitud = async () => {
      try {
        const res = await axios.get(`http://${config.address}:${config.port}/api/solicitudes/${_id}`, {
          headers: {
            auth: Token
          }
        });
        setSolicitud(res.data);
        showSnack('Info', 'Información cargada.');
      } catch (e) {
        console.error(e.response.data.message);
      }
    }
    reqSolicitud();
  }, [Token, _id]);

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
  }

  /**
   * Método para cambiar la apariencia del botón de guardar.
   * @param {boolean} disable ¿Botón deshabilitado?
   * @param {string} txt Texto a mostrar en el botón.
   */
  const toggleBtn = (disable, txt) => {
    setBtnDisabled(disable);
    setBtnTxt(txt);
  }

  /**
   * Método para actualizar el estado de una solicitud.
   * @param {string} _id ID del nuevo estado seleccionado.
   */
  const handleEstado = (_id) => {
    setSolicitud({
      ...Solicitud,
      IDEstado: { _id }
    });
  }

  /**
   * Método para guardar la actualización de estado de la solicitud.
   */
  const handleSubmit = async () => {
    toggleBtn(true, 'Actualizando...');
    try {
      await axios.put(`http://${config.address}:${config.port}/api/solicitudes/${_id}`,
        Solicitud, {
        headers: {
          auth: Token
        }
      });

      showSnack('Success', 'Estado actualizado.');
      // Cerrar el dialogo.
    } catch (e) {
      showSnack('Error', e.response.data.message);
    } finally {
      toggleBtn(false, 'Actualizar');
    }
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align='center' variant='h4'>
                Información de Solicitud
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
                fullWidth
                value={Identidad}
                label='Número de identidad'
                InputProps={{
                  readOnly: true,
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
                fullWidth
                value={Telefono}
                label='Teléfono'
                InputProps={{
                  readOnly: true,
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
                fullWidth
                value={Nombres}
                label='Nombres'
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={Apellidos}
                label='Apellidos'
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={Email}
                label='Correo electrónico'
                InputProps={{
                  readOnly: true,
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
                fullWidth
                value={Institucion}
                label='Institución que representa'
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={Direccion}
                label='Dirección'
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={CantPersonas}
                label='Cantidad de personas que visitarán'
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Fecha de visita'
                InputProps={{
                  readOnly: true
                }}
                value={moment(FechaVisita).format('DD/MM/YYYY')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Horario'
                InputProps={{
                  readOnly: true
                }}
                value={IDHorario.Hora}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Charla académica</FormLabel>
                <RadioGroup row value={Charla}>
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
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label='Tema'
                InputProps={{
                  readOnly: true
                }}
                value={Charla ? TemaCharla : 'N/A'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id='Estado'>
                  Estado
                </InputLabel>
                <Select
                  value={IDEstado._id}
                  labelId='Estado'
                  onChange={e => handleEstado(e.target.value.toString())}
                >
                  {Estados.map((item, i) => (
                    <MenuItem key={i} value={item._id}>{item.Nombre}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>El solicitante será notificado en caso de cambio.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Box py={2}>
                <Button
                  size='large'
                  color='primary'
                  variant='contained'
                  disabled={BtnDisabled}
                  onClick={handleSubmit}
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
          className={isSnackError ? classes.errorSnack : isSnackInfo ? classes.infoSnack : classes.successSnack}
          aria-describedby='snackbar'
          message={
            <span className={classes.messageSnack} id='snackbar'>
              <FAI icon={isSnackError ? faTimesCircle : isSnackInfo ? faExclamationCircle : faCheckCircle} className={classes.iconSnack} />
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

export default InfoSolicitud;
