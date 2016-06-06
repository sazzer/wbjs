import Glue  from 'glue'
import { manifest } from './manifest';

/**
 * Actually start the server running
 * @return {Promise} A promise for the running server
 */
export function startServer() : Promise {
    return new Promise((resolve, reject) => {
      const options = {
        relativeTo: __dirname
      };

      Glue.compose(manifest(), options, (err, server) => {
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
