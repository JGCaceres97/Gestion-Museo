const mongoose = require('mongoose');
const createAdmin = require('./middlewares/adminUser');
const { adminPassword, db } = require('../config');

async function Connect() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    await createAdmin(adminPassword);

    console.log('DB is connected');
  } catch (e) {
    console.error('DB connection error: ', e);
    process.exit(1);
  }
}

Connect();
