// *************************************
//
//  Gulpfile
//
// *************************************
/* eslint-env node */

let babelify = require('babelify')
let browserify = require('browserify')
let browserSync = require('browser-sync').create()
let buffer = require('vinyl-buffer')
let gulp = require('gulp')
let gulpIf = require('gulp-if')
let gulpUtil = require('gulp-util')
let sass = require('gulp-sass')
let sourceStream = require('vinyl-source-stream')
let uglify = require('gulp-uglify')

let watchify = require('watchify')

let isProduction = process.env.NODE_ENV === 'production'

// -------------------------------------
//  Functions
// -------------------------------------

function bundle(bundler) {
  gulpUtil.log(isProduction)
  return bundler
    .transform(babelify)
    .bundle()
    .on('error', function (error) {
      gulpUtil.log(error)
    })
    .pipe(sourceStream('application.js'))
    .on('error', function (error) {
      gulpUtil.log(error)
    })
    .pipe(gulpIf(isProduction, buffer()))
    .pipe(gulpIf(isProduction, uglify()))
    .pipe(gulp.dest('build/javascripts/'))
    .pipe(browserSync.stream())
}

// -------------------------------------
//  Functions
// -------------------------------------

// ----- Default ----- //

gulp.task('default', function () {
  // ...
})

// ----- HTML ----- //

gulp.task('html', function () {
  gulp
    .src('source/**/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
})

// ----- Images ----- //

gulp.task('images', function () {
  gulp
    .src('source/images/**/*')
    .pipe(gulp.dest('build/images/'))
    .pipe(browserSync.stream())
})

// ----- JavaScript ----- //

gulp.task('javascript', function () {
  bundle(browserify('source/javascripts/main.jsx'))
})

// ----- Sass ----- //

gulp.task('sass', function() {
  gulp
    .src('source/stylesheets/**/*')
    .pipe(sass())
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(browserSync.stream())
})

// ----- Watch ----- //

gulp.task('watch', function () {
  let watcher = watchify(browserify('source/javascripts/main.jsx', watchify.args))

  bundle(watcher)

  watcher.on('log', gulpUtil.log)

  watcher.on('update', function () {
    bundle(watcher)
  })

  gulp.watch('source/**/*.html', ['html'])
  gulp.watch('source/images/**/*', ['images'])
  gulp.watch('source/stylesheets/**/*', ['sass'])

  browserSync.init({
    server: './build'
  })
})
