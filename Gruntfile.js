module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    // Keep the plugins in alphabetical order
    grunt.initConfig({
    });

    grunt.registerTask('build', []);
    grunt.registerTask('test', ['build']);
};

