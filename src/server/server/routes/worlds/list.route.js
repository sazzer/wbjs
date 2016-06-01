import Joi  from 'joi'

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
      schema: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().required().min(1).trim().description('The name of the world'),
          version: Joi.string().required().min(1).trim().description('The version tag of the world'),
          created: Joi.date().iso().required().description('The timestamp when the world was created'),
          updated: Joi.date().iso().required().description('The timestamp when the world was last updated')
        }).description('Representation of a single world')
      ).description('Collection of world records that match the request')
    },
    validate: {
      failAction: 'error',
      params: {

      }
    },
    handler: (request, reply) => {
      reply([
        {
          name: 'Discworld',
          version: '1',
          created: new Date(),
          updated: new Date()
        }
      ]);
    }
  }
}
