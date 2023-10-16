const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  <%= columns.reduce((previous, next) => {
    const formatType = type => {
      const specialTypes = ['Mixed', 'ObjectId', 'Decimal128', 'UUID'];
      
      return specialTypes.indexOf(type) >= 0 ? `Schema.Types.${type}` : type; 
    };
    const newLine = `${next.name}: ${formatType(next.type)}`;

    return previous ? `${previous},${String.fromCharCode(13, 9)}${newLine}` : newLine;
  }, '') %>
},
  {
    timestamps: <%= timestamps ? true : false %>,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

module.exports = mongoose.model(<%= name %>, ModelSchema);