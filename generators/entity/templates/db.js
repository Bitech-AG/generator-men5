const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const data = {
  <%= columns.reduce((previous, next) => {
    const formatType = type => {
      const specialTypes = ['Mixed', 'ObjectId', 'Decimal128', 'UUID'];
      
      return specialTypes.indexOf(type) >= 0 ? `Schema.Types.${type}` : type; 
    };
    const newLine = `${next.name}: ${formatType(next.type)}`;

    return previous ? `${previous},${String.fromCharCode(13)}${newLine}` : newLine;
  }, '') %>
};

const ModelSchema = new Schema(data,{}
  {
    timestamps: <%= timestamps === 'Y' ? true : false %>,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

module.exports = mongoose.model(<%= name %>, ModelSchema);