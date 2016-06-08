import { World } from './world';
import moment from 'moment-timezone';
import { ResultSet } from '../service/resultset';
import { connectToDb } from '../db';

/**
 * Find all of the worlds that match the given requirements
 * @return {Promise} A promise for the resultset of matching worlds
 */
export function find() : Promise<ResultSet<World>> {
  return connectToDb().many('SELECT id, name, version, created, updated FROM worlds')
    .then((worlds) =>
      worlds.map((world) =>
        new World(world.id, world.name, world.version, moment(world.created), moment(world.updated))
      )
    )
    .then((worlds) => new ResultSet(worlds, worlds.length, 0))
}
