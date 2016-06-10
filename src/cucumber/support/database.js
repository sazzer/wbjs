import sqlFixtures from 'sql-fixtures';
import cleaner from 'postgres-cleaner';
import config from '../../server/config';
import pgPromise from 'pg-promise';

const pgp = pgPromise();

module.exports = function() {
  this.Before(function() {
    const dbUrl = config.get('database');

    console.log(`Clearing the database at ${dbUrl}`);

    return new Promise((resolve, reject) => {
      pgp.pg.connect(dbUrl, (err, client, done) => {
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
    });
  });

  this.Before(function() {
    const dbUrl = config.get('database');

    console.log('Creating seed method');
    this.seed = function(seedData) {
      console.log(seedData);
      return sqlFixtures.create(dbUrl, seedData);
    }
  });

  this.After(function(scenario) {
    pgp.end();
    sqlFixtures.destroy();
  });
}
