import Joi from 'joi';

export const PAGE_INFO_SCHEMA = Joi.object().keys({
  hasNextPage: Joi.boolean().description('Whether there is a next page of results or not').required(),
  hasPreviousPage: Joi.boolean().description('Whether there is a previous page of results or not').required(),
  pageOffset: Joi.number().integer().min(0).description('The offset of the first record in this page of results').required(),
  count: Joi.number().integer().min(0).description('The total number of records in the entire resultset').required()
}).description('Details of pagination controls for a collection of records');

/**
 * Translator to take a resultset and translate it to an API representation
 * @param {Resultset} resultset The resultset to translate
 * @return {Object} the translated response
 */
export function translateToApi(resultset) {
  const hasNextPage = (resultset.offset > 0);
  const hasPreviousPage = (resultset.offset + resultset.results.length < resultset.count);

  return {
    hasNextPage,
    hasPreviousPage,
    pageOffset: resultset.offset,
    count: resultset.count
  };
}
