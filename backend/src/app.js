const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/solicitud', require('./routes/solicitud'));
app.use('/api/inventario', require('./routes/inventario'));

module.exports = app;
