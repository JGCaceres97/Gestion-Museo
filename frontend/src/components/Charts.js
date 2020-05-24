// @ts-check
import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { address, port } from '../config';
import useLocalStorage from '../customHooks/useLocalStorage';
import Snack from '../utils/Snack';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    overflowY: 'hidden',
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  height100: {
    height: '100%'
  }
}));

/**
 * Método para mostrar un gráfico del reporte de charlas académicas.
 */
function ReporteCharlas() {
  // @ts-ignore
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [Loaded, setLoaded] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    document.title = 'Reporte de Charlas Académicas';
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/solicitudes`, {
          headers: {
            authorization: Token
          }
        });

        let yes = 0;
        let no = 0;

        res.data.forEach(item => {
          if (item.Charla) {
            yes++;
          } else {
            no++;
          }
        });

        setData([
          ['Charla', 'Cantidad'],
          ['Sí', yes],
          ['No', no]
        ]);
        setLoaded(true);
        showSnack('Info', 'Información de reporte cargada.');
      } catch {
        showSnack('Error', 'Error obteniendo la información.');
      }
    };

    getData();
  }, [Token]);

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {'Info' | 'Error'} type Tipo de snack a mostrar.
   * @param {string} txt Texto a mostrar en el snack.
   */
  const showSnack = (type, txt) => {
    switch (type) {
      case 'Error':
        setIsSnackError(true);
        break;
      default:
        setIsSnackError(false);
        break;
    }
    setSnackTxt(txt);
    setSnackOpen(true);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container className={classes.height100}>
          <Grid item xs={12}>
            <Typography align='center' variant='h4'>
              Reporte de Solicitudes con Charla Académica
            </Typography>
          </Grid>
          {Loaded && (
            <Grid container spacing={2} className={classes.height100}>
              <Grid item xs={12} className={classes.height100}>
                <Chart
                  data={data}
                  width='100%'
                  height='100%'
                  chartType='PieChart'
                  loader={<div>Cargando gráfico...</div>}
                  options={{
                    fontName: 'Roboto',
                    chartArea: {
                      top: '10%',
                      width: '100%'
                    },
                    tooltip: {
                      showColorCode: true
                    },
                    legend: {
                      position: 'bottom',
                      alignment: 'center'
                    },
                    slices: [
                      {
                        color: '#2BB673'
                      },
                      {
                        color: '#d91e48'
                      },
                      {
                        color: '#007fad'
                      },
                      {
                        color: '#e9a227'
                      }
                    ]
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Container>
      </Paper>
      <Snack show={SnackOpen} texto={SnackTxt} setShow={setSnackOpen} isError={IsSnackError} />
    </React.Fragment>
  );
}

/**
 * Método para mostrar un gráfico del reporte de los horarios más frecuentados.
 */
function ReporteHorarios() {
  // @ts-ignore
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [Loaded, setLoaded] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    document.title = 'Reporte de Horarios';
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/solicitudes`, {
          headers: {
            authorization: Token
          }
        });

        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let one = 0;
        let two = 0;
        let three = 0;

        res.data.forEach(item => {
          switch (item.IDHorario.Hora) {
            case '9:00 AM':
              nine++;
              break;
            case '10:00 AM':
              ten++;
              break;
            case '11:00 AM':
              eleven++;
              break;
            case '1:00 PM':
              one++;
              break;
            case '2:00 PM':
              two++;
              break;
            case '3:00 PM':
              three++;
              break;
            default:
              break;
          }
        });

        setData([
          ['Hora', 'Cantidad'],
          ['9:00 AM', nine],
          ['10:00 AM', ten],
          ['11:00 AM', eleven],
          ['1:00 PM', one],
          ['2:00 PM', two],
          ['3:00 PM', three]
        ]);
        setLoaded(true);
        showSnack('Info', 'Información de reporte cargada.');
      } catch {
        showSnack('Error', 'Error obteniendo la información.');
      }
    };

    getData();
  }, [Token]);

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {'Info' | 'Error'} type Tipo de snack a mostrar.
   * @param {string} txt Texto a mostrar en el snack.
   */
  const showSnack = (type, txt) => {
    switch (type) {
      case 'Error':
        setIsSnackError(true);
        break;
      default:
        setIsSnackError(false);
        break;
    }
    setSnackTxt(txt);
    setSnackOpen(true);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container className={classes.height100}>
          <Grid item xs={12}>
            <Typography align='center' variant='h4'>
              Reporte de Horarios Más Visitados
            </Typography>
          </Grid>
          {Loaded && (
            <Grid container spacing={2} className={classes.height100}>
              <Grid item xs={12} className={classes.height100}>
                <Chart
                  data={data}
                  width='100%'
                  height='100%'
                  chartType='PieChart'
                  loader={<div>Cargando gráfico...</div>}
                  options={{
                    pieHole: 0.5,
                    fontName: 'Roboto',
                    chartArea: {
                      top: '10%',
                      width: '100%'
                    },
                    tooltip: {
                      showColorCode: true
                    },
                    legend: {
                      position: 'bottom',
                      alignment: 'center'
                    },
                    slices: [
                      {
                        color: '#2BB673'
                      },
                      {
                        color: '#d91e48'
                      },
                      {
                        color: '#007fad'
                      },
                      {
                        color: '#e9a227'
                      },
                      {
                        color: '#a2a2a2'
                      },
                      {
                        color: '#b4ffda'
                      }
                    ]
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Container>
      </Paper>
      <Snack show={SnackOpen} texto={SnackTxt} setShow={setSnackOpen} isError={IsSnackError} />
    </React.Fragment>
  );
}

/**
 * Método para mostrar un gráfico del reporte de los temas más solicitados.
 */
function ReporteTemas() {
  // @ts-ignore
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [Loaded, setLoaded] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);
  const [SnackTxt, setSnackTxt] = useState('');
  const [IsSnackError, setIsSnackError] = useState(false);
  const [Token] = useLocalStorage('Token', '');

  useEffect(() => {
    document.title = 'Reporte de Temas';
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://${address}:${port}/api/solicitudes`, {
          headers: {
            authorization: Token
          }
        });

        let econo = 0;
        let sdp = 0;
        let emyte = 0;
        let otro = 0;

        res.data.forEach(item => {
          if (item.Charla) {
            switch (item.TemaCharla) {
              case 'Economía':
                econo++;
                break;
              case 'Sistema de Pagos':
                sdp++;
                break;
              case 'Emisión y Tesorería':
                emyte++;
                break;
              default:
                otro++;
                break;
            }
          }
        });

        setData([
          ['Tema', 'Cantidad'],
          ['Economía', econo],
          ['Sistema de Pagos', sdp],
          ['Emisión y Tesorería', emyte],
          ['Otro', otro]
        ]);
        setLoaded(true);
        showSnack('Info', 'Información de reporte cargada.');
      } catch {
        showSnack('Error', 'Error obteniendo la información.');
      }
    };

    getData();
  }, [Token]);

  /**
   * Método para mostrar los snack con un mensaje personalizado.
   * @param {'Info' | 'Error'} type Tipo de snack a mostrar.
   * @param {string} txt Texto a mostrar en el snack.
   */
  const showSnack = (type, txt) => {
    switch (type) {
      case 'Error':
        setIsSnackError(true);
        break;
      default:
        setIsSnackError(false);
        break;
    }
    setSnackTxt(txt);
    setSnackOpen(true);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container className={classes.height100}>
          <Grid item xs={12}>
            <Typography align='center' variant='h4'>
              Reporte de Temas Más Solicitados
            </Typography>
          </Grid>
          {Loaded && (
            <Grid container spacing={2} className={classes.height100}>
              <Grid item xs={12} className={classes.height100}>
                <Chart
                  data={data}
                  width='100%'
                  height='100%'
                  chartType='PieChart'
                  loader={<div>Cargando gráfico...</div>}
                  options={{
                    is3D: true,
                    fontName: 'Roboto',
                    chartArea: {
                      top: '10%',
                      width: '100%'
                    },
                    tooltip: {
                      showColorCode: true
                    },
                    legend: {
                      position: 'bottom',
                      alignment: 'center'
                    },
                    slices: [
                      {
                        color: '#2BB673'
                      },
                      {
                        color: '#d91e48'
                      },
                      {
                        color: '#007fad'
                      },
                      {
                        color: '#e9a227'
                      }
                    ]
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Container>
      </Paper>
      <Snack show={SnackOpen} texto={SnackTxt} setShow={setSnackOpen} isError={IsSnackError} />
    </React.Fragment>
  );
}

export { ReporteCharlas, ReporteHorarios, ReporteTemas };
