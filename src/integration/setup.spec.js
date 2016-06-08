import { startServer } from '../server/server/index.js'
import pg from 'pg';

let serverPromise;

before(function() {
  console.log('About to start the server');
    serverPromise = startServer()
      .then((server) => {
        console.log('Started server');
        return server;
      }).catch((err) => {
        console.log('Failed to start server');
        console.log(err);
        throw err;
      });
    return serverPromise;
});

after(function() {
  console.log('About to stop the server');
  if (serverPromise) {
    serverPromise.then((server) => {
      return server.stop();
    });
  }
});

after(function() {
  pg.end();
})
