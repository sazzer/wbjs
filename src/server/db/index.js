import pgPromise from 'pg-promise';
import config from '../config';
import squel from 'squel';

const pgp = pgPromise();
const db = pgp(config.get('database'));

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
