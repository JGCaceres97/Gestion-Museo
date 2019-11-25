// @ts-check
import { faAt, faKey, faSignInAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, Divider, Grid, IconButton, InputAdornment, LinearProgress, makeStyles, Paper, Snackbar, SnackbarContent, TextField, Typography } from '@material-ui/core';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import config from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    minWidth: '100%',
    backgroundImage: 'url(/img/bgLogin.webp)',
    backgroundPosition: 'center'
  },
  containerGrid: {
    minHeight: '100vh'
  },
  paper: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  grid: {
    width: '100%'
  },
  alignCenter: {
    textAlign: 'center'
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
  errorSnack: {
    backgroundColor: theme.palette.error.dark
  }
}));

/**
 * Formulario para iniciar sesión e ingresar al sistema.
 */
function Login() {
  // @ts-ignore
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Inicio de Sesión';
  }, []);

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [ErrorEmail, setErrorEmail] = useState(false);
  const [TxtEmail, setTxtEmail] = useState('');
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [TxtPassword, setTxtPassword] = useState('');

  const [ShowPassword, setShowPassword] = useState(false);
  const [ShowProgress, setShowProgress] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [BtnTxt, setBtnTxt] = useState('Iniciar Sesión');
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [SuccessLogin, setSuccessLogin] = useState(false);
  const [, setToken] = useLocalStorage('Token', '');
  const [, setUserId] = useLocalStorage('UserId', '');
  const [, setRolId] = useLocalStorage('RolId', '');

  /**
   * Método que maneja las acciones cuando se pierde el foco en un componente.
   * @param {string} value Valor contenido en el campo.
   * @param {string} field Campo al que hace referencia.
   */
  const handleBlur = (value, field) => {
    switch (field) {
      case 'Email':
        const RegExpEmail = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/;
        if (value.search(RegExpEmail) !== 0 || value === '') {
          setErrorEmail(true);
          setTxtEmail('Complete el campo requerido con el formato "ejem.plo@ejemplo.com".');
        } else {
          setErrorEmail(false);
          setTxtEmail('');
        }
        break;
      case 'Password':
        if (value === '') {
          setErrorPassword(true);
          setTxtPassword('Complete el campo requerido.');
        } else {
          setErrorPassword(false);
          setTxtPassword('');
        }
        break;
      default:
        break;
    }
  }

  /**
   * Método que maneja las acciones al cerrar un snackbar.
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento de cierre en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  }

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {string} txt Texto a mostrar en el snack.
   */
  const showSnack = (txt) => {
    setSnackTxt(txt);
    setSnackOpen(true);
  }

  /**
   * Método para cambiar la apariencia del botón de inicio de sesión.
   * @param {boolean} disable ¿Botón deshabilitado?
   * @param {string} txt Texto a mostrar en el botón.
   */
  const toggleBtn = (disable, txt) => {
    setBtnDisabled(disable);
    setBtnTxt(txt);
  }

  /**
   * Método para manejar las acciones al presionar 'Enter' en un Textfield.
   * @param {React.KeyboardEvent<HTMLDivElement>} ev Evento al presionar una tecla.
   */
  const onEnterKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleSubmit();
    }
  }

  /**
   * Método para manejar el ingreso al sistema.
   */
  const handleSubmit = () => {
    if (!ErrorEmail && !ErrorPassword
      && Email !== '' && Password !== '') {
      setSnackOpen(false);
      toggleBtn(true, 'Iniciando...');
      setShowProgress(true);
      setTimeout(Login, 500);
    } else {
      showSnack('Complete los campos requeridos.');
    }
  }

  /**
   * Método para iniciar sesión en el sistema y obtener un token de acceso.
   */
  const Login = async () => {
    try {
      const res = await axios.post(`http://${config.address}:${config.port}/api/auth/signIn`, {
        Email,
        Password
      });

      setToken(`Bearer ${res.data.token}`);
      setUserId(res.data.userId);
      setRolId(res.data.rolId);
      setSuccessLogin(true);
    } catch (e) {
      setShowProgress(false);
      toggleBtn(false, 'Iniciar Sesión');
      showSnack('Error al iniciar sesión. Intente de nuevo.');
    }
  }

  if (SuccessLogin) return <Redirect push to='/' />

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Grid
          container
          spacing={0}
          justify='center'
          direction='column'
          alignItems='center'
          className={classes.containerGrid}
        >
          <Grid item xs={12} sm={10} md={4} xl={3} className={classes.grid}>
            <Paper className={classes.paper} >
              {ShowProgress ?
                <LinearProgress /> : ''
              }
              <Box p={2}>
                <Box className={classes.alignCenter}>
                  <img
                    width='60%'
                    src='/img/logo.png'
                    alt='Logo de Centros Culturales, BCH'
                  />
                </Box>
                <Box pb={2} px={2}>
                  <Typography align='center' variant='h4'>
                    Inicio de Sesión
                  </Typography>
                  <Divider />
                </Box>
                <Box p={2}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type='email'
                    value={Email}
                    error={ErrorEmail}
                    helperText={TxtEmail}
                    onKeyPress={onEnterKeyPress}
                    placeholder='aug_coello@himno.hn'
                    label='Correo electrónico'
                    inputProps={{ maxLength: 50 }}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={e => handleBlur(e.target.value, 'Email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <FAI icon={faAt} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box p={2}>
                  <TextField
                    required
                    fullWidth
                    value={Password}
                    label='Contraseña'
                    error={ErrorPassword}
                    helperText={TxtPassword}
                    onKeyPress={onEnterKeyPress}
                    inputProps={{ maxLength: 50 }}
                    type={!ShowPassword ? 'password' : 'text'}
                    onChange={e => setPassword(e.target.value)}
                    onBlur={e => handleBlur(e.target.value, 'Password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <FAI icon={faKey} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => setShowPassword(!ShowPassword)} size='small'>
                            {!ShowPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box p={2} className={classes.alignCenter}>
                  <Button
                    fullWidth
                    size='large'
                    color='primary'
                    variant='contained'
                    disabled={BtnDisabled}
                    onClick={handleSubmit}
                    endIcon={<FAI icon={faSignInAlt} />}
                  >
                    {BtnTxt}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
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
            className={classes.errorSnack}
            aria-describedby='snackbar'
            message={
              <span className={classes.messageSnack} id='snackbar'>
                <FAI icon={faTimesCircle} className={classes.iconSnack} />
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
      </Container>
    </React.Fragment>
  );
}

export default Login;
