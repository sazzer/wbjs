import { World } from './world';
import moment from 'moment-timezone';
import { ResultSet } from '../service/resultset';
import { find } from './dao';

/**
 * Mechanism to find all of the worlds in the system
 * @param {Object} pagina The pagination details to request
 * @return {Promise} A promise for the worlds that match the search
 */
export function findAllWorlds({pagination}) : Promise<ResultSet<World>> {
  return find({pagination});
}
/**
 * Mechanism to find a single world by the given ID
 * @param {String} id The ID of the world to find
 * @return {Promise} A promise for the world that matches the ID
 */
export function findWorldById(id) : Promise<World> {
  return new Promise((resolve, reject) => {
    if (id === '123') {
      resolve(new World('123', 'Discworld', 'C573ABB3-87CD-4E87-8760-5C76D60156D6', moment(), moment()));
    } else {
      reject(new Error(`Unknown world: ${id}`));
    }
  });
}
