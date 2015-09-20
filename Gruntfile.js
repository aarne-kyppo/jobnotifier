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
              'bootstrap/dist/css/bootstrap.min.css'
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
    react: {
      all: {
        expand: true,
        cwd: '<%= options.js_root %>',
        src: ['*.jsx'],
        dest: '<%= options.js_root %>',
        ext: '.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-react');
  grunt.registerTask('default',['copy','react','jshint']);
}
