"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-men5:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ 
        id: 'me.app',
        title: 'My wonderfull ui5 app',
        description: 'Executing test of app generator',
        language: 'en-EN'
      });
  });

  it("creates files", () => {
    assert.file(["api/db/book.js"]);
    assert.file(["api/odata/v0.0.0/entities/book.js"]);
    assert.file(["api/db/index.js"]);
    assert.file(["api/odata/v0.0.0/index.js"]);
    assert.file(["api/odata/v0.0.0/service.js"]);
    assert.file(["api/.gitignore"]);
    assert.file(["api/app.js"]);
    assert.file(["api/devNota.js"]);
    assert.file(["api/package.json"]);
    assert.file(["webapp/controller/App.controller.js"]);
    assert.file(["webapp/controller/Home.controller.js"]);
    assert.file(["webapp/css/style.css"]);
    assert.file(["webapp/i18n/i18n.properties"]);
    assert.file(["webapp/model/models.js"]);
    assert.file(["webapp/sky-worker/icon.png"]);
    assert.file(["webapp/sky-worker/sw.json"]);
    assert.file(["webapp/view/App.view.xml"]);
    assert.file(["webapp/view/Home.view.xml"]);
    assert.file(["webapp/Component.js"]);
    assert.file(["webapp/index.dev.html"]);
    assert.file(["webapp/index.html"]);
    assert.file(["webapp/manifest.json"]);
    assert.file(["webapp/sw.js"]);
    assert.file([".gitignore"]);
    assert.file(["package.json"]);
    assert.file(["README.md"]);
    assert.file(["ui5.yaml"]);
  });
});
