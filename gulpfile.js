'use strict'

var gulp = require('gulp'),
  scss = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  runSequence = require('run-sequence')

function handleError (err) {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('styles', function () {
  return gulp.src('src/reset.scss')
    .pipe(plumber({errorHandler: handleError}))
    .pipe(concat('reset.min.css'))
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions', 'safari 8', 'ie 11', 'opera 12.1', 'ios 6',
        'android 4'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  runSequence('styles',
    function () {
      gulp.watch('./src/*.scss', ['styles'])
    })
})

gulp.task('default', function () {
  runSequence('styles',
    function () {

    })
})
