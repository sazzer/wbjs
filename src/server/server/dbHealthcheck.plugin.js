import { connectToDb } from '../db';
import { getLogger } from '../log';

const logger = getLogger('dbHealthcheck');

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
      logger.log('error', 'Error checking database health', err);
      cb(true, err);
    });
}
