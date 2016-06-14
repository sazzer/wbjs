import Joi  from 'joi'
import { WORLD_SCHEMA, translateToApi } from './world.schema'
import { findWorldById } from '../../../worlds/finder';
import { getLogger } from '../../../log';
import { translateError } from '../errors';
import { decodeId } from '../common/id';
import { UnknownResourceError } from '../../../service/errors';
import Boom from 'boom';

const logger = getLogger('worlds:get');

/**
 * Error to indicate that a requested world doesn't exist
 */
class UnknownWorldError extends Error {
  /**
   * Convert the error to a Boom error Object
   * @return {Boom} the Boom error Object
   */
  toBoom() {
    const response = Boom.create(404, this.message);
    response.output.payload.error = 'UNKNOWN_WORLD';
    return response;
  }
}

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
      const response = new Promise((resolve, reject) => {resolve(decodeId(request.params.id, 'world'))})
        .then((id) => findWorldById(id.id))
        .catch((err) => {
          if (err instanceof UnknownResourceError) {
            throw new UnknownWorldError();
          } else {
            throw err;
          }
        })
        .then(translateToApi)
        .catch((err) => {
          logger.log('error', 'Error retrieving world', err);
          return translateError(err);
        });

      reply(response);
    }
  }
}
