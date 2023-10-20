const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
dotenv.config({ path: './config.env' }); // to configure the configuration file
console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
(async function dbConnection() {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('DB connected successfully');
})();

/////////////////////////////////////////
//   READ  JSON  FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

/////////////////////////////////////////
//    IMPORT  DATA  INTO  DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

////////////////////////////////////
//  DELETE DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Delete Data Successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
