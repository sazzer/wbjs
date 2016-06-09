import freeport from 'freeport';
import { startServer as startTestServer } from '../server/server/index.js'
import chakram from 'chakram';

/** The actual server that we're testing */
let serverPromise;

/** The URI referring to the server */
let serverUri;

export function startServer() {
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
    return startTestServer(port)
      .then((server) => {
        console.log(`Started server on: ${server.info.uri}`);
        serverUri = server.info.uri;
        return server;
      }).catch((err) => {
        console.log('Failed to start server');
        console.log(err);
        throw err;
      });
  })

  return serverPromise;
}

export function stopServer() {
  console.log('About to stop the server');
  if (serverPromise) {
    serverPromise.then((server) => {
      return server.stop();
    });
  }
}

/**
 * Make a request to the server
 * @param {String} method The HTTP Method to use
 * @param {String} url The relative URL to use. This will have the Server URI prepended to it
 * @param {Object} params The parameters to the request
 * @return {Promise} the promise for the response
 */
export function request(method, url, params) {
  const fullUrl = `${serverUri}${url}`;
  console.log(`Making a ${method} request to ${fullUrl}`);
  return chakram.request(method, fullUrl, params);
}
