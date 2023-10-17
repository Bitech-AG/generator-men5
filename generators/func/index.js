'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const copyFiles = require('../../common/copyFiles');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("suppress-check-root");
    this.option("suppress-bind-function");
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-duper ${chalk.red(
          'men5'
        )} generator!`
      )
    );

    const prompts = [
      {
        name: 'name',
        message: 'Please enter the name for the new function'
      },
      {
        name: 'version',
        message: 'Which version of service should be extend?'
      },
      {
        type: 'input',
        name: 'type',
        message: 'Please input type of function result',
        choices: ['Binary', 'Boolean', 'Byte', 'Date',
          'DateTimeOffset', 'Decimal', 'Double', 'Duration', 'Guid',
          'Int16', 'Int32', 'Int64', 'SByte', 'Single',
          'Stream', 'String', 'TimeOfDay', 'Geography', 'GeographyPoint',
          'GeographyLineString', 'GeographyPolygon', 'GeographyMultiPoint', 'GeographyMultiLineString',
          'GeographyMultiPolygon', 'GeographyCollection', 'Geometry', 'GeometryPoint', 'GeometryLineString',
          'GeometryPolygon', 'GeometryMultiPoint', 'GeometryMultiLineString', 'GeometryMultiPolygon',
          'GeometryCollection']
          .map(name => ({
            name: name,
            value: name
          })),
        default: 'String'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const templates = [
      'index.js'
    ];
    const serviceFolder = `api/odata/v${this.props.version}`;
    const functionFolder = `${serviceFolder}/functions/${this.props.name}`;

    const app = this.destinationPath('api/app.js');
    if (!this.options['suppress-check-root'] && !this.fs.exists(app)) {
      throw new Error(`No api folder found. Are you in root of project? Searched path ${app}`);
    }

    copyFiles(this, functionFolder, templates, []);

    if (!this.options['suppress-bind-function']) {
      const indexPath = this.destinationPath(`${serviceFolder}/index.js`);
      const serviceIndex = this.fs.read(indexPath);

      this.fs.write(indexPath, `require('./functions/${this.props.name}');${String.fromCharCode(13)}${serviceIndex}`);
    }
  }

};
