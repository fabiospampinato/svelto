
/* =========================================================================
 * Svelto - Tasks - Watch - Fonts
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input = require ( '../utilities/input' ),
    gulp  = require ( 'gulp-help' )( require ( 'gulp' ) );

/* FONTS */

gulp.task ( 'watch-fonts', 'Watch fonts', function () {

  return gulp.watch ( input.getPath ( 'fonts' ), { interval: 500 }, ['build-fonts'] );

});
