'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-men5:func', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/func'))
      .withPrompts({ 
        name: 'currentUser',
        version: '0.0.0',
        type: 'String'
      })
      .withOptions({ 
        ['suppress-check-root']: true,
        ['suppress-bind-function']: true
      });
  });

  it('creates files', () => {
    assert.file(['api/odata/v0.0.0/functions/currentUser/index.js']);
  });
});
