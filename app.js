const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// 1.  MIDDLE WARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
// app.get('/', (req, res) => {
//   res
//     .status(404)
//     .json({ message: 'hello from the server side', app: 'natours' });
// });
// app.post('/', (req, res) => {
//   res.send('you can post to this url');
// });

//  Mounting the routers

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

// Tour routes

module.exports = app;
