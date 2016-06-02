import Joi  from 'joi'
import { WORLD_SCHEMA } from './world.schema'

/**
 * The schema that represents a collection of worlds
 */
export const WORLDS_SCHEMA = Joi.object().keys({
  data: Joi.array().items(
    Joi.object().keys({
      resource: WORLD_SCHEMA,
      cursor: Joi.string().min(1).trim().description('Cursor to use to start from this result'),
      offset: Joi.number().integer().min(0).description('Offset of this result in the entire resultset')
    }).requiredKeys('resource', 'cursor', 'offset')
    .description('Details of a single world in the resultset')
  ).description('Collection of world records that match the request'),
  pagination: Joi.object().keys({
    hasNextPage: Joi.boolean().description('Whether there is a next page to move to'),
    hasPreviousPage: Joi.boolean().description('Whether there is a previous page to move to'),
    pageOffset: Joi.number().integer().min(0).description('The 0-based offset of the first record returned from the entire resultset'),
    count: Joi.number().integer().min(0).description('The total number of records returned')
  }).requiredKeys('hasNextPage', 'hasPreviousPage', 'pageOffset', 'count')
  .description('Pagination details for this page of results')
})
