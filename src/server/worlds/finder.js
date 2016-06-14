import { World } from './world';
import moment from 'moment-timezone';
import { ResultSet } from '../service/resultset';
import { find, getById } from './dao';

/**
 * Mechanism to find all of the worlds in the system
 * @param {Object} pagina The pagination details to request
 * @return {Promise} A promise for the worlds that match the search
 */
export function findAllWorlds({pagination}) {
  return find({pagination});
}
/**
 * Mechanism to find a single world by the given ID
 * @param {String} id The ID of the world to find
 * @return {Promise} A promise for the world that matches the ID
 */
export function findWorldById(id) {
  return getById(id);
}
