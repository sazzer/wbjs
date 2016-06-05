import Joi from 'joi';
import { WORLD_SCHEMA, translateToApi as translateWorldToApi } from './world.schema';
import { PAGE_INFO_SCHEMA, translateToApi as translatePageInfoToApi } from '../common/pageInfo.schema';

const WORLD_EDGE = Joi.object().keys({
  resource: WORLD_SCHEMA.required(),
  cursor: Joi.string().min(1).description('Cursor to start paginating from this record').required(),
  offset: Joi.number().integer().min(0).description('Offset of this record in the entire resultset').required()
}).description('The edge connection for details of a single world in the collection');

export const WORLDS_SCHEMA = Joi.object().keys({
  edges: Joi.array().items(WORLD_EDGE).description('Collection of edges referring to Worlds').required(),
  pageInfo: PAGE_INFO_SCHEMA.required()
}).description('Details of a collection of worlds');

/**
 * Translator to take a resultset and translate it to an API representation
 * @param {Resultset} resultset The resultset to translate
 * @return {Object} the translated response
 */
export function translateToApi(resultset) {
  return {
    edges: resultset.results.map((world, index) => {
      return {
        resource: translateWorldToApi(world),
        cursor: world.id,
        offset: resultset.offset + index
      };
    }),
    pageInfo: translatePageInfoToApi(resultset)
  };
}
