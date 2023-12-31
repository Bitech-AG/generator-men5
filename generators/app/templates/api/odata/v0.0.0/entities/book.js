const Model = require('../../../db/book');
const service = require('../service');
const entity = service.mongoEntity('book', Model);

entity.addBefore((req, res, next) => {
  try {

  // See for parsed parameters in req.$odata
  // Database instance is in req.$odata.mongo

    next();

  } catch(err) {
    next(err);
  }
});


entity.addAfter((req, res, next) => {
  try {

  // See for parsed parameters in req.$odata
  // See for response data in res.$odata

    next();

  } catch(err) {
    next(err);
  }
});
