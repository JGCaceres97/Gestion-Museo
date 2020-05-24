// @ts-check
import {
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { IconButton, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
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
 * Función para mostrar Snack de notificaciones.
 * @param {Object} props Props que recibe de otro componente.
 * @param {boolean} props.show Controla si se muestra el Snack.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShow Función para actualizar el estado que controla si se muestra el Snack.
 * @param {string} props.texto Texto a mostrar en el Snack.
 * @param {boolean} props.isError Determina si el Snack es de un error.
 * @param {boolean} [props.isInfo] Determina si el Snack es para un mensaje informativo.
 */
function Snack({ show, setShow, texto, isError, isInfo = false }) {
  // @ts-ignore
  const classes = useStyles();

  /**
   * Método que maneja las acciones al cerrar un snackbar.
   * @param {React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent<Event>} e Evento del cierre en cuestión.
   * @param {string} [reason] Razón de cierre del snackbar.
   */
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setShow(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={show}
      autoHideDuration={5000}
      onClose={handleSnackClose}
    >
      <SnackbarContent
        className={clsx({
          [classes.errorSnack]: isError,
          [classes.infoSnack]: isInfo,
          [classes.successSnack]: !isError && !isInfo
        })}
        aria-describedby='snackbar'
        message={
          <span className={classes.messageSnack} id='snackbar'>
            <FAI
              className={classes.iconSnack}
              icon={isError ? faTimesCircle : isInfo ? faExclamationCircle : faCheckCircle}
            />
            {texto}
          </span>
        }
        action={[
          <IconButton key='close' aria-label='close' color='inherit' onClick={handleSnackClose}>
            <Close className={classes.iconClose} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}

export default Snack;
