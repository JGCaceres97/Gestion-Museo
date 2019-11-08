// @ts-check
import { faAt, faKey, faSignInAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, Divider, Grid, IconButton, InputAdornment, makeStyles, Paper, Snackbar, SnackbarContent, TextField, Typography } from '@material-ui/core';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react';
import useLocalStorage from '../customHooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  },
  grid: {
    width: '100%'
  },
  button: {
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

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [ErrorEmail, setErrorEmail] = useState(false);
  const [TxtEmail, setTxtEmail] = useState('');
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [TxtPassword, setTxtPassword] = useState('');

  const [ShowPassword, setShowPassword] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [Token, setToken] = useLocalStorage('Token', '');

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
          setTxtEmail('Por favor complete el campo requerido con el formato "ejem.plo@ejemplo.com".');
        } else {
          setErrorEmail(false);
          setTxtEmail('');
        }
        break;
      default:
        break;
    }
  }

  /**
   * Método que maneja las acciones al cerrar un snackbar.
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  }

  /**
   * Método para manejar el ingreso al sistema.
   */
  const handleSubmit = async () => {
    Password === '' ? setErrorPassword(true) : setErrorPassword(false);
    if (!ErrorEmail && !ErrorPassword) {
      try {
        const res = await axios.post('http://localhost:4000/api/auth/ingresar', {
          Email,
          Password
        });

        setToken(res.headers.auth);
      } catch (e) {
        console.error(e);
      }
    } else {
      setSnackOpen(true);
      setSnackTxt('Complete los campos requeridos.');
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Grid
          container
          spacing={2}
          justify='center'
          direction='column'
          alignItems='center'
          style={{ minHeight: '95vh' }}
        >
          <Grid item xs={12} sm={10} md={4} xl={3} className={classes.grid}>
            <Paper className={classes.paper}>
              <Box p={2}>
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
                  value={Email}
                  error={ErrorEmail}
                  helperText={TxtEmail}
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
                  inputProps={{ maxLength: 50 }}
                  type={!ShowPassword ? 'password' : 'text'}
                  helperText={TxtPassword}
                  onChange={e => setPassword(e.target.value)}
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
              <Box p={2} className={classes.button}>
                <Button
                  fullWidth
                  size='large'
                  color='primary'
                  variant='contained'
                  onClick={handleSubmit}
                  endIcon={<FAI icon={faSignInAlt} />}
                >
                  Iniciar Sesión
                  </Button>
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
