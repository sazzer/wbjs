import winston from 'winston';

const logger = new winston.Logger({
    transports: [
      new (winston.transports.Console)({
        timestamp: true,
        colorize: true
      })
    ]
});

/**
 * Get the logger to use
 * @return {Logger} The logger
 */
export function getLogger() {
  return logger;
}
