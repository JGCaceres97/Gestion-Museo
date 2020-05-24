// @ts-check
import MomentUtils from '@date-io/moment';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';
import LayoutMantenimiento from '../layouts/Mantenimiento';

function Autores() {
  return (
    <LayoutMantenimiento
      added='Autor ingresado.'
      apiUrl='api/autores'
      component='Autores'
      dataLoaded='Autores cargados.'
      dataNotLoaded='Error obteniendo los autores.'
      deleted='Autor dado de baja.'
      notAdded='Error ingresando el autor.'
      notDeleted='Error dando de baja el autor.'
      notUpdated='Error actualizando el autor.'
      updated='Autor actualizado.'
      titulo='Autores'
      columnas={[
        {
          title: 'ID',
          field: '_id',
          editable: 'never',
          hidden: true,
          emptyValue: 'N/A'
        },
        {
          title: 'Nombre',
          field: 'Nombre',
          emptyValue: 'N/A',
          defaultSort: 'asc',
          editComponent: props => (
            <TextField
              placeholder='Nombre'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 50, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        },
        {
          title: 'Nacionalidad',
          field: 'Nacionalidad',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              placeholder='Nacionalidad'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 30, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        },
        {
          title: 'Generos literarios',
          field: 'GenerosLiterarios',
          emptyValue: 'N/A',
          editComponent: props => (
            <TextField
              placeholder='Generos literarios'
              value={props.value || ''}
              onChange={e => props.onChange(e.target.value)}
              inputProps={{ maxLength: 100, minLength: 1, style: { fontSize: 13 } }}
            />
          )
        },
        {
          title: 'Fecha de nacimiento',
          field: 'FechaNacimiento',
          emptyValue: 'N/A',
          editable: 'always',
          type: 'date',
          render: rowData => (rowData ? moment(rowData.FechaNacimiento).format('DD/MM/YYYY') : ''),
          editComponent: props => (
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                autoOk
                required
                fullWidth
                disableFuture
                disableToolbar
                variant='inline'
                format='DD/MM/YYYY'
                maxDate={moment().subtract(18, 'year')}
                inputProps={{ style: { fontSize: 13 } }}
                onChange={date => props.onChange(date.toDate())}
                value={props.value || moment().subtract(18, 'years')}
                maxDateMessage='La fecha no puede ser de alguien menor a 18 años.'
              />
            </MuiPickersUtilsProvider>
          )
        }
      ]}
    />
  );
}

export default Autores;
