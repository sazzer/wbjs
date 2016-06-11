import Glue  from 'glue'
import { manifest } from './manifest';

/**
 * Actually start the server running
 * @param {Number} port The port number to listen on
 * @return {Promise} A promise for the running server
 */
export function startServer(port) {
    return new Promise((resolve, reject) => {
      const options = {
        relativeTo: __dirname
      };

      Glue.compose(manifest(port), options, (err, server) => {
        if (err) {
          reject(err);
        } else {
          server.start(() => {
            resolve(server);
          })
        }
      });
    });
}
