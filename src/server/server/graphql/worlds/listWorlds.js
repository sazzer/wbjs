import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';
import {Connection} from '../common/connection';

/**
 * Query Field for retrieving a list of worlds
 */
export const ListWorldsQueryField = {
  type: Connection(new GraphQLObjectType({
    name: 'World',
    fields: {
      id: {type: new GraphQLNonNull(GraphQLID)},
      name: {type: new GraphQLNonNull(GraphQLString)},
      version: {type: new GraphQLNonNull(GraphQLID)},
      created: {type: new GraphQLNonNull(GraphQLString)},
      updated: {type: new GraphQLNonNull(GraphQLString)}
    }
  })),
  resolve: () => {
    return {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        count: 1,
        pageOffset: 0
      },
      edges: [
        {
          resource: {
            id: '123',
            version: '456',
            name: 'Discworld',
            created: 'now',
            updated: 'then'
          },
          cursor: 'abc',
          offset: 0
        }
      ]
    };
  }
}
