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

// -------------------------------------
//   Tasks
// -------------------------------------

// ----- Browser Sync ----- //

gulp.task('bs', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  })
})

// ----- Default ----- //

gulp.task('default', function() {})
