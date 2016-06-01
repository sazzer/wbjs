import { startServer } from './server/index.js'

startServer()
  .then((server) => {
    console.log('Started server');
  }).catch((err) => {
    console.log('Failed to start server');
    console.log(err);
  });
