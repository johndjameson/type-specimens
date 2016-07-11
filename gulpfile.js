// *************************************
//
//  Gulpfile
//
// *************************************
/* eslint-env node */

let babelify = require('babelify')
let browserify = require('browserify')
let browserSync = require('browser-sync').create()
let gulp = require('gulp')
let gulpIf = require('gulp-if')
let gulpUtil = require('gulp-util')
let sass = require('gulp-sass')
let uglify = require('gulp-uglify')
let vinyl = require('vinyl-source-stream')
let watchify = require('watchify')

// -------------------------------------
//  Functions
// -------------------------------------

function bundle(bundler) {
  return bundler
    .transform(babelify)
    .bundle()
    .on('error', function (error) {
      gulpUtil.log(error)
    })
    .pipe(gulpIf('', uglify()))
    .pipe(vinyl('application.js'))
    .pipe(gulp.dest('build/javascripts/'))
    .pipe(browserSync.stream())
}

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

// -------------------------------------
//  Functions
// -------------------------------------

// ----- Default ----- //

gulp.task('default', function () {
  // ...
})

// ----- Watch ----- //

gulp.task('watch', function () {
  let watcher = watchify(browserify('./source/javascripts/main.jsx', watchify.args))

  bundle(watcher)

  watcher.on('log', gulpUtil.log)

  watcher.on('update', function () {
    bundle(watcher)
  })

  gulp.watch('source/stylesheets/**/*', ['sass'])

  browserSync.init({
    server: './build'
  });
})

// ----- Sass ----- //

gulp.task('sass', function() {
  gulp
    .src('source/stylesheets/**/*')
    .pipe(sass())
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(browserSync.stream())
})
