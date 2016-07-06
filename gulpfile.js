// *************************************
//
//   Gulpfile
//   -> Task runner configuration
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

let babelify = require('babelify')
let browserSync = require('browser-sync').create()
let browserify = require('browserify')
let gulp = require('gulp')
let sass = require('gulp-sass')
let source = require('vinyl-source-stream')
let sourceMaps = require('gulp-sourcemaps')

// -------------------------------------
//   Tasks
// -------------------------------------

// ----- Build ----- //

gulp.task('build', ['html', 'sass', 'javascript', 'images'])

// ----- Browser Sync ----- //

gulp.task('serve', ['build'], function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './build/'
    }
  })

  gulp.watch('source/index.html', ['html'])
  gulp.watch('source/javascripts/**/*', ['javascript'])
  gulp.watch('source/stylesheets/application.sass', ['sass'])
})

// ----- HTML ----- //

gulp.task('html', function() {
  gulp.src('source/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
})

// ----- JavaScript ----- //

gulp.task('javascript', function() {
  browserify('source/javascripts/main.jsx')
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('application.js'))
    .pipe(gulp.dest('build/javascripts/'))
    .pipe(browserSync.stream())
})

// ----- Images ----- //

gulp.task('images', function() {
  gulp.src('source/images/**/*')
    .pipe(gulp.dest('build/images/'))
})

// ----- Sass ----- //

gulp.task('sass', function() {
  gulp.src('source/stylesheets/application.sass')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('build/stylesheets/'))
    .pipe(browserSync.stream())
})

// ----- Default ----- //

gulp.task('default', ['serve'])
