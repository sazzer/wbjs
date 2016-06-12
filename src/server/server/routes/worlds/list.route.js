import Joi  from 'joi'
import { extractPaginationDetails } from '../pagination';
import { WORLDS_SCHEMA, translateToApi } from './worlds.schema'
import { findAllWorlds } from '../../../worlds/finder';
import { getLogger } from '../../../log';
import { InvalidCursorError } from '../common/cursor';
import Boom from 'boom';

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
        .then(reply)
        .catch((err) => {
          logger.log('error', 'Error listing worlds', err);
          let response;
          if (err instanceof InvalidCursorError) {
            response = Boom.badRequest();
            response.output.payload = {
              code: 'INVALID_CURSOR',
              message: err.message
            };
          } else {
            response = Boom.badImplementation();
            response.output.payload = {
              code: 'INTERNAL_ERROR'
            };
          }
          return response;
        }));
    }
  }
}
