import pgPromise from 'pg-promise';
import config from 'config';

const pgp = pgPromise();
const db = pgp(config.get('Database.url'));

/**
 * Open a connection to the database
 * @return {PGPromise} A PG-Promise Database Connection
 */
export function connectToDb() {
  return db;
}
