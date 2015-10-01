module.exports = function(grunt){
  grunt.initConfig({
    options: {
      src_root: 'bower_components/',
      dest: 'www/lib',
      js_root: 'www/js',
    },
    copy: {
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= options.src_root %>',
            src: [
              'react/react.min.js',
              'pubsub-js/src/pubsub.js',
              'jquery/dist/jquery.min.js',
              'Feed/src/feed.min.js',
              'bootstrap/dist/css/bootstrap.min.css',
              'bootstrap/dist/css/bootstrap-theme.min.css'
            ],
            dest: '<%= options.dest %>',
            filter: 'isFile',
          },
        ]
      }
    },
    jshint: {
      options: {
        globals: {
          React: true,
          PubSub: true,
          console: true,
          io: true,
          window: true,
          document: true
        }
      },
      all: [
        'www/js/*.js',
      ]
    },
    coffee: {
      compile: {
        expand: true,
        cwd: '<%= options.js_root %>',
        src: ['*.coffee'],
        dest: '<%= options.js_root %>',
        ext: '.js',
      }
    },
    browserify: {
      options: {
        debug: true,
        extensions: ['.jsx'],
        transform: ['babelify']
      },
      dist: {
        src: ['<%= options.js_root %>/*.jsx'],
        dest: '<%= options.js_root %>/react_components.js'
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'www/css/index.css' : 'www/css/index.sass'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default',['copy','browserify','sass']);
}
