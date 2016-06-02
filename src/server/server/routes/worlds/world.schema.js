import Joi  from 'joi'

/**
 * The schema that represents a single world
 */
export const WORLD_SCHEMA = Joi.object().keys({
  name: Joi.string().required().min(1).trim().description('The name of the world'),
  version: Joi.string().required().min(1).trim().description('The version tag of the world'),
  created: Joi.date().iso().required().description('The timestamp when the world was created'),
  updated: Joi.date().iso().required().description('The timestamp when the world was last updated')
}).description('Representation of a single world');
