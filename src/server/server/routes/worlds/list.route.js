import Joi  from 'joi'
import { extractPaginationDetails } from '../pagination';
import { WORLDS_SCHEMA, translateToApi } from './worlds.schema'
import { findAllWorlds } from '../../../worlds/finder';
import { getLogger } from '../../../log';
import { InvalidCursorError } from '../common/cursor';
import boom from 'boom';

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
      new Promise((resolve, reject) => {
        resolve(extractPaginationDetails(request));
      })
        .then((pagination) => findAllWorlds({pagination}))
        .then(translateToApi)
        .then(reply)
        .catch((err) => {
          logger.log('error', 'Error listing worlds', err);
          if (err instanceof InvalidCursorError) {
            const response = reply({
              error: 'INVALID_CURSOR',
              message: err.message
            });
            response.statusCode = 400;
          } else {
            const response = reply({
              error: 'INTERNAL_ERROR'
            });
            response.statusCode = 500;
          }
        })

    }
  }
}
