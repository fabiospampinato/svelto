
/* =========================================================================
 * Svelto - Tasks - Watch - Fonts
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input = require ( '../utilities/input' ),
    gulp  = require ( 'gulp-help' )( require ( 'gulp' ) );

/* FONTS */

gulp.task ( 'watch-fonts', 'Watch fonts', function () {

  gulp.watch ( input.getPath ( 'fonts' ), ['build-fonts'] );

});