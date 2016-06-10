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
    const seedData = {
      worlds: parsed.map((record) => {
        const seedRecord = {};
        record.filter(({key}) => key in SEED_DATA_COLUMN_MAP)
          .map(({key, value}) => {
            const transformed = SEED_DATA_COLUMN_MAP[key].transformer ? SEED_DATA_COLUMN_MAP[key].transformer(value) : value;

            return {
              key: SEED_DATA_COLUMN_MAP[key].column,
              value: transformed
            }
          })
          .forEach(({key, value}) => {
            seedRecord[key] = value;
          });
        return seedRecord;
      })
    };

    return this.seed(seedData);
  })

  this.When('I list worlds', function() {
    return this.request('get', '/api/worlds');
  });
}
