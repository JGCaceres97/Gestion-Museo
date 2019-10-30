require('dotenv').config();
const app = require('./app');
require('./database');

async function main() {
  try {
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
  } catch (e) {
    console.error(e);
  }
}

main();
