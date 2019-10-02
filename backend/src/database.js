const mongoose = require('mongoose');

const URI = 'mongodb://mongo:27017/CentrosCulturales';

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('DB is connected');
});
