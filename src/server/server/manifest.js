import { DbHealthcheck} from './dbHealthcheck.plugin';
import { getLogger } from '../log';
import GoodWinston from 'good-winston';

/**
 * Generate the Glue Manifest to configure the server
 * @param {Number} port The port number to listen on
 * @return {object} The manifest
 */
export function manifest(port: number) : Object {
  return {
    server: {

    },
    connections: [
      {
        port: port,
        labels: ['web']
      }
    ],
    registrations: [{
      plugin: 'inert'
    }, {
      plugin: 'vision'
    }, {
      plugin: 'blipp'
    }, {
      plugin: {
        register: 'good',
        options: {
          opsInterval: 30000,
          reporters: [
            new GoodWinston({
              ops: '*',
              request: '*',
              response: '*',
              log: '*',
              error: '*'
            }, getLogger())
          ]
        }
      }
    }, {
      plugin: {
        register: 'hapi-and-healthy',
        options: {
          path: '/api/health',
          tags: ['health', 'monitor', 'api'],
          name: 'worldbuilder',
          test: {
            node: [
              DbHealthcheck
            ]
          }
        }
      }
    }, {
      plugin: {
        register: 'hapi-info',
        options: {
          path: '/api/debug/info'
        }
      }
    }, {
      plugin: {
        register: 'hapi-glob-routes',
        options: {
          files: `${__dirname}/routes/**/*.route.js`
        }
      }
    }, {
      plugin: 'hapi-routes-status',
      options: {
        routes: {
          prefix: '/api/debug'
        }
      }
    }, {
      plugin: {
        register: 'hapi-swaggered',
        options: {
          endpoint: '/api/docs/swagger',
          stripPrefix: '/api',
          info: {
            title: 'WorldBuilder',
            description: 'Cloud based Worldbuilding Service',
            version: '1.0'
          },
          tagging: {
            mode: 'path'
          },
          routeTags: ['api']
        }
      }
    }, {
      plugin: {
        register: 'hapi-swaggered-ui',
        options: {
          path: '/api/docs/swagger-ui'
        }
      }
    }, {
      plugin: 'hapi-to'
    }]
  };
}
