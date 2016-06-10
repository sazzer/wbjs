import freeport from 'freeport';
import fetch from 'node-fetch';
import { startServer as startTestServer } from '../../server/server/index.js'

/** The actual server that we're testing */
let serverPromise;

/** The URI referring to the server */
let serverUri;

module.exports = function() {
  this.Before(function() {
    this.request = function(method: string, url: string, opts: ?Object = {}) {
      const fullUrl = `${serverUri}${url}`;
      console.log(`Making request to ${method} ${fullUrl}`);

      this.lastResponse = fetch(fullUrl, {
        method,
        headers: opts.headers,
        body: opts.body
      }).then((response) => {
        return response.json().then((body) => {
          return {
            response,
            body,
            status: response.status,
            headers: response.headers,
          }
        });
      });

      return this.lastResponse;
    }
  });

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
