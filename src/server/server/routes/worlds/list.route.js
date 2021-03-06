import Joi  from 'joi'
import { extractPaginationDetails } from '../pagination';
import { WORLDS_SCHEMA, translateToApi } from './worlds.schema'
import { findAllWorlds } from '../../../worlds/finder';
import { getLogger } from '../../../log';
import { InvalidCursorError } from '../common/cursor';
import { translateError } from '../errors';

const logger = getLogger('worlds:list');

export const routes = {
  method: 'GET',
  path: '/api/worlds',
  config: {
    id: 'worlds:list',
    description: 'Retrieve a filtered list of all the known worlds',
    tags: ['api', 'world'],
    response: {
      failAction: 'log',
      options: {

      },
      schema: WORLDS_SCHEMA
    },
    validate: {
      failAction: 'error',
      params: {

      },
      query: {
        count: Joi.number().integer().min(0).description('The number of worlds to retrieve'),
        cursor: Joi.string().min(1).description('A cursor to start retriving worlds after'),
        page: Joi.number().integer().min(0).description('A page of worlds to retrieve'),
        offset: Joi.number().integer().min(0).description('The offset into the resultset of worlds to retrieve')
      }
    },
    handler: (request, reply) => {
      reply(new Promise((resolve, reject) => resolve(extractPaginationDetails(request, 'worlds')))
        .then((pagination) => findAllWorlds({pagination}))
        .then(translateToApi)
        .catch((err) => {
          logger.log('error', 'Error listing worlds', err);
          return translateError(err);
        }));
    }
  }
}
