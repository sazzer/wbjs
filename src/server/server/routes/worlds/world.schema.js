import Joi  from 'joi'

/**
 * The schema that represents a single world
 */
export const WORLD_SCHEMA = Joi.object().keys({
  id: Joi.string().min(1).trim().description('The ID of the world'),
  name: Joi.string().min(1).trim().description('The name of the world'),
  version: Joi.string().min(1).trim().description('The version tag of the world'),
  created: Joi.date().iso().description('The timestamp when the world was created'),
  updated: Joi.date().iso().description('The timestamp when the world was last updated')
})
.requiredKeys('id', 'name', 'version', 'created', 'updated')
.description('Representation of a single world');
