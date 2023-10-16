'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-men-5:entity', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/entity'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
