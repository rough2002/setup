const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // to configure the configuration file
const app = require('./app');
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

console.log(DB);
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
