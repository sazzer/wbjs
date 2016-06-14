import Boom from 'boom';

/** Encoding to use for the decoded ID string */
const STRING_ENCODING = 'utf8';
/** Encoding to use for the encoded ID string */
const ID_ENCODING = 'base64';

/**
 * Error thrown when decoding an IDfails for some reason
 */
export class InvalidIDError extends Error {
  /**
   * Construct the Error
   * @param {string} message The error message
   */
  constructor(message) {
    super(message);
  }

  /**
   * Convert the error to a Boom error Object
   * @return {Boom} the Boom error Object
   */
  toBoom() {
    const response = Boom.create(400, this.message);
    response.output.payload.error = 'INVALID_ID';
    return response;
  }
}

/**
 * Generate a ID string from a type and an id
 * @param {String} type The type of resource
 * @param {*} id The Internal ID in the resource
 * @return {String} the id
 */
export function generateId(type, id) {
  const rawId = JSON.stringify({type, id});
  const encodedId = new Buffer(rawId, STRING_ENCODING).toString(ID_ENCODING);
  return encodedId;
}

/**
 * Decode an encoded ID to produce the type and Internal ID values
 * @param {String} id The ID to decode
 * @return {Object} the decoded ID details
 */
export function decodeId(id) {
  let idDetails;
  try {
    const decodedID = new Buffer(id, ID_ENCODING).toString(STRING_ENCODING);
    idDetails = JSON.parse(decodedID);
  } catch (e) {
    throw new InvalidIDError('Failed to decode provided id');
  }
  if (!('type' in idDetails)) {
    throw new InvalidIDError('Missing field: type');
  }
  if (!('id' in idDetails)) {
    throw new InvalidIDError('Missing field: id');
  }
  if (Object.keys(idDetails).length > 2) {
    throw new InvalidIDError('Unexpected fields in id');
  }
  return idDetails;
}
