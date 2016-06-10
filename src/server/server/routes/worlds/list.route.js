import Joi  from 'joi'
import { extractPaginationDetails } from '../pagination';
import { WORLDS_SCHEMA, translateToApi } from './worlds.schema'
import { findAllWorlds } from '../../../worlds/finder';

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
      const pagination = extractPaginationDetails(request);
      findAllWorlds({pagination})
        .then(translateToApi)
        .then(reply)
        .catch(console.log);
    }
  }
}
