import TraceError from 'trace-error';

/**
 * Helper to generate a cursor from a given name and offset
 * @param {String} name The name of the collection
 * @param {Number} offset The offset in the collection
 * @return {String} the cursor to use
 */
export function generateCursor(name, offset) {
  const cursor = {
    name,
    offset
  };

  return new Buffer(JSON.stringify(cursor), 'utf-8').toString('base64');
}

/**
 * Helper to parse a cursor into name and offset
 * @param {String} cursor the cursor to parse
 * @return {Object} the parsed cursor, containing fields for name and offset
 */
export function parseCursor(cursor) {
  let decoded;
  try {
    decoded = new Buffer(cursor, 'base64').toString('utf-8');
  } catch (e) {
    throw new TraceError('Failed to decode the cursor', e);
  }

  const parsed = JSON.parse(decoded);
  if (!('name' in parsed && 'offset' in parsed)) {
    throw new Error('Cursor was not correctly constructed');
  }
  if (Object.keys(parsed).length !== 2) {
    throw new Error('Cursor was not correctly constructed');
  }
  return parsed;
}
