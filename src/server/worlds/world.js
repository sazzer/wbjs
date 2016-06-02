import Immutable from 'immutable';
/**
 * Representation of a World
 */
export class World {
  /**
   * Construct the World
   * @param {String} name The name of the World
   * @param {String} version The version of the World
   * @param {moment} created When the World was created
   * @param {moment} updated When the World was last updated
   */
  constructor(name, version, created, updated) {
    this._state = Immutable.fromJS({
      name,
      version,
      created,
      updated
    });
  }

  /**
   * Get the name of the World
   * @return {String} the name of the World
   */
  get name() {
    return this._state.get('name');
  }

  /**
   * Get the version of the World
   * @return {String} the version of the World
   */
  get version() {
    return this._state.get('version');
  }

  /**
   * Get when the world was created
   * @return {moment} when the world was created
   */
  get created() {
    return this._state.get('created');
  }

  /**
   * Get when the world was last updated
   * @return {moment} when the world was last updated
   */
  get updated() {
    return this._state.get('updated');
  }
}
