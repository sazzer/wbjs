import { parseTall } from './datatable';
import moment from 'moment-timezone';

const SEED_DATA_COLUMN_MAP = {
  ID: {column: 'id', transformer: Number.parseInt},
  Name: {column: 'name'},
  Version: {column: 'version'},
  Created: {column: 'created', transformer: moment},
  Updated: {column: 'updated', transformer: moment}
};

module.exports = function() {
  this.Given('I have worlds with:', function(datatable) {
    const parsed = parseTall(datatable);
    return this.seed('worlds', parsed, SEED_DATA_COLUMN_MAP);
  })

  this.When('I list worlds', function() {
    return this.request('get', '/api/worlds');
  });
}
