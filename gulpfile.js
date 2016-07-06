// *************************************
//
//   Gulpfile
//   -> Task runner configuration
//
// *************************************

// -------------------------------------
//   Dependencies
// -------------------------------------

let gulp = require('gulp')
let browserSync = require('browser-sync').create()
let sass = require('gulp-sass')
let sourceMaps = require('gulp-sourcemaps')

// -------------------------------------
//   Tasks
// -------------------------------------

// ----- Build ----- //

gulp.task('build', ['html', 'sass'])

// ----- Browser Sync ----- //

gulp.task('serve', ['build'], function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './build/'
    }
  })

  gulp.watch('source/index.html', ['html'])
  gulp.watch('source/stylesheets/application.sass', ['sass'])
})

// ----- HTML ----- //

gulp.task('html', function() {
  gulp.src('source/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
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
