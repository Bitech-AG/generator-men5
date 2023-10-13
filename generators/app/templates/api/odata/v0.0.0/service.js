const odata = require('@r1mar/nota');
const server = odata();

// database
const connection = require('./db');
const error = require('@r1mar/nota/lib/mongo/middlewares/error');

server.error = error.default;
server.addBefore(async (req, res, next) => {
  req.$odata = {
    mongo: (await connection()).connection.models,
    ...req.$odata
  };
  next();
});

module.exports = server;