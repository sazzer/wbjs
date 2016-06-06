import { List, fromJS} from 'immutable';

/**
 * ResultSet wrapper to include both the results and pagination details
 */
export class ResultSet<T> {
  /**
   * Construct the resultset
   * @param {Array} results the array of results
   * @param {Number} count The total count of results
   * @param {Number} offset The offset of the first result in this resultset
   */
  constructor(results: Array<T>, count: number, offset: number) {
    this._state = fromJS({
      results,
      count,
      offset
    });
  }

  /**
   * Get the collection of results
   * @return {Array} the results
   */
  get results() : List<T> {
    return this._state.get('results');
  }

  /**
   * Get the total count of results
   * @return {Number} the total count of results
   */
  get count() : number {
    return this._state.get('count');
  }

  /**
   * Get the offset of the first result in this resultset
   * @return {Number} The offset of the first result in this resultset
   */
  get offset() : number {
    return this._state.get('offset');
  }
}
