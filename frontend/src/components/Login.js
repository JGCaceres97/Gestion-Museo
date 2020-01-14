// @ts-check
import {
  faAt,
  faExclamationCircle,
  faKey,
  faQuestion,
  faSignInAlt,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  makeStyles,
  Paper,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography
} from '@material-ui/core';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { address, port } from '../config';
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
  },
  infoSnack: {
    backgroundColor: theme.palette.primary.main
  },
  rotateIcon: {
    transform: 'rotate(180deg)'
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
  const [EmailToReset, setEmailToReset] = useState('');

  const [ErrorEmail, setErrorEmail] = useState(false);
  const [TxtEmail, setTxtEmail] = useState('');
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [TxtPassword, setTxtPassword] = useState('');
  const [ErrorEmailToReset, setErrorEmailToReset] = useState(false);
  const [TxtEmailToReset, setTxtEmailToReset] = useState('');

  const [ShowPassword, setShowPassword] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsResetLoading, setIsResetLoading] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [BtnTxt, setBtnTxt] = useState('Iniciar Sesión');
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [BtnResetDisabled, setBtnResetDisabled] = useState(false);
  const [BtnCancelDisabled, setBtnCancelDisabled] = useState(false);
  const [SuccessLogin, setSuccessLogin] = useState(false);
  const [DialogOpen, setDialogOpen] = useState(false);
  const [, setToken] = useLocalStorage('Token', '');
  const [, setUsuario] = useLocalStorage('Usuario', '');
  const [, setPermisos] = useLocalStorage('Permisos', '');

  /**
   * Método que maneja las acciones cuando se pierde el foco en un componente.
   * @param {string} value Valor contenido en el campo.
   * @param {string} field Campo al que hace referencia.
   */
  const handleBlur = (value, field) => {
    const RegExpEmail = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/;
    switch (field) {
      case 'Email':
        if (value !== '') {
          if (value.search(RegExpEmail) !== 0) {
            toggleErrorEmail(
              'Complete el campo requerido con el formato "ejem.plo@ejemplo.com".',
              true
            );
            // setErrorEmail(true);
            // setTxtEmail('Complete el campo requerido con el formato "ejem.plo@ejemplo.com".');
          } else {
            toggleErrorEmail('', false);
            // setErrorEmail(false);
            // setTxtEmail('');
          }
        } else {
          toggleErrorEmail('', false);
          // setErrorEmail(false);
          // setTxtEmail('');
        }
        break;
      case 'Password':
        if (value === '') {
          toggleErrorPassword('Complete el campo requerido.', true);
          // setErrorPassword(true);
          // setTxtPassword('Complete el campo requerido.');
        } else {
          toggleErrorPassword('', false);
          // setErrorPassword(false);
          // setTxtPassword('');
        }
        break;
      case 'EmailToReset':
        if (value !== '') {
          if (value.search(RegExpEmail) !== 0) {
            toggleErrorReset(
              'Complete el campo requerido con el formato "ejem.plo@ejemplo.com".',
              true
            );
          } else {
            toggleErrorReset('', false);
          }
        } else {
          toggleErrorReset('', false);
        }
        break;
      default:
        break;
    }
  };

  /**
   * Método que maneja las acciones al cerrar un snackbar.
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento de cierre en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  /**
   * Método que maneja las acciones para cerrar un dialog.
   * @param {React.MouseEvent<HTMLButtonElement>} [e] Evento de cierre en cuestión.
   * @param {string} [reason] Razón de cierre del dialog.
   */
  const handleDialogClose = (e, reason) => {
    if (!BtnCancelDisabled) {
      setDialogOpen(false);
    }
  };

  /**
   * Método que maneja las acciones cuando un dialog es cerrado.
   */
  const handleDialogExited = () => {
    setEmailToReset('');
    toggleErrorReset('', false);
  };

  /**
   * Método para enviar correo de restablecimiento de contraseña.
   */
  const handleForgotPassword = async () => {
    const RegExpEmail = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/;
    if (EmailToReset.search(RegExpEmail) === 0) {
      try {
        toggleReset(true);
        setSnackOpen(false);
        toggleErrorReset('', false);

        const res = await axios.post(`http://${address}:${port}/api/forgotPassword`, {
          Email: EmailToReset
        });

        if (res.data === 'Correo de restablecimiento enviado.') {
          showSnack('Info', res.data);
          handleDialogClose();
        } else if (res.data === 'Correo no registrado.') {
          showSnack('Error', res.data + ' Verifique que sea correcto.');
        }
      } catch (e) {
        console.error(e);
        showSnack('Error', 'Error al intentar restablecer contraseña.');
      } finally {
        toggleReset(false);
      }
    } else {
      showSnack('Error', 'Complete el campo con el formato adecuado.');
    }
  };

  /**
   * Método para cambiar el estado del reset.
   * @param {boolean} disabled ¿Deshabilitar los botones?
   */
  const toggleReset = disabled => {
    setIsResetLoading(disabled);
    setBtnResetDisabled(disabled);
    setBtnCancelDisabled(disabled);
  };

  /**
   * Método para mostrar errores en el campo de correo.
   * @param {string} txt Texto a mostrar en el error.
   * @param {boolean} error ¿Mostrar error?
   */
  const toggleErrorEmail = (txt, error) => {
    setTxtEmail(txt);
    setErrorEmail(error);
  };

  /**
   * Método para mostrar errores en el campo de contraseña.
   * @param {string} txt Texto a mostrar en el error.
   * @param {boolean} error ¿Mostrar error?
   */
  const toggleErrorPassword = (txt, error) => {
    setTxtPassword(txt);
    setErrorPassword(error);
  };

  /**
   * Método para mostrar errores en el dialog de reset.
   * @param {string} txt Texto a mostrar en el error.
   * @param {boolean} error ¿Mostrar error?
   */
  const toggleErrorReset = (txt, error) => {
    setTxtEmailToReset(txt);
    setErrorEmailToReset(error);
  };

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {'Error' | 'Info'} type Tipo de snack a mostrar.
   * @param {string} txt Texto a mostrar en el snack.
   */
  const showSnack = (type, txt) => {
    if (type === 'Error') {
      setIsSnackError(true);
    } else {
      setIsSnackError(false);
    }
    setSnackTxt(txt);
    setSnackOpen(true);
  };

  /**
   * Método para cambiar la apariencia del botón de inicio de sesión.
   * @param {boolean} disable ¿Botón deshabilitado?
   * @param {string} txt Texto a mostrar en el botón.
   */
  const toggleBtn = (disable, txt) => {
    setBtnDisabled(disable);
    setBtnTxt(txt);
  };

  /**
   * Método para manejar las acciones al presionar 'Enter' en un Textfield.
   * @param {React.KeyboardEvent<HTMLDivElement>} ev Evento al presionar una tecla.
   * @param {string} field Campo al que hace referencia.
   */
  const handleEnterKeyPress = (ev, field) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      if (field === 'Login') {
        handleSubmit();
      } else if (field === 'Reset') {
        if (!BtnResetDisabled) {
          handleForgotPassword();
        }
      }
    }
  };

  /**
   * Método para manejar el ingreso al sistema.
   */
  const handleSubmit = () => {
    if (!ErrorEmail && !ErrorPassword && Email !== '' && Password !== '') {
      setSnackOpen(false);
      toggleBtn(true, 'Iniciando...');
      setIsLoading(true);
      setTimeout(Login, 500);
    } else {
      showSnack('Error', 'Complete los campos requeridos.');
    }
  };

  /**
   * Método para iniciar sesión en el sistema y obtener un token de acceso.
   */
  const Login = async () => {
    try {
      const res = await axios.post(`http://${address}:${port}/api/signIn`, {
        Email,
        Password
      });

      setToken(`Bearer ${res.data.Token}`);
      setUsuario(res.data.Usuario);
      setPermisos(res.data.Permisos);
      setSuccessLogin(true);
    } catch (e) {
      setIsLoading(false);
      toggleBtn(false, 'Iniciar Sesión');

      if (e.response.data) {
        showSnack('Error', e.response.data);
      } else {
        showSnack('Error', 'Error al iniciar sesión. Intente de nuevo.');
      }
    }
  };

  if (SuccessLogin) return <Redirect push to='/' />;

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
            <Paper>
              {IsLoading ? <LinearProgress /> : ''}
              <Box p={2}>
                <Box className={classes.alignCenter}>
                  <img width='60%' src='/img/logo.png' alt='Logo de Centros Culturales, BCH' />
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
                    spellCheck={false}
                    error={ErrorEmail}
                    helperText={TxtEmail}
                    placeholder='aug_coello@himno.hn'
                    label='Correo electrónico'
                    inputProps={{ maxLength: 50 }}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={e => handleBlur(e.target.value, 'Email')}
                    onKeyPress={e => handleEnterKeyPress(e, 'Login')}
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
                    spellCheck={false}
                    error={ErrorPassword}
                    helperText={TxtPassword}
                    inputProps={{ maxLength: 50 }}
                    type={!ShowPassword ? 'password' : 'text'}
                    onChange={e => setPassword(e.target.value)}
                    onKeyPress={e => handleEnterKeyPress(e, 'Login')}
                    onBlur={e => handleBlur(e.target.value, 'Password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <FAI icon={faKey} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            size='small'
                            tabIndex={-1}
                            onClick={() => setShowPassword(!ShowPassword)}
                          >
                            {!ShowPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box px={2} className={classes.alignCenter}>
                  <Button
                    fullWidth
                    onClick={() => setDialogOpen(true)}
                    startIcon={<FAI icon={faQuestion} className={classes.rotateIcon} />}
                    endIcon={<FAI icon={faQuestion} />}
                  >
                    Has olvidado tu contraseña
                  </Button>
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
        <Dialog
          open={DialogOpen}
          onClose={handleDialogClose}
          disableBackdropClick={true}
          onExited={handleDialogExited}
          aria-labelledby='reset-password-dialog'
        >
          {IsResetLoading ? <LinearProgress /> : ''}
          <DialogTitle id='reset-password-dialog'>Restablecer Contraseña</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Introduzca su correo electrónico al cual se le enviará un enlace para que pueda
              restablecer la contraseña.
            </DialogContentText>
            <TextField
              required
              autoFocus
              fullWidth
              type='email'
              margin='dense'
              spellCheck={false}
              value={EmailToReset}
              error={ErrorEmailToReset}
              helperText={TxtEmailToReset}
              label='Dirección de correo electrónico'
              onChange={e => setEmailToReset(e.target.value)}
              onKeyPress={e => handleEnterKeyPress(e, 'Reset')}
              onBlur={e => handleBlur(e.target.value, 'EmailToReset')}
            />
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={handleDialogClose} disabled={BtnCancelDisabled}>
              Cancelar
            </Button>
            <Button
              color='primary'
              variant='contained'
              disabled={BtnResetDisabled}
              onClick={handleForgotPassword}
            >
              Restablecer
            </Button>
          </DialogActions>
        </Dialog>
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
              [classes.infoSnack]: !IsSnackError
            })}
            aria-describedby='snackbar'
            message={
              <span className={classes.messageSnack} id='snackbar'>
                <FAI
                  icon={IsSnackError ? faTimesCircle : faExclamationCircle}
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
      </Container>
    </React.Fragment>
  );
}

export default Login;
