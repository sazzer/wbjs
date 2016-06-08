require('source-map-support').install();
import { startServer } from './server/index.js'
import config from './config';

startServer(config.get('port'))
  .then((server) => {
    console.log(`Started server on ${server.info.uri}`);
  }).catch((err) => {
    console.log('Failed to start server');
    console.log(err);
  });
