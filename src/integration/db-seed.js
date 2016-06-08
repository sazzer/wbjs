import sqlFixtures from 'sql-fixtures';
import cleaner from 'postgres-cleaner';
import config from '../server/config';
import pg from 'pg';

/**
 * Clean the database and re-seed it with the provided data
 * @param {object} data The data to seed the database with
 * @return {Promise} a promise for the result of seeding the data
 */
export function seed(data: Object) {
  const dbUrl = config.get('database');

  return new Promise((resolve, reject) => {
    pg.connect(dbUrl, (err, client, done) => {
      if (err) {
        done();
        reject(err);
      } else {
        resolve({client, done});
      }
    })
  }).then(({client, done}) => {
    return new Promise((resolve, reject) => {
      cleaner({
        type: 'delete',
        skipTables: ['migrations']
      }, client, (err, result) => {
        done();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  }).then(() => {
    return sqlFixtures.create(dbUrl, data);
  }).then(() => {
    sqlFixtures.destroy();
  });

}
