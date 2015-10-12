var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var reactify = require('reactify');

gulp.task('default',function(){

  gulp.src('www/css/*.sass')
      .pipe(sass())
      .pipe(gulp.dest('www/css'));

  gulp.src('www/js/*.jsx')
      .pipe(browserify({
        transform: ['reactify'],
        extensions: ['.jsx']
      }))
      .pipe(concat('react_components.js'))
      .pipe(gulp.dest('www/js'));
});
