import { connectToDb } from '../db';

/**
 * Healthcheck for ensuring that we can talk to the database
 * @param {Function} cb The callback to invoke when we're done our tests
 */
export function DbHealthcheck(cb) {
  connectToDb().one('SELECT 1')
    .then((result) => {
      cb(false, 'DB Ok');
    })
    .catch((err) => {
      console.log(err);
      cb(true, err);
    });
}
