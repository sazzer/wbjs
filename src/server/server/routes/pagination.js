import { decodeCursor } from './common/cursor';
import { getLogger } from '../../log';

const logger = getLogger('pagination');

/**
 * Attempt to extract pagination details out of the provided request
 * @param {Request} request The request
 * @return {Object} The pagination details
 */
export function extractPaginationDetails(request) {
  logger.log('debug', 'Extracting pagination details from request', {request});
  const count = Number.parseInt(request.query.count) || 10;

  const offsetFields = {
    offset: Number.parseInt(request.query.offset),
    page: Number.parseInt(request.query.page),
    cursor: request.query.cursor
  };
  if (!offsetFields.offset) {
    delete offsetFields.offset;
  }
  if (!offsetFields.page) {
    delete offsetFields.page;
  }
  if (!offsetFields.cursor) {
    delete offsetFields.cursor;
  }

  logger.log('debug', 'Extracted fields: ', {count, offsetFields});

  let offset;
  if (Object.keys(offsetFields) > 1) {
    // If we have multiple offset fields then it's an error
    throw new Error('Only one of Offset, Page and Cursor can be provided at a time');
  } else if ('offset' in offsetFields) {
    offset = offsetFields.offset;
  } else if ('page' in offsetFields) {
    offset = offsetFields.page * count;
  } else if ('cursor' in offsetFields) {
    const decodedCursor = decodeCursor(offsetFields.cursor);
    offset = decodedCursor.offset;
    if (count > 0) {
      offset += 1;;
    }
  } else {
    // If we have no offset fields then we use a value of 0
    offset = 0;
  }

  logger.log('debug', 'Extracted pagination details', {count, offset});

  return {
    count,
    offset
  };
}
