'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-men5:entity', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/entity'))
      .withPrompts({ 
        name: 'user',
        timestamps: false,
        version: '0.0.0',
        attributeName: 'name',
        attributeType: 'String',
        repeat: false
      })
      .withOptions({ 
        ['suppress-check-root']: true,
        ['suppress-bind-entity']: true
      });
  });

  it('creates files', () => {
    assert.file(['api/odata/v0.0.0/entities/user/db.js']);
    assert.file(['api/odata/v0.0.0/entities/user/index.js']);
  });
});
