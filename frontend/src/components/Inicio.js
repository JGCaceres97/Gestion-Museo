// @ts-check
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyle = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    filter: 'grayscale(20%)',
    backgroundPosition: 'bottom',
    backgroundImage: 'url(/img/books.jpg)'
  },
  grid: {
    width: '100%'
  },
  box: {
    textAlign: 'center',
    paddingTop: '10%',
    paddingLeft: '20%',
    paddingRight: '20%'
  },
  text: {
    color: 'white'
  },
  leyend: {
    textAlign: 'justify',
    fontSize: '1.2em'
  }
}));

/**
 * Página inicial del sistema.
 */
function Inicio() {
  // @ts-ignore
  const classes = useStyle();

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Grid container justify='center' direction='column' alignItems='center'>
          <Grid item xs={12} className={classes.grid}>
            <Box className={classes.box}>
              <Typography variant='h4' className={classes.text}>
                Misión del <b>Banco Central de Honduras</b>
              </Typography>
              <Typography variant='body1' className={clsx(classes.text, classes.leyend)}>
                En el Banco Central de Honduras somos responsables de velar por el mantenimiento del
                valor interno y externo de la moneda nacional, el buen funcionamiento del sistema de
                pagos y propiciar la estabilidad del sistema financiero del país.
              </Typography>
            </Box>
            <Box className={classes.box}>
              <Typography variant='h4' className={classes.text}>
                Visión del <b>Banco Central de Honduras</b>
              </Typography>
              <Typography variant='body1' className={clsx(classes.text, classes.leyend)}>
                Ser reconocida como una institución líder que ejerce con autonomía y calidad
                profesional sus funciones, contribuyendo a la estabilidad de precios, lo que
                coadyuvará al crecimiento económico sostenido.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Inicio;
