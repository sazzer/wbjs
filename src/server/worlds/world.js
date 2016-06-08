import moment from 'moment-timezone';
import Immutable from 'immutable';

/**
 * Representation of a World
 */
export class World {
  /**
   * Construct the World
   * @param {Number} id The ID of the World
   * @param {String} name The name of the World
   * @param {String} version The version of the World
   * @param {moment} created When the World was created
   * @param {moment} updated When the World was last updated
   */
  constructor(id: number, name: string, version: string, created: moment, updated: moment) {
    this._state = Immutable.fromJS({
      id,
      name,
      version,
      created,
      updated
    });
  }

  /**
   * Get the ID of the World
   * @return {String} the ID of the World
   */
  get id() : number {
    return this._state.get('id');
  }

  /**
   * Get the name of the World
   * @return {String} the name of the World
   */
  get name() : string {
    return this._state.get('name');
  }

  /**
   * Get the version of the World
   * @return {String} the version of the World
   */
  get version() : string {
    return this._state.get('version');
  }

  /**
   * Get when the world was created
   * @return {moment} when the world was created
   */
  get created() : moment {
    return this._state.get('created');
  }

  /**
   * Get when the world was last updated
   * @return {moment} when the world was last updated
   */
  get updated() : moment {
    return this._state.get('updated');
  }
}
