/** Encoding to use for the decoded cursor string */
const STRING_ENCODING = 'utf8';
/** Encoding to use for the encoded cursor string */
const CURSOR_ENCODING = 'base64';

/**
 * Error thrown when decoding a cursor fails for some reason
 */
export class InvalidCursorError extends Error {
  /**
   * Construct the Error
   * @param {string} message The error message
   */
  constructor(message) {
    super(message);
  }
}

/**
 * Generate a Cursor string from a type and an offset
 * @param {String} type The type of resultset
 * @param {Number} offset The offset in the resultset
 * @return {String} the cursor
 */
export function generateCursor(type, offset) {
  const rawCursor = JSON.stringify({type, offset});
  const encodedCursor = new Buffer(rawCursor, STRING_ENCODING).toString(CURSOR_ENCODING);
  return encodedCursor;
}

/**
 * Decode an encoded cursor to produce the type and offset values
 * @param {String} cursor The cursor to decode
 * @return {Object} the decoded cursor details
 */
export function decodeCursor(cursor) {
  let cursorDetails;
  try {
    const decodedCursor = new Buffer(cursor, CURSOR_ENCODING).toString(STRING_ENCODING);
    cursorDetails = JSON.parse(decodedCursor);
  } catch (e) {
    throw new InvalidCursorError('Failed to decode provided cursor');
  }
  if (!('type' in cursorDetails)) {
    throw new InvalidCursorError('Missing field: type');
  }
  if (!('offset' in cursorDetails)) {
    throw new InvalidCursorError('Missing field: offset');
  }
  if (Object.keys(cursorDetails).length > 2) {
    throw new InvalidCursorError('Unexpected fields in cursor');
  }
  return cursorDetails;
}
