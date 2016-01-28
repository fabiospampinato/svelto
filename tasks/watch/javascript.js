
/* =========================================================================
 * Svelto - Tasks - Watch - Javascript
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input = require ( '../utilities/input' ),
    gulp  = require ( 'gulp' );

/* JAVASCRIPT */

gulp.task ( 'watch-javascript', 'Watch javascript', function () {

  gulp.watch ( input.getPath ( 'javascript.all' ), ['build-javascript'] );

});
