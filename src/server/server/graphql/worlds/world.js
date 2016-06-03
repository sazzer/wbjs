import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';

/**
 * Schema representation of a single world
 */
export const World = new GraphQLObjectType({
  name: 'World',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    version: {type: new GraphQLNonNull(GraphQLID)},
    created: {type: new GraphQLNonNull(GraphQLString)},
    updated: {type: new GraphQLNonNull(GraphQLString)}
  }
});


/**
 * Translator to take a World object and translate it into a World data structure
 * @param {World} world The world to translate
 * @return {Object} the representation of the World details
 */
export function worldTranslator(world) {
  return {
    id: world.id,
    name: world.name,
    version: world.version,
    created: world.created.utc().format(),
    updated: world.updated.utc().format()
  }
}
