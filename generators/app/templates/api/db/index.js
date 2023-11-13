
//refer all db models
require('./book');

const server = require('../odata/v0.0.0/service');
const mongoose = require('mongoose');
const error = require('@bitech-ag/nota/lib/mongo/middlewares/error');

server.error = error.default;
server.addBefore(async (req, res, next) => {
  try {
    const mongoDB = await mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/<%= id.replaceAll('.', '_') %>');

    req.$odata = {
      mongo: mongoDB.connection.models,
      ...req.$odata
    };
    
  } catch(err) {
    console.error(err.message);
    console.error('Failed to connect to database on startup.');
  }

  next();

});