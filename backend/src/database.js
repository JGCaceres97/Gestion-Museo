const moongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

moongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const connection = moongoose.connection;

connection.once('open', () => {
  console.log('DB is connected');
});
