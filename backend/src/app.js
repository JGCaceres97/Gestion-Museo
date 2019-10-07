const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', 4000);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use(require('./routes/auth'));
app.use(require('./routes/libros'));
app.use(require('./routes/solicitudes'));

module.exports = app;
