const odata = require('@bitech-ag/nota');
const server = odata();

// database
const connection = require('./db');
const error = require('@bitech-ag/nota/lib/mongo/middlewares/error');

server.error = error.default;
server.addBefore(async (req, res, next) => {
  req.$odata = {
    mongo: (await connection()).connection.models,
    ...req.$odata
  };
  next();
});

module.exports = server;