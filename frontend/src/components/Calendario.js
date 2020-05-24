// @ts-check
import esUsLocale from '@fullcalendar/core/locales/es-us';
import DayGridPlugin from '@fullcalendar/daygrid';
import InteractionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import {
  AppBar,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { address, port } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';
import '../styles/Calendario.scss';
import Snack from '../utils/Snack';
import CrearSolicitud from './CrearSolicitud';
import InfoSolicitud from './InfoSolicitud';

moment.locale('es-us');

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 1),
    height: '100.8%',
    margin: theme.spacing(1)
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  noSpace: {
    height: '100%'
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />;
});

/**
 * Calendario de reservaciones a los Centros Culturales.
 */
function Calendario() {
  // @ts-ignore
  const classes = useStyles();

  const [Eventos, setEventos] = useState([]);
  const [Token] = useLocalStorage('Token', '');
  const [DateClicked, setDateClicked] = useState(moment());
  const [IDClicked, setIDClicked] = useState('');

  const [Reload, setReload] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [IsSnackError, setIsSnackError] = useState(false);
  const [IsSnackInfo, setIsSnackInfo] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [ShowDialog, setShowDialog] = useState(false);
  const [DialogHeader, setDialogHeader] = useState('');

  useEffect(() => {
    document.title = 'Calendario de Reservaciones';
  });

  useEffect(() => {
    setSnackOpen(false);
    const getSolicitudes = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/solicitudes`, {
          headers: {
            authorization: Token
          }
        });

        setEventos(
          res.data.map(ev => {
            const estado = ev.IDEstado.Nombre;
            const color =
              estado === 'Aprobada' ? '#008000' : estado === 'En proceso' ? 'khaki' : 'crimson';
            const textColor = estado === 'En proceso' ? 'black' : 'white';

            return {
              id: ev._id,
              title: ev.Institucion,
              start: new Date(ev.FechaVisita),
              color,
              textColor
            };
          })
        );
        showSnack('Info', 'Calendario actualizado.');
      } catch {
        showSnack('Error', 'Error obteniendo las solicitudes.');
      }
    };

    getSolicitudes();
  }, [Token, Reload]);

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
  };

  /**
   * Método que maneja las acciones al dar clic en una día.
   * @param {{ date: Date }} info Información del día clicado.
   */
  const dateClicked = info => {
    const date = moment(info.date);
    if (date.isSameOrBefore(moment())) {
      showSnack('Info', 'Fecha de nueva solicitud inválida.');
    } else {
      setDateClicked(date);
      nuevoEvento(`Ingresar Solicitud - ${date.format('D [de] MMMM [del] YYYY')}`);
    }
  };

  /**
   * Método que maneja las acciones al dar clic en un evento.
   * @param {{ event: { id: string } }} info Información del evento clicado.
   */
  const eventClicked = info => {
    setSnackOpen(false);
    setDialogHeader('Información de Solicitud');
    setIDClicked(info.event.id);
    setShowDialog(true);
  };

  /**
   * Método para agregar eventos al calendario.
   * @param {string} txt Texto a mostrar en el encabezado.
   */
  const nuevoEvento = txt => {
    setSnackOpen(false);
    setDialogHeader(txt);
    setShowDialog(true);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container className={classes.noSpace}>
          <Grid container className={classes.noSpace}>
            <Grid item xs={12} className='calendario'>
              <FullCalendar
                header={{
                  right: 'Nuevo, Recargar, today, prev,next'
                }}
                buttonText={{
                  today: 'Hoy'
                }}
                customButtons={{
                  Recargar: {
                    text: 'Recargar',
                    click: () => setReload(!Reload)
                  },
                  Nuevo: {
                    text: 'Nuevo',
                    click: () => nuevoEvento('Ingresar Solicitud')
                  }
                }}
                height='parent'
                plugins={[DayGridPlugin, InteractionPlugin]}
                defaultView='dayGridMonth'
                showNonCurrentDates={false}
                fixedWeekCount={false}
                weekends={false}
                columnHeaderFormat={{
                  weekday: 'long'
                }}
                minTime='08:00:00'
                maxTime='16:00:00'
                dateClick={dateClicked}
                events={Eventos}
                eventTimeFormat={{
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short',
                  omitZeroMinute: false,
                  hour12: true
                }}
                displayEventTime={true}
                eventClick={eventClicked}
                eventMouseEnter={info => {
                  info.el.style.cursor = 'pointer';
                }}
                editable={false}
                eventStartEditable={false}
                eventDurationEditable={false}
                eventOverlap={false}
                eventLimit={true}
                eventLimitText='eventos'
                locale={esUsLocale}
                firstDay={1}
                timeZone='local'
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Dialog
        fullScreen
        open={ShowDialog}
        onClose={() => setShowDialog(false)}
        // @ts-ignore
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='close'
              onClick={() => setShowDialog(false)}
            >
              <Close />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {DialogHeader}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {DialogHeader.includes('-') ? (
            <CrearSolicitud Fecha={DateClicked} />
          ) : DialogHeader.includes('Ingresar') ? (
            <CrearSolicitud />
          ) : (
            <InfoSolicitud _id={IDClicked} />
          )}
        </DialogContent>
      </Dialog>
      <Snack
        show={SnackOpen}
        texto={SnackTxt}
        isInfo={IsSnackInfo}
        setShow={setSnackOpen}
        isError={IsSnackError}
      />
    </React.Fragment>
  );
}

export default Calendario;
