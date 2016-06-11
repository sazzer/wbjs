import { World } from './world';
import moment from 'moment-timezone';
import { ResultSet } from '../service/resultset';
import { connectToDb, queryBuilder } from '../db';

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
