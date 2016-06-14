/**
 * Error to indicate that a resource requested doesn't exist
 */
export class UnknownResourceError extends Error {
  /**
   * Construct the error
   * @param {String} message The error message
   */
  constructor(message) {
    super(message);
  }
}
