import freeport from 'freeport';
import { startServer as startTestServer } from '../../server/server/index.js'

/** The actual server that we're testing */
let serverPromise;

/** The URI referring to the server */
let serverUri;

module.exports = function() {
  this.registerHandler('BeforeFeatures', function(event, callback) {
    console.log('Starting the server');

    serverPromise = new Promise((resolve, reject) => {
      freeport((err,port) => {
        if (err) {
          reject(err);
        } else {
          resolve(port);
        }
      })
    })
    .then((port) => {
      return startTestServer(port);
    });

    serverPromise.then(function(server) {
      serverUri = server.info.uri;
      console.log(`Started server on: ${serverUri}`);
      callback();
    })
    .catch((err) => {
      console.log('Failed to start server');
      console.log(err);
      callback(err);
    });
  });

  this.registerHandler('AfterFeatures', function(event, callback) {
    console.log('Stopping the server');

    serverPromise.then((server) => {
      return server.stop();
    })
    .then(() => {
      console.log('Stopped server');
      callback();
    })
    .catch((err) => {
      console.log('Failed to stop server');
      console.log(err);
      callback(err);
    });
  });
}
