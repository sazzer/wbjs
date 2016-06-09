/** Encoding to use for the decoded ID string */
const STRING_ENCODING = 'utf8';
/** Encoding to use for the encoded ID string */
const ID_ENCODING = 'base64';

/**
 * Generate a ID string from a type and an id
 * @param {String} type The type of resource
 * @param {*} id The Internal ID in the resource
 * @return {String} the id
 */
export function generateId(type: string, id: any) : string {
  const rawId = JSON.stringify({type, id});
  const encodedId = new Buffer(rawId, STRING_ENCODING).toString(ID_ENCODING);
  return encodedId;
}

/**
 * Decode an encoded ID to produce the type and Internal ID values
 * @param {String} id The ID to decode
 * @return {Object} the decoded ID details
 */
export function decodeId(id: string) : Object {
  const decodedId = new Buffer(id, ID_ENCODING).toString(STRING_ENCODING);
  const idDetails = JSON.parse(decodedId);
  return idDetails;
}
