// @ts-check
import { faAt, faKey, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, Divider, Grid, IconButton, InputAdornment, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(5)
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

  /**
   * Método  que maneja las acciones cuando se pierde el foco en un componente.
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
   * Método para manejar el ingreso al sistema.
   */
  const handleSubmit = () => {
    alert('Signed In');
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container>
          <Grid container spacing={2} alignContent='center'>
            <Grid item xs={12}>
              <Typography align='center' variant='h4'>
                Inicio de Sesión
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                value={Email}
                error={ErrorEmail}
                helperText={TxtEmail}
                label='Correo electrónico'
                inputProps={{ maxlength: 100 }}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={Password}
                label='Contraseña'
                error={ErrorPassword}
                inputProps={{ maxlength: 50 }}
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
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Box py={2}>
                <Button
                  size='large'
                  color='primary'
                  variant='contained'
                  onClick={handleSubmit}
                  endIcon={<FAI icon={faSignInAlt} />}
                >
                  Iniciar Sesión
                  </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </React.Fragment>
  );
}

export default Login;
