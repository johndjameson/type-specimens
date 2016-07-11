// *************************************
//
//  Gulpfile
//
// *************************************
/* eslint-env node */

// -------------------------------------
//  Dependencies
// -------------------------------------

let autoprefixer = require('gulp-autoprefixer')
let babelify = require('babelify')
let browserify = require('browserify')
let browserSync = require('browser-sync').create()
let buffer = require('vinyl-buffer')
let cssnano = require('gulp-cssnano')
let del = require('del')
let gulp = require('gulp')
let gulpIf = require('gulp-if')
let gulpUtil = require('gulp-util')
let plumber = require('gulp-plumber')
let runSequence = require('run-sequence')
let sass = require('gulp-sass')
let sourcemaps = require('gulp-sourcemaps')
let sourceStream = require('vinyl-source-stream')
let uglify = require('gulp-uglify')
let watchify = require('watchify')

// -------------------------------------
//  Configuration
// -------------------------------------

let isProduction = process.env.NODE_ENV === 'production'

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

// ----- Build ----- //

gulp.task('build', function() {
  return runSequence('clean', ['html', 'images', 'javascript', 'sass'])
})

// ----- Clean ----- //

gulp.task('clean', function () {
  return del('build/**/*')
})

// ----- Default ----- //

gulp.task('default', function() {
  return runSequence('clean', ['html', 'images', 'javascript', 'sass'], 'watch')
})

// ----- HTML ----- //

gulp.task('html', function () {
  return gulp
    .src('source/**/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
})

// ----- Images ----- //

gulp.task('images', function () {
  return gulp
    .src('source/images/**/*')
    .pipe(gulp.dest('build/images/'))
    .pipe(browserSync.stream())
})

// ----- JavaScript ----- //

gulp.task('javascript', function () {
  return bundle(browserify('source/javascripts/main.jsx'))
})

// ----- Sass ----- //

gulp.task('sass', function() {
  return gulp
    .src('source/stylesheets/**/*')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulpIf(isProduction, cssnano()))
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

  return browserSync.init({
    server: './build'
  })
})
