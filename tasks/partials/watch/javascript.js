
/* =========================================================================
 * Svelto - Tasks - Watch - Javascript
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var util = require ( '../../others/utilities' ),
    gulp = require ( 'gulp' );

/* JAVASCRIPT */

gulp.task ( 'watch-javascript', function () {

  gulp.watch ( util.input.getPath ( 'javascript.all' ), ['build-javascript'] );

});
