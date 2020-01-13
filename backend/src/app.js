const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/public', express.static('public'));

// Routes
app.use(require('./routes/auth'));
app.use(require('./routes/backup'));
app.use(require('./routes/bitacora'));
app.use(require('./routes/departamentos'));
app.use(require('./routes/estados'));
app.use(require('./routes/etiquetas'));
app.use(require('./routes/horarios'));
app.use(require('./routes/libros'));
app.use(require('./routes/municipios'));
app.use(require('./routes/roles'));
app.use(require('./routes/solicitudes'));
app.use(require('./routes/usuarios'));

module.exports = app;
