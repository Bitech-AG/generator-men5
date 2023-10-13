var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//refer all entities, actions and functions for injection in odata service
require('./odata/v<%= version %>/entities/book');

const odata<%= version.replaceAll('.', '_') %> = require('./odata/v<%= version %>');

app.use("/api/v<%= version %>", odata<%= version.replaceAll('.', '_') %>.getRouter());

// Ressource not found error handler
app.use(function (req, res) {
  res.statusMessage = "Resource not found";

  res.status(404).end();
});

const port = process.env.PORT || 8080;

app.set('port', port);

this.server = app.listen(port, () => {
  resolve();
  console.log(`Express server listening on port ${port}`);
});
