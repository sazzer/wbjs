import pgPromise from 'pg-promise';
import config from '../config';
import squel from 'squel';
import { getLogger } from '../log';

const logger = getLogger('db');

const pgp = pgPromise();
const dbUrl = config.get('database');
const db = pgp(dbUrl);

logger.log('info', 'Connecting to database', {dbUrl});

/** The details of possible errors */
export const errors = pgp.errors;

/**
 * Open a connection to the database
 * @return {PGPromise} A PG-Promise Database Connection
 */
export function connectToDb() {
  return db;
}

/**
 * Get the query builder to use for generating dynamic queries
 * @return {Squel} The query builder
 */
export function queryBuilder() {
  return squel;
}
