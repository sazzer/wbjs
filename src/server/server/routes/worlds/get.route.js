import Joi  from 'joi'
import { WORLD_SCHEMA, translateToApi } from './world.schema'
import { findWorldById } from '../../../worlds/finder';
import { getLogger } from '../../../log';
import { translateError } from '../errors';
import { decodeId } from '../common/id';

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
      const response = new Promise((resolve, reject) => {resolve(decodeId(request.params.id))})
        .then((id) => findWorldById(id.id))
        .then(translateToApi)
        .catch((err) => {
          logger.log('error', 'Error retrieving world', err);
          return translateError(err);
        });

      reply(response);
    }
  }
}
