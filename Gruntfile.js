
/**
 * MailDev - Gruntfile.js
 */

module.exports = function (grunt) {

  grunt.initConfig({
    
    // Path config:
    path: {
      app: 'app',
      assets: 'assets'
    },

    watch: {
      sass: {
        files: ['<%= path.assets %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      }
    },

    nodemon: {
      dev: {
        options: {
          ignoredFiles: ['app/**', 'assets/**', 'test/**']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'index.js',
        'lib/*.js',
        '<%= path.app %>/scripts/{,*/}*.js'
      ]
    },

    sass: {
      app: {
        files: {
          '<%= path.app %>/styles/style.css': '<%= path.assets %>/styles/style.scss'
        },
        options: {
          outputStyle: 'compressed'
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('dev', 'Run the app and watch SCSS files for changes', [
    'concurrent'
  ]);

  grunt.registerTask('build', 'Lint JavaScript + compile SCSS', [
    'jshint',
    'sass'
  ]);

  grunt.registerTask('default', ['build']);
};
