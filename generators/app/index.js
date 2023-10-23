"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const copyFiles = require('../../common/copyFiles');

module.exports = class extends Generator {
    prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-duper ${chalk.red(
          "men5"
        )} generator!`
      )
    );

    const prompts = [
      {
        name: "id",
        message: "Which id you want to use for the app?",
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
        default: "en-EN",
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
      "webapp/css/style.css",
      "webapp/model/models.js",
      "webapp/sky-worker/icon.png"
    ];

    copyFiles(this, undefined, templates, files);

    const hiddenFiles = [
      ["api/.gitignore"],
      [".gitignore"]
    ];
  
    hiddenFiles.forEach(file => {
      this.fs.copy(
        this.templatePath(file[0]),
        this.destinationPath(file[1])
      );
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    this.log("After generation please run manually following command:");
    this.log("npm run inst:all");
  }

};
