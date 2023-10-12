"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-duper ${chalk.red(
          "generator-me-ui-5-n"
        )} generator!`
      )
    );

    const prompts = [
      {
        name: "id",
        message: "Wich id you want to use for the app?",
        default: "me.app"
      },
      {
        name: "title",
        message: "Please enter the title for your project",
        default: "My wonderfull ui5 app"
      },
      {
        name: "description",
        message: "Please describe your project"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.version = "0.1.0";
    });
  }

  writing() {
    const templates = [
      "sky-worker/sw.json",
      "index.dev.html",
      "index.html",
      "manifest.json",
      "package.json",
      "README.md",
      "sw.js",
      "ui5.yaml"
    ];
    const files = ["sky-worker/icon.png", ".gitignore"];

    templates.forEach(template =>
      this._copy(template, this.fs.copyTpl.bind(this.fs))
    );
    files.forEach(file => this._copy(file, this.fs.copy.bind(this.fs)));
  }

  install() {
    this.installDependencies();
  }

  _copy(path, method) {
    method(this.templatePath(path), this.destinationPath(path), this.props);
  }
};
