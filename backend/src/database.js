const mongoose = require('mongoose');
const config = require('../config');

async function Connect() {
  try {
    await mongoose.connect(config.db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('DB is connected');
  } catch (e) {
    console.error('DB connection error: ', e);
    process.exit(1);
  }
}

Connect();
