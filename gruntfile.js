module.exports = function(grunt) {
grunt.initConfig({
  nodemon: {
    all: {
      script: 'selfedu.js',
      options: {
        watchExtentions: ['js']
      }
    }
   },
 });
grunt.loadNpmTasks('grunt-nodemon');
grunt.registerTask('default', ['nodemon']);
};