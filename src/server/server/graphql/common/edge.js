import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

/**
 * Constructor for an Edge in a collection of resources
 * @param {GraphQLOutputType} type The type of resource the edge refers to
 * @return {Object} The actual edge Representation
 */
export function Edge(type) {
  return new GraphQLObjectType({
    name: `${type.name}Edge`,
    fields: {
      resource: {type: new GraphQLNonNull(type)},
      cursor: {type: new GraphQLNonNull(GraphQLID)},
      offset: {type: new GraphQLNonNull(GraphQLInt)}
    }
  });
}
