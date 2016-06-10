/**
 * Parse a Tall Datatable - that is, one that has headings in the first column
 * @param {DataTable} datatable The datatable
 * @return {Array} Array of Array of Key/Value pairs
 */
export function parseTall(datatable) {
  const raw = datatable.raw();
  const transposed = raw[0].map((col, i) => {
    return raw.map((row) => {
      return row[i];
    })
  });

  return parseRaw(transposed);
}

/**
 * Parse a Wide Datatable - that is, one that has headings in the first row
 * @param {DataTable} datatable The datatable
 * @return {Array} Array of Array of Key/Value pairs
 */
export function parseWide(datatable) {
  return parseRaw(datatable.raw());
}

function parseRaw(datatable) {
  if (datatable.length == 0) {
    throw new Error('No data was provided');
  }
  if (datatable[0].length < 2) {
    throw new Error('Not enough data was provided');
  }

  const headings = datatable.shift();
  const result = datatable.map((row) => {
    return headings.map((heading, i) => {
      return {
        key: heading,
        value: row[i]
      };
    });
  });

  return result;
}

/**
 * Parse a Tall Datatable - that is, one that has headings in the first column - that only has one set of data
 * @param {DataTable} datatable The datatable
 * @return {Array} Array of Key/Value pairs
 */
export function parseOneTall(datatable) {
  const parsed = parseTall(datatable);
  if (parsed.length != 1) {
    throw new Error(`Parsed Data table had ${parsed.length} sets of data, but should only have had 1`)
  }
  return parsed[0];
}

/**
 * Parse a Wide Datatable - that is, one that has headings in the first row - that only has one set of data
 * @param {DataTable} datatable The datatable
 * @return {Array} Array of Key/Value pairs
 */
export function parseOneWide(datatable) {
  const parsed = parseWide(datatable);
  if (parsed.length != 1) {
    throw new Error(`Parsed Data table had ${parsed.length} sets of data, but should only have had 1`)
  }
  return parsed[0];
}
