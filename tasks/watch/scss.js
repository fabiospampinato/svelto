
/* =========================================================================
 * Svelto - Tasks - Watch - SCSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input = require ( '../utilities/input' ),
    gulp  = require ( 'gulp-help' )( require ( 'gulp' ) );

/* SCSS */

gulp.task ( 'watch-scss', 'Watch SCSS', function () {

  gulp.watch ( input.getPath ( 'scss.all' ), ['build-css'] );

});
