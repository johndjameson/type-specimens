/* eslint-env node */

let babelify = require('babelify')
let browserSync = require('browser-sync').create()
let browserify = require('browserify')
let gulp = require('gulp')
let gulpUtil = require('gulp-util')
let sass = require('gulp-sass')
let vinyl = require('vinyl-source-stream')
let watchify = require('watchify')

gulp.task('default', function () {
  // process.env.NODE_ENV = 'production'
})

function bundle(bundler) {
  return bundler
    .transform(babelify)
    .bundle()
    .on('error', function (error) {
      gulpUtil.log(error)
    })
    .pipe(vinyl('application.js'))
    .pipe(gulp.dest('build/javascripts/'))
    .pipe(browserSync.stream())
}

gulp.task('watch', function () {
  let watcher = watchify(browserify('./source/javascripts/main.jsx', watchify.args))

  bundle(watcher)

  watcher.on('log', gulpUtil.log)

  watcher.on('update', function () {
    bundle(watcher)
    gulpUtil.log('updated')
  })
})

gulp.task('name',['tasks'], function() {
    // content
});

gulp.task('sass', function() {
  gulp.src('source/stylesheets/**/*')
    .pipe(sass())
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(browserSync.stream())
})

gulp.task('watch:sass', function () {
  gulp.watch('source/stylesheets/**/*', ['sass'])
})
