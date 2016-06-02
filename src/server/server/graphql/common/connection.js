import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import {Edge} from './edge';
import {PageInfo} from './pageInfo';

/**
 * Constructor for a collection of resources
 * @param {GraphQLOutputType} type The type of resource the collection refers to
 * @return {Object} The actual collection Representation
 */
export function Connection(type) {
  return new GraphQLObjectType({
    name: `${type.name}Connection`,
    fields: {
      edges: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Edge(type))))},
      pageInfo: {type: new GraphQLNonNull(PageInfo)}
    }
  });
}
