import Glue  from 'glue'
import { manifest } from './manifest';

export function startServer() {
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
