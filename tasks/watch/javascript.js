
/* =========================================================================
 * Svelto - Tasks - Watch - Javascript
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input = require ( '../utilities/input' ),
    gulp  = require ( 'gulp' );

/* JAVASCRIPT */

gulp.task ( 'watch-javascript', 'Watch javascript', function () {

  return gulp.watch ( input.getPath ( 'javascript.all' ), ['build-javascript'] );

});
