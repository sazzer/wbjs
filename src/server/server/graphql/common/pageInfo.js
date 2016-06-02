import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

/**
 * Representation of the Page Info for a paginated result set
 */
export const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: {type: new GraphQLNonNull(GraphQLBoolean)},
    hasPreviousPage: {type: new GraphQLNonNull(GraphQLBoolean)},
    pageOffset: {type: new GraphQLNonNull(GraphQLInt)},
    count: {type: new GraphQLNonNull(GraphQLInt)}
  }
});
