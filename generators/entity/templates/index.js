const Model = require('../../../db/<%= name %>');
const service = require('../../service');
const entity = service.mongo<%= singleton ? 'Singleton' : 'Entity' %>('<%= name %>', Model);

<%_ if (client) { _%>
entity.clientField = '<%= client %>';
<%_ } _%>

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
