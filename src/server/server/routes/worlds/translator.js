/**
 * Translator to translate the internal representation of a World to the API Representation
 * @param {World} world The World to translate
 * @return {Object} The API representation of the World
 */
export function toApi(world) {
  return {
    name: world.name,
    version: world.version,
    created: world.created.utc().format(),
    updated: world.updated.utc().format()
  }
}
