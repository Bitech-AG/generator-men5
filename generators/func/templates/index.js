const service = require('../../service');

service.function('<%= name %>', (req, res, next) => {
  try {
  // See for parsed parameters in req.$odata
  // Database instance is in req.$odata.mongo
  // Set your result res.$odata.result and the http status in res.$odata.status

    next();

  } catch(err) {
    next(err);
  }
}, { 
  $ReturnType: {
    $Type: '<%- type.indexOf(`node.odata`) < 0 ? `Edm.${type}` : type %>'
  }
});
