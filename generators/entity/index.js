'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-duper ${chalk.red(
          'generator-me-ui-5-n'
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
      choices: 'String|Number|Date|Buffer|Boolean|Mixed|ObjectId|Decimal128|Map|Schema|UUID|BigInt',
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
    const serviceFolder = `api/odata/v${this.version}`;

    this.entityFolder = `${serviceFolder}/entities/${this.props.name}`;

    if (!this.fs.exists(this.destinationPath('api'))) {
      throw new Error('No api folder found. Are you in root of project?');
    }

    templates.forEach(template =>
      this._copy(template, this.fs.copyTpl.bind(this.fs))
    );

    const indexPath = this.destinationPath(`${this.serviceFolder}/index.js`);
    const serviceIndex = this.fs.read(indexPath);

    this.fs.write(indexPath, `require('./entities/${this.name}');${String.fromCharCode(13)}${serviceIndex}`);
  }

  _copy(path, method) {
    method(
      this.templatePath(path),
      this.destinationPath(`${this.entityFolder}/${path}`),
      this.props
    );
  }
};
