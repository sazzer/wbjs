var config = require('config');

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
      migrate: 'grunt-db-migrate'
  });

  // Keep the plugins in alphabetical order
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        plugins: ['rewire', 'typecheck', 'syntax-flow', 'transform-flow-strip-types'],
        presets: ['es2015']
      },
      server: {
        files: [{
          expand: true,
          cwd: 'src/server',
          src: ['**/*.js'],
          dest: 'target/server'
        }]
      },
      integration: {
        files: [{
          expand: true,
          cwd: 'src/integration',
          src: ['**/*.js'],
          dest: 'target/integration'
        }]
      }
    },
    concurrent: {
      run: ['watch:rebuild', 'nodemon:server'],
      options: {
        logConcurrentOutput: true
      }
    },
    env: {
      integration: {
        NODE_ENV: 'integration'
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      server: {
        files: [{
          expand: true,
          cwd: 'src/server',
          src: ['**/*.js'],
        }]
      },
      integration: {
        files: [{
          expand: true,
          cwd: 'src/integration',
          src: ['**/*.js'],
        }]
      }
    },
    jscpd: {
      server: {
        path: 'src/server'
      },
      integration: {
        path: 'src/integration'
      }
    },
    migrate: {
        options: {
            env: {
                DATABASE_URL: config.get('Database.url')
            },
            'migrations-dir': 'src/migrations',
            verbose: true
        }
    },
    mocha_istanbul: {
      options: {
        reporter: 'spec',
        reportFormats: ['lcovonly'],
        mochaOptions: ['--growl'],
        istanbulOptions: ['--include-all-sources'],
        print: 'none'
      },
      server: {
        src: 'target/server/**/*.spec.js',
        options: {
          require: [
            'target/server/test-helper'
          ],
          coverageFolder: 'target/coverage',
          root: 'target/server'
        }
      },
      integration: {
        src: 'target/integration/**/*.spec.js',
        options: {
          require: [
            'target/integration/test-helper'
          ],
          coverage: false,
          root: 'target/integration'
        }
      }
    },
    nodemon: {
      server: {
        script: 'target/server/main.js',
        options: {
          args: ['start'],
          watch: 'target',
          ext: '*'
        }
      }
    },
    remapIstanbul: {
      server: {
        src: 'target/coverage/coverage.json',
        options: {
          reports: {
            'json': 'target/coverage/coverage.json',
            'lcovonly': 'target/coverage/lcov.info',
            'text': undefined
          }
        }
      }
    },
    watch: {
      rebuild: {
        files: ['src/**/*'],
        tasks: ['test'],
        options: {
          atBegin: false
        }
      },
      test: {
        files: ['src/**/*'],
        tasks: ['test'],
        options: {
          atBegin: true
        }
      }

    }
  });

  grunt.registerTask('build', ['eslint:server', 'jscpd:server', 'babel:server']);
  grunt.registerTask('build_integration', ['eslint:integration', 'jscpd:integration', 'babel:integration']);
  grunt.registerTask('test', ['build', 'mocha_istanbul:server', 'remapIstanbul']);
  grunt.registerTask('integration', ['env:integration', 'build', 'build_integration', 'migrate:up', 'mocha_istanbul:integration']);
  grunt.registerTask('run', ['test', 'concurrent:run']);
};
