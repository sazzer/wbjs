require('source-map-support').install();
import { startServer } from './server/index.js'
import config from './config';
import { getLogger } from './log';

const logger = getLogger();

startServer(config.get('port'))
  .then((server) => {
    logger.log('info', 'Started server', {uri: server.info.uri});
  }).catch((err) => {
    logger.log('error' ,'Failed to start server', err);
  });
