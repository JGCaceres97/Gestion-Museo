// @ts-check
import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(3, 2)
  },
  height100: {
    height: '100%'
  },
  height95: {
    height: '95%'
  }
}));

/**
 * Método para mostrar el manual de usuario embebido.
 */
function Manual() {
  // @ts-ignore
  const classes = useStyles();
  const pdfDir = `/Manual.pdf`;

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Container className={classes.height95}>
          <Grid item xs={12}>
            <Typography align='center' variant='h4'>
              Manual de Usuario
            </Typography>
          </Grid>
          <Grid container spacing={2} className={classes.height100}>
            <Grid item xs={12} className={classes.height100}>
              <embed src={pdfDir} type='application/pdf' height='100%' width='100%' />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </React.Fragment>
  );
}

export default Manual;
