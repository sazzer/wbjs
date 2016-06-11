import { decodeCursor } from './common/cursor';

/**
 * Attempt to extract pagination details out of the provided request
 * @param {Request} request The request
 * @return {Object} The pagination details
 */
export function extractPaginationDetails(request) {
  const count = Number.parseInt(request.query.count) || 10;

  const offset = Number.parseInt(request.query.offset);
  const page = Number.parseInt(request.query.page);
  const cursor = request.query.cursor;

  const offsetFromPage = page * count;
  let offsetFromCursor;
  if (cursor) {
    const decodedCursor = decodeCursor(cursor);
    offsetFromCursor = decodedCursor.offset;
    if (count > 0) {
      offsetFromCursor += 1;;
    }
  }

  let offsetToUse;
  if (offset) {
    offsetToUse = offset;
  } else if (offsetFromPage) {
    offsetToUse = offsetFromPage;
  } else if (offsetFromCursor) {
    offsetToUse = offsetFromCursor;
  } else {
    offsetToUse = 0;
  }

  return {
    count,
    offset: offsetToUse
  };
}
