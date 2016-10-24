// *************************************
//
//  Gulpfile
//
// *************************************
/* eslint-env node */

// -------------------------------------
//  Dependencies
// -------------------------------------

const autoprefixer = require('gulp-autoprefixer')
const babelify = require('babelify')
const browserSync = require('browser-sync').create()
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const cssnano = require('gulp-cssnano')
const del = require('del')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpUtil = require('gulp-util')
const plumber = require('gulp-plumber')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const sourceStream = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const watchify = require('watchify')

// -------------------------------------
//  Configuration
// -------------------------------------

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// -------------------------------------
//  Functions
// -------------------------------------

function bundle(bundler) {
  return bundler
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
  return bundle(browserify('source/javascripts/main.jsx').transform(babelify))
})

// ----- Sass ----- //

gulp.task('sass', function() {
  return gulp
    .src('source/stylesheets/**/*.{sass,scss}')
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
  let watcher

  watchify.args.debug = isDevelopment
  watcher = watchify(browserify('source/javascripts/main.jsx', watchify.args).transform(babelify))

  bundle(watcher)

  watcher.on('log', gulpUtil.log)

  watcher.on('update', function () {
    bundle(watcher)
  })

  gulp.watch('source/**/*.html', ['html'])
  gulp.watch('source/images/**/*', ['images'])
  gulp.watch('source/stylesheets/**/*.{sass,scss}', ['sass'])

  return browserSync.init({
    server: './build'
  })
})
