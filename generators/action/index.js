'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const copyFiles = require('../../common/copyFiles');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("singelton");
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-duper ${chalk.red(
          'generator-men-5'
        )} generator!`
      )
    );

    const prompts = [
      {
        name: 'name',
        message: 'Please enter the name for the new action'
      },
      {
        name: 'version',
        message: 'Which version of service should be extend?'
      }, 
      {
        type: 'confirm',
        name: 'repeat',
        message: 'Does the action should have parameters?',
        default: 'N'
      }
    ];

    const parameterPrompts = [{
      name: 'parameterName',
      message: 'Define your Schema - ParameterName?'
    }, {
      name: 'parameterType',
      message: 'Define your Schema - DataType?',
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
    }, {
      type: 'confirm',
      name: 'repeat',
      message: 'Do you want to add more parameters?',
      default: 'Y'
    }];

    const loop = (relevantPrompts) => {
      return this.prompt(relevantPrompts).then(props => {
        const map = obj => ({
          name: obj.parameterName,
          type: obj.parameterType
        });

        if (this.props) {
          this.props.parameters.push(map(props));

        } else {
          this.props = props;
          this.props.parameters = [];
        }

        return props.repeat ? loop(parameterPrompts) : this.prompt([]);

      })
    }

    return loop([...prompts, ...parameterPrompts]);
  }

  writing() {
    const templates = [
      'index.js'
    ];
    const serviceFolder = `api/odata/v${this.props.version}`;
    const actionFolder = `${serviceFolder}/actions/${this.props.name}`;

    const app = this.destinationPath('api/app.js');
    if (!this.fs.exists(app)) {
      throw new Error(`No api folder found. Are you in root of project? Searched path ${app}`);
    }

    copyFiles(this, actionFolder, templates, []);

    const indexPath = this.destinationPath(`${serviceFolder}/index.js`);
    const serviceIndex = this.fs.read(indexPath);

    this.fs.write(indexPath, `require('./actions/${this.props.name}');${String.fromCharCode(13)}${serviceIndex}`);
  }

};
