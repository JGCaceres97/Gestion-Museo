const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
} catch (e) {
  console.error('You have to set the MONGODB_URI environment variable.');
  process.exit(1);
}

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('DB is connected');
});
