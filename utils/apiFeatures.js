class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'limit', 'sort', 'fields'];
    excludeFields.forEach((ele) => {
      delete queryObj[ele];
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitingFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replaceAll(',', ' ');
      console.log(fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // minus sign to exclude fields
    }
    return this;
  }
  paginate() {
    const page = this.reqString.page * 1 || 1; // setting default page
    const limit = this.reqString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page = 3 & limit = 10 , 1-10 , page 1 , 11-20 , page-2, 21-30 , page-3
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
