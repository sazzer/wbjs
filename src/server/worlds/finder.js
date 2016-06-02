import { World } from './world';
import moment from 'moment-timezone';

/**
 * Mechanism to find all of the worlds in the system
 * @return {Promise} A promise for the worlds that match the search
 */
export function findAllWorlds() {
  return Promise.resolve([
    new World('Discworld', 'C573ABB3-87CD-4E87-8760-5C76D60156D6', moment(), moment())
  ]);
}
