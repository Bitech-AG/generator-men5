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
      },
      {
        name: "language",
        message: "Please enter your language code",
        default: "de-DE",
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.version = "0.0.0";
    });
  }

  writing() {
    const templates = [
      "api/odata/v0.0.0/db.js",
      "api/app.js",
      "api/devNota.js",
      "api/package.json",
      "webapp/controller/App.controller.js",
      "webapp/controller/Home.controller.js",
      "webapp/i18n/i18n.properties",
      "webapp/sky-worker/sw.json",
      "webapp/view/App.view.xml",
      "webapp/view/Home.view.xml",
      "webapp/Component.js",
      "webapp/index.dev.html",
      "webapp/index.html",
      "webapp/manifest.json",
      "webapp/sw.js",
      "package.json",
      "README.md",
      "ui5.yaml"
    ];
    const files = [
      "api/odata/v0.0.0/entities/book/db.js",
      "api/odata/v0.0.0/entities/book/index.js",
      "api/odata/v0.0.0/index.js",
      "api/odata/v0.0.0/service.js",
      "api/.gitignore",
      "webapp/css/style.css",
      "webapp/model/models.js",
      "webapp/sky-worker/icon.png",
      ".gitignore"
    ];

    templates.forEach(template =>
      this._copy(template, this.fs.copyTpl.bind(this.fs))
    );
    files.forEach(file => this._copy(file, this.fs.copy.bind(this.fs)));
  }

  end() {
    this.log("After generation please run manually following commands:");
    this.log(`cd ${this.projectFolder}`);
    this.log("npm run inst:all");
  }

  _copy(path, method) {
    this.projectFolder = this.props.id
      .split(".")
      .reduce((current, next) => next);
    method(
      this.templatePath(path),
      this.destinationPath(`${this.projectFolder}/${path}`),
      this.props
    );
  }
};
