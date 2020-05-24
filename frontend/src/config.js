export const maxFileSize = 5;
export const address = '35.185.124.104';
export const port = 4000;
export const routes = {
  home: '/',
  login: '/login',
  resetPassword: '/reset/:token'
};
export const tableLocalization = {
  body: {
    emptyDataSourceMessage: 'No hay registros que mostrar',
    addTooltip: 'Agregar',
    deleteTooltip: 'Eliminar',
    editTooltip: 'Editar',
    filterRow: { filterTooltip: 'Filtrar' },
    editRow: {
      deleteText: '¿Está seguro de eliminar este registro?',
      cancelTooltip: 'Cancelar',
      saveTooltip: 'Guardar'
    }
  },
  grouping: {
    placeholder: 'Arrastre encabezados para agruparlos...'
  },
  header: {
    actions: 'Acciones'
  },
  pagination: {
    labelDisplayedRows: '{from}-{to} de {count}',
    labelRowsSelect: 'filas',
    labelRowsPerPage: 'Filas por página',
    firstAriaLabel: 'Primera página',
    firstTooltip: 'Primera página',
    previousAriaLabel: 'Página anterior',
    previousTooltip: 'Página anterior',
    nextAriaLabel: 'Página siguiente',
    nextTooltip: 'Página siguiente',
    lastAriaLabel: 'Última página',
    lastTooltip: 'Última página'
  },
  toolbar: {
    addRemoveColumns: 'Mostrar u ocultar columnas',
    nRowsSelected: '{0} fila(s) seleccionada(s)',
    showColumnsTitle: 'Mostrar columnas',
    showColumnsAriaLabel: 'Mostrar columnas',
    exportTitle: 'Exportar',
    exportAriaLabel: 'Exportar',
    searchTooltip: 'Buscar',
    searchPlaceholder: 'Buscar...'
  }
};
