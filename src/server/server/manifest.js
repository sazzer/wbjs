export function manifest() {
  return {
    server: {

    },
    connections: [
      {
        port: 3000,
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
          ops: {
            interval: 30000
          },
          reporters: {
            console: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{
                ops: '*',
                log: '*',
                request: '*',
                error: '*',
                response: '*'
              }]
            }, {
              module: 'good-console'
            }, 'stdout']
          }
        }
      }
    }, {
      plugin: {
        register: 'hale',
        options: {
          path: '/api/health',
          tags: ['health', 'monitor', 'api'],
          metadata: {
            name: 'worldbuilder'
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
