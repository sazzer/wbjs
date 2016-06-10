import { parseTall, parseOneTall } from './datatable';
import moment from 'moment-timezone';
import { expect } from 'chai';

const SEED_DATA_COLUMN_MAP = {
  ID: {column: 'id', transformer: Number.parseInt},
  Name: {column: 'name'},
  Version: {column: 'version'},
  Created: {column: 'created', transformer: moment},
  Updated: {column: 'updated', transformer: moment}
};

const WORLD_API_COLUMN_MAP = {
  ID: {field: 'resource.id'},
  Name: {field: 'resource.name'},
  Created: {field: 'resource.created'},
  Offset: {field: 'offset', transformer: Number.parseInt},
  Cursor: {field: 'cursor'}
}

module.exports = function() {
  this.Given('I have worlds with:', function(datatable) {
    const parsed = parseTall(datatable);
    return this.seed('worlds', parsed, SEED_DATA_COLUMN_MAP);
  })

  this.When('I list worlds', function() {
    return this.request('get', '/api/worlds');
  });

  this.Then(/World (\d+) is:/, function(index, datatable) {
    const parsed = parseOneTall(datatable);

    const assertions = parsed.filter(({key, value}) => key in WORLD_API_COLUMN_MAP)
      .map(({key, value}) => {
        const transformed = WORLD_API_COLUMN_MAP[key].transformer ? WORLD_API_COLUMN_MAP[key].transformer(value) : value;

        return {
          field: WORLD_API_COLUMN_MAP[key].field,
          value: transformed
        }
      })
      .map(({field, value}) => {
        return {
          field: `body.edges[${index}].${field}`,
          value
        }
      })
      .map(({field, value}) => {
        return expect(this.lastResponse).to.eventually.have.deep.property(field, value);
      });

      return Promise.all(assertions);
  });
}
