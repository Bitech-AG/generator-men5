'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-men5:action', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/action'))
      .withPrompts({ 
        name: 'login',
        version: '0.0.0',
        repeat: false
      })
      .withOptions({ 
        ['suppress-check-root']: true,
        ['suppress-bind-action']: true
      });
  });

  it('creates files', () => {
    assert.file(['api/odata/v0.0.0/actions/login/index.js']);
  });
});
