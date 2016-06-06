import Joi from 'joi';
import { World } from '../../../worlds/world';

export const WORLD_SCHEMA = Joi.object().keys({
  id: Joi.string().min(1).description('The unique ID of the World').required(),
  name: Joi.string().min(1).description('The name of the World').required(),
  created: Joi.date().iso().description('When the World was created').required()
}).description('The details of a World');


/**
 * Translator to take a world and translate it to an API representation
 * @param {World} world The world to translate
 * @return {Object} the translated response
 */
 export function translateToApi(world: World) : Object {
   return {
     id: world.id,
     name: world.name,
     created: world.created.utc().format()
   };
}
