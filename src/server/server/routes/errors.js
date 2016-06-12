import Boom from 'boom';
import { getLogger } from '../../log';

const logger = getLogger('errors');

/**
 * Translate an error that has happened into the correct response
 * @param {Any} error The error to translate
 * @return {Boom} the translated error
 */
export function translateError(error) {
  logger.log('debug', 'Translating error object', error);
  let response;
  if (error.toBoom) {
    response = error.toBoom();
  } else {
    response = Boom.create(500, 'Internal Error');
    response.output.payload.error = 'INTERNAL_ERROR';
  }
  logger.log('debug', 'Translated error object', {response});
  return response;
}
