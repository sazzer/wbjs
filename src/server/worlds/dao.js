import { World } from './world';
import moment from 'moment-timezone';
import { ResultSet } from '../service/resultset';

/**
 * Find all of the worlds that match the given requirements
 * @return {Promise} A promise for the resultset of matching worlds
 */
export function find() : Promise<ResultSet<World>> {
  const results = new ResultSet([
    new World('123', 'Discworld', 'C573ABB3-87CD-4E87-8760-5C76D60156D6', moment(), moment()),
    new World('321', 'Faerun', 'C573ABB3-87CD-4E87-8760-5C76D60156D6', moment(), moment())
  ], 2, 0);

  return Promise.resolve(results);
}
