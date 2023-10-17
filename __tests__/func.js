'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-men-5:func', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/func'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
