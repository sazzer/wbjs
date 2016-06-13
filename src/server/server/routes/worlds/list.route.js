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

      }
    },
    handler: (request, reply) => {
      reply(new Promise((resolve, reject) => resolve(extractPaginationDetails(request)))
        .then((pagination) => findAllWorlds({pagination}))
        .then(translateToApi)
        .catch((err) => {
          logger.log('error', 'Error listing worlds', err);
          return translateError(err);
        }));
    }
  }
}
