
/* =========================================================================
 * Svelto - Tasks - Watch - SCSS
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input = require ( '../utilities/input' ),
    gulp  = require ( 'gulp-help' )( require ( 'gulp' ) );

/* SCSS */

gulp.task ( 'watch-scss', 'Watch SCSS', function () {

  return gulp.watch ( input.getPath ( 'scss.all' ), { interval: 500 }, ['build-css'] );

});
