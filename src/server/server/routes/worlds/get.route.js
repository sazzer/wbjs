import Joi  from 'joi'
import { extractPaginationDetails } from '../pagination';
import { WORLD_SCHEMA, translateToApi } from './world.schema'
import { findAllWorlds } from '../../../worlds/finder';
import { getLogger } from '../../../log';
import { InvalidCursorError } from '../common/cursor';
import { translateError } from '../errors';

const logger = getLogger('worlds:get');

export const routes = {
  method: 'GET',
  path: '/api/worlds/{id}',
  config: {
    id: 'worlds:get',
    description: 'Retrieve an individual world by ID',
    tags: ['api', 'world'],
    response: {
      failAction: 'log',
      options: {

      },
      schema: WORLD_SCHEMA
    },
    validate: {
      failAction: 'error',
      params: {
        id: Joi.string().min(1).required().description('The ID of the World to retrieve')
      }
    },
    handler: (request, reply) => {
      reply(new Promise((resolve, reject) => reject(new Error('Not Implemented Yet')))
        .catch((err) => {
          logger.log('error', 'Error retrieving world', err);
          return translateError(err);
        }));
    }
  }
}
