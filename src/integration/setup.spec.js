import { startServer } from '../server/server/index.js'
import pg from 'pg';
import freeport from 'freeport';

let serverPromise;

before(function() {
  console.log('About to start the server');
  serverPromise = new Promise((resolve, reject) => {
    freeport((err,port) => {
      if (err) {
        reject(err);
      } else {
        resolve(port);
      }
    })
  }).then((port) => {
    return startServer(port)
      .then((server) => {
        console.log(`Started server on: ${server.info.uri}`);
        return server;
      }).catch((err) => {
        console.log('Failed to start server');
        console.log(err);
        throw err;
      });
  })

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
