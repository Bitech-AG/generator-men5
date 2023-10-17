'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const copyFiles = require('../../common/copyFiles');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("singelton");
    this.option("suppress-check-root");
    this.option("suppress-bind-entity");
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
        message: 'Please enter the name for your new entity'
      },
      {
        type: 'confirm',
        name: 'timestamps',
        message: 'Does the new entity should support change- an create-timestamps?',
        default: 'Y'
      },
      {
        name: 'version',
        message: 'Which version of service should be extend?'
      }
    ];

    const columnPrompts = [{
      name: 'attributeName',
      message: 'Define your Schema - ColumnName?'
    }, {
      name: 'attributeType',
      message: 'Define your Schema - DataType?',
      choices: ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed', 'ObjectId', 'Decimal128', 'Map', 'Schema', 'UUID', 'BigInt']
        .map(name => ({
          name: name,
          value: name
        })),
      default: 'String'
    }, {
      type: 'confirm',
      name: 'repeat',
      message: 'Do you want to add more columns?',
      default: 'Y'
    }];

    const loop = (relevantPrompts) => {
      return this.prompt(relevantPrompts).then(props => {
        const map = obj => ({
          name: obj.attributeName,
          type: obj.attributeType
        });

        if (this.props) {
          this.props.columns.push(map(props));

        } else {
          this.props = props;
          this.props.columns = [map(props)];
          this.props.singleton = this.options.singleton;
        }

        return props.repeat ? loop(columnPrompts) : this.prompt([]);

      })
    }

    return loop([...prompts, ...columnPrompts]);
  }

  writing() {
    const templates = [
      'db.js',
      'index.js'
    ];
    const serviceFolder = `api/odata/v${this.props.version}`;
    const entityFolder = `${serviceFolder}/entities/${this.props.name}`;

    const app = this.destinationPath('api/app.js');
    if (!this.options['suppress-check-root'] && !this.fs.exists(app)) {
      throw new Error(`No api folder found. Are you in root of project? Searched path ${app}`);
    }

    copyFiles(this, entityFolder, templates, []);

    if (!this.options['suppress-bind-entity']) {
      const indexPath = this.destinationPath(`${serviceFolder}/index.js`);
      const serviceIndex = this.fs.read(indexPath);

      this.fs.write(indexPath, `require('./entities/${this.props.name}');${String.fromCharCode(13)}${serviceIndex}`);
    }
  }

};
