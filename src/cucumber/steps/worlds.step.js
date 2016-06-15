import { parseTall, parseOneTall } from './datatable';
import moment from 'moment-timezone';

const SEED_DATA_COLUMN_MAP = {
  ID: {column: 'id', transformer: Number.parseInt},
  Name: {column: 'name'},
  Version: {column: 'version'},
  Created: {column: 'created', transformer: moment},
  Updated: {column: 'updated', transformer: moment}
};

const LIST_WORLD_API_COLUMN_MAP = {
  ID: {field: 'resource.id'},
  Name: {field: 'resource.name'},
  Created: {field: 'resource.created'},
  Offset: {field: 'offset', transformer: Number.parseInt},
  Cursor: {field: 'cursor'}
}

const GET_WORLD_API_COLUMN_MAP = {
  ID: {field: 'body.id'},
  Name: {field: 'body.name'},
  Created: {field: 'body.created'},
  Version: {field: 'headers.etag[0]'},
  Modified: {field: 'headers.last-modified[0]'}
}

module.exports = function() {
  this.Given('I have worlds with:', function(datatable) {
    const parsed = parseTall(datatable);
    return this.seed('worlds', parsed, SEED_DATA_COLUMN_MAP);
  })

  this.When('I list worlds', function() {
    return this.request('get', '/api/worlds');
  });

  this.When(/^I list (\d+) worlds starting from cursor "([^"]+)"$/, function(count, cursor) {
    return this.request('get', '/api/worlds', {
      params: {
        count,
        cursor
      }
    });
  });

  this.When(/^I list (\d+) worlds starting from offset "(\d+)"$/, function(count, offset) {
    return this.request('get', '/api/worlds', {
      params: {
        count,
        offset
      }
    });
  });

  this.When(/^I list (\d+) worlds starting from page "(\d+)"$/, function(count, page) {
    return this.request('get', '/api/worlds', {
      params: {
        count,
        page
      }
    });
  });

  this.When(/^I retrieve the world with ID "(.+)"$/, function(id) {
    return this.request('get', '/api/worlds/' + id);
  });

  this.Then(/World (\d+) is:/, function(index, datatable) {
    const parsed = parseOneTall(datatable);

    return this.checkResultSetResponse(index, parsed, LIST_WORLD_API_COLUMN_MAP);
  });

  this.Then(/^the retrieved World is:$/, function (datatable) {
    const parsed = parseOneTall(datatable);

    return this.checkCompleteResponse(parsed, GET_WORLD_API_COLUMN_MAP);
  });
}
