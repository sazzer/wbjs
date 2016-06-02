import Joi  from 'joi'
import { WORLD_SCHEMA } from './world.schema'

/**
 * The schema that represents a collection of worlds
 */
export const WORLDS_SCHEMA = Joi.array().items(
  WORLD_SCHEMA
).description('Collection of world records that match the request')
