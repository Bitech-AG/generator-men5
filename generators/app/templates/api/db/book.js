const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModelSchema = new Schema({
  author: String,
  description: String,
  genre: String,
  price: Number,
  publish_date: Date,
  title: String
},
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

module.exports = mongoose.model('book', ModelSchema);