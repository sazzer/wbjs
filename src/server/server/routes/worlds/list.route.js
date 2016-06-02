import Joi  from 'joi'
import { WORLDS_SCHEMA } from './worlds.schema'
import { findAllWorlds } from '../../../worlds/finder';
import { toApi } from './translator';

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
      findAllWorlds()
        .then((worlds) => worlds.map(toApi))
        .then((worlds) => worlds.map((w) => {
          return {
            resource: w,
            cursor: 'abc',
            offset: 0
          };
        }))
        .then((worlds) => {
          return {
            data: worlds,
            pagination: {
              hasNextPage: false,
              hasPreviousPage: false,
              pageOffset: 0,
              count: 1
            }
          }
        })
        .then(reply);
    }
  }
}
