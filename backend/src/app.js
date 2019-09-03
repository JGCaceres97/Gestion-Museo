const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/libros', require('./routes/libros'));

module.exports = app;
