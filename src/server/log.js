import winston from 'winston';

/**
 * Get the logger to use
 * @param {string} name The name of the logger
 * @return {Logger} The logger
 */
export function getLogger(name = 'worldbuilder') {
  const logger = new winston.Logger({
      transports: [
        new (winston.transports.Console)({
          timestamp: true,
          colorize: true,
          label: name
        })
      ]
  });

  return logger;
}
