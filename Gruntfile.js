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
    remapIstanbul: {
      server: {
        src: 'target/coverage/coverage.json',
        options: {
          reports: {
            'html': 'target/coverage/report',
            'json': 'target/coverage/coverage.json',
            'lcovonly': 'target/coverage/lcov.info',
            'text': undefined
          }
        }
      }
    }
  });

  grunt.registerTask('build', ['eslint:server', 'jscpd:server', 'babel:server']);
  grunt.registerTask('test', ['build', 'mocha_istanbul:server', 'remapIstanbul']);
};
