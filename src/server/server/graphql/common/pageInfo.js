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

/**
 * Translator to take a ResultSet object and translate it into a PageInfo data structure
 * @param {ResultSet} resultset The result set to translate
 * @return {Object} the representation of the PageInfo details for this resultset
 */
export function pageInfoTranslator(resultset) {
  const hasPreviousPage = (resultset.offset > 0);
  const lastOffset = resultset.offset + resultset.results.size;
  const hasNextPage = lastOffset < resultset.count;

  return {
    hasNextPage,
    hasPreviousPage,
    pageOffset: resultset.offset,
    count: resultset.count
  };
}
