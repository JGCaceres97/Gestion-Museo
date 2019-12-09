// @ts-check
import {
  faCheckCircle,
  faExternalLinkAlt,
  faKey,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Container,
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
  successSnack: {
    backgroundColor: '#008000'
  }
}));

function ResetPassword(props) {
  // @ts-ignore
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Actualizar Contraseña';
  }, []);

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [BtnTxt, setBtnTxt] = useState('Actualizar');
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [ErrorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [ErrorToken, setErrorToken] = useState(false);
  const [TxtPassword, setTxtPassword] = useState('');
  const [TxtConfirmPassword, setTxtConfirmPassword] = useState('');
  const [ShowPassword, setShowPassword] = useState(false);
  const [IsSnackError, setIsSnackError] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [Redirected, setRedirected] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [SuccessTimeout, setSuccessTimeout] = useState(0);

  useEffect(() => {
    const reset = async () => {
      try {
        const res = await axios.post(`http://${address}:${port}/api/reset`, {
          ResetToken: props.match.params.token
        });

        if (res.data.message === 'Token válido.') {
          setEmail(res.data.Email);
          setErrorToken(false);
        } else {
          setErrorToken(true);
          showSnack('Error', res.data.message);
        }
        setIsLoading(false);
      } catch (e) {
        showSnack('Error', e.response.data);
      }
    };

    reset();
  }, [props.match.params]);

  useEffect(() => {
    if (Success && SuccessTimeout < 100) {
      const interval = setInterval(() => {
        setSuccessTimeout(SuccessTimeout => SuccessTimeout + 20);
      }, 1000);
      return () => clearInterval(interval);
    } else if (SuccessTimeout === 100) {
      setRedirected(true);
    }
  }, [Success, SuccessTimeout]);

  /**
   * Método que maneja las acciones cuando se pierde el foco en un componente.
   * @param {string} value Valor contenido en el campo.
   * @param {string} field Campo al que hace referencia.
   */
  const handleBlur = (value, field) => {
    switch (field) {
      case 'Password':
        if (value === '') {
          setErrorPassword(true);
          setTxtPassword('Complete el campo requerido.');
        } else {
          setErrorPassword(false);
          setTxtPassword('');
        }
        break;
      case 'Confirm':
        if (value === '') {
          setErrorConfirmPassword(true);
          setTxtConfirmPassword('Complete el campo requerido.');
        } else {
          if (value !== Password) {
            setErrorConfirmPassword(true);
            setTxtConfirmPassword('Las contraseñas no coinciden.');
          } else {
            setErrorConfirmPassword(false);
            setTxtConfirmPassword('');
          }
        }
        break;
      default:
        break;
    }
  };

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {'Error' | 'Success'} type Tipo de snack a mostrar.
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
   * Método que maneja las acciones al cerrar un snackbar.
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento de cierre en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  /**
   * Método para cambiar la apariencia del botón de restablecimiento.
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
   */
  const handleEnterKeyPress = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      updatePassword();
    }
  };

  /**
   * Método para actualizar la contraseña.
   */
  const updatePassword = async () => {
    if (!ErrorPassword && !ErrorConfirmPassword) {
      try {
        toggleBtn(true, 'Actualizando...');
        const res = await axios.put(`http://${address}:${port}/api/updatePassword`, {
          Email,
          Password
        });

        if (res.data === 'Contraseña actualizada.') {
          showSnack('Success', 'Contraseña actualizada.');
          setSuccess(true);
        } else {
          showSnack('Error', 'No se pudo actualizar la contraseña. Intente de nuevo.');
        }
      } catch (e) {
        console.error(e.data);
        showSnack('Error', 'Error al actualizar la contraseña. Intente de nuevo.');
      }
    } else {
      showSnack('Error', 'Hay campos requeridos no completados correctamente.');
    }
    toggleBtn(false, 'Actualizar');
  };

  if (Redirected) return <Redirect push to='/login' />;

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
              {Success ? <LinearProgress value={SuccessTimeout} variant='determinate' /> : ''}
              <Box p={2}>
                <Box className={classes.alignCenter}>
                  <img width='60%' src='/img/logo.png' alt='Logo de Centros Culturales, BCH' />
                </Box>
                <Box pb={2} px={2}>
                  <Typography align='center' variant='h4'>
                    {IsLoading
                      ? 'Cargando...'
                      : ErrorToken
                      ? 'Token Inválido'
                      : 'Actualización de Contraseña'}
                  </Typography>
                  <Divider />
                </Box>
                {IsLoading ? (
                  <Box p={2}>
                    <LinearProgress />
                  </Box>
                ) : ErrorToken ? (
                  <Box p={2} className={classes.alignCenter}>
                    <Typography variant='body1'>
                      Solicite la actualización de la contraseña de nuevo en la pantalla de inicio
                      de sesión del sistema.
                    </Typography>
                    <Button
                      fullWidth
                      onClick={() => setRedirected(true)}
                      endIcon={<FAI icon={faExternalLinkAlt} />}
                    >
                      Inicio de Sesión
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Box p={2}>
                      <TextField
                        required
                        fullWidth
                        autoFocus
                        value={Password}
                        spellCheck={false}
                        error={ErrorPassword}
                        label='Nueva contraseña'
                        helperText={TxtPassword}
                        onKeyPress={handleEnterKeyPress}
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
                    <Box p={2}>
                      <TextField
                        required
                        fullWidth
                        spellCheck={false}
                        value={ConfirmPassword}
                        error={ErrorConfirmPassword}
                        label='Confirme la contraseña'
                        helperText={TxtConfirmPassword}
                        onKeyPress={handleEnterKeyPress}
                        inputProps={{ maxLength: 50 }}
                        type={!ShowPassword ? 'password' : 'text'}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onBlur={e => handleBlur(e.target.value, 'Confirm')}
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
                    <Box p={2} className={classes.alignCenter}>
                      <Button
                        fullWidth
                        size='large'
                        color='primary'
                        variant='contained'
                        disabled={BtnDisabled}
                        onClick={updatePassword}
                      >
                        {BtnTxt}
                      </Button>
                    </Box>
                  </Box>
                )}
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
            className={clsx({
              [classes.errorSnack]: IsSnackError,
              [classes.successSnack]: !IsSnackError
            })}
            aria-describedby='snackbar'
            message={
              <span className={classes.messageSnack} id='snackbar'>
                <FAI
                  icon={IsSnackError ? faTimesCircle : faCheckCircle}
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

export default ResetPassword;
