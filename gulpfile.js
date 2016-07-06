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

// ----- Browser Sync ----- //

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  })

  gulp.watch('source/stylesheets/application.sass', ['sass'])
})

// ----- Sass ----- //

gulp.task('sass', function() {
  gulp.src('source/stylesheets/application.sass')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(browserSync.stream())
})

// ----- Default ----- //

gulp.task('default', ['serve'])
