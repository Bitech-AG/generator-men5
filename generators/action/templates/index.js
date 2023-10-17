const service = require('../../service');
const action = service.action('<%= name %>', (req, res, next) => {
  try {
  // See for parsed parameters in req.$odata
  // Database instance is in req.$odata.mongo
  // Set your result res.$odata.result and the http status in res.$odata.status

  next();

} catch(err) {
  next(err);
}
}, { 
  $Parameter: [ <%- parameters.reduce((previous, next) => {
      const formatType = type => {
        return type.indexOf('node.odata') < 0 ? `Edm.${type}` : type; 
      };
      const i2 = `${String.fromCharCode(13, 9, 9)}`;
      const i3 = `${i2}${String.fromCharCode(9)}`;
      const parameterName = `${i3}$Name: '${next.name}',`;
      const parameterType = `${i3}$Type: '${formatType(next.type)}'`;
      const parameterObject = `${i2}{${parameterName}${parameterType}${i2}}`;
  
      return previous ? `${previous},${parameterObject}` : parameterObject;
    }, '') %>
  ]
});

action.addBefore((req, res, next) => {
  try {

  // See for parsed parameters in req.$odata
  // Database instance is in req.$odata.mongo

    next();

  } catch(err) {
    next(err);
  }
});


action.addAfter((req, res, next) => {
  try {

  // See for parsed parameters in req.$odata
  // See for response data in res.$odata

    next();

  } catch(err) {
    next(err);
  }
});
