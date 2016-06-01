module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  // Keep the plugins in alphabetical order
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        plugins: [],
        presets: ['es2015']
      },
      server: {
        files: [{
          expand: true,
          cwd: 'src/server',
          src: ['**/*.js'],
          dest: 'target/server'
        }]
      }
    },
    concurrent: {
      run: ['watch:rebuild', 'nodemon:server'],
      options: {
        logConcurrentOutput: true
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
      }
    },
    jscpd: {
      server: {
        path: 'src/server'
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
          coverageFolder: 'target/coverage',
          root: 'target/server'
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
      }
    }
  });

  grunt.registerTask('build', ['eslint:server', 'jscpd:server', 'babel:server']);
  grunt.registerTask('test', ['build', 'mocha_istanbul:server', 'remapIstanbul']);
  grunt.registerTask('run', ['test', 'concurrent:run']);
};
