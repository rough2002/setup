const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query).filter();
    // all methods can be chained sort,paginate,limitingFields
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
// exports.getTour = async (req, res) => {
//   //const tour = tours.find((el) => el.id === id);

//   res.status(200).json({
//     status: 'success',
//     // result: tours.length,
//     // data: {
//     //   tour,
//     // },
//   });
// };
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
/*
exports.createTour = (req, res) => {
  //console.log(req.body);
  //const newId = tours[tours.length - 1].id + 1;
  //const newTour = Object.assign({ id: newId }, req.body);
  //tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(200).json({ status: 'success', data: newTour });
  //   }
  // );

};
*/
exports.createTour = async (req, res) => {
  try {
    ////////////////////////////////////
    //     1st method to create tour
    // const newTour = new Tour({});
    // newTour.save()

    ////////////////////////////////////
    //     2nd method to create tour
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.getTourStats = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
