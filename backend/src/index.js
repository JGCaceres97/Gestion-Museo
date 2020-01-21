require('dotenv').config();
const app = require('./app');
const { port } = require('../config');
require('./database');

function main() {
  try {
    app.listen(port);
    console.log('Server on port', port);
  } catch (e) {
    console.error(e);
  }
}

main();
