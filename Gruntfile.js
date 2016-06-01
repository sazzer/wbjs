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
    }
  });

  grunt.registerTask('build', ['babel:server']);
  grunt.registerTask('test', ['build']);
};
