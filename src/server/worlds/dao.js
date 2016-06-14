import { World } from './world';
import moment from 'moment-timezone';
import { ResultSet } from '../service/resultset';
import { connectToDb, queryBuilder } from '../db';
import { getLogger } from '../log'

const logger = getLogger('worlds:dao');

/**
 * Retrieve a single world by it's unique ID
 * @param {String} id The unique ID of the World
 * @return {Promise}  A promise for the world
 */
export function getById(id) {
  const query = queryBuilder().select()
    .from('worlds')
    .field('id')
    .field('name')
    .field('version')
    .field('created')
    .field('updated')
    .where('id = ?', id)
    .toString();

  logger.log('info', 'Loading a single world by ID', {id});
  
  return connectToDb().one(query)
    .then((world) => new World(world.id, world.name, world.version, moment(world.created), moment(world.updated)))
}

/**
 * Find all of the worlds that match the given requirements
 * @param {Object} pagina The pagination details to request
 * @return {Promise} A promise for the resultset of matching worlds
 */
export function find({pagination}) {
  const query = queryBuilder().select()
    .from('worlds')
    .field('id')
    .field('name')
    .field('version')
    .field('created')
    .field('updated')
    .order('updated')
    .order('created')
    .order('id')
    .offset(pagination.offset)
    .limit(pagination.count)
    .toString();
  const countQuery = queryBuilder().select()
    .from('worlds')
    .field('count(*)')
    .toString();

  return connectToDb().one(countQuery)
    .then((count) =>
      connectToDb().any(query)
        .then((worlds) =>
          worlds.map((world) =>
            new World(world.id, world.name, world.version, moment(world.created), moment(world.updated))
          )
        )
        .then((worlds) => new ResultSet(worlds, Number.parseInt(count.count), pagination.offset))
    )
}
