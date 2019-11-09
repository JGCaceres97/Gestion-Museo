require('dotenv').config();
const app = require('./app');
const config = require('../config');
require('./database');

async function main() {
  try {
    await app.listen(config.port);
    console.log('Server on port', config.port);
  } catch (e) {
    console.error(e);
  }
}

main();
