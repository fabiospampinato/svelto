
/* =========================================================================
 * Svelto - Tasks - Watch - SCSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var util = require ( '../../others/utilities' ),
    gulp = require ( 'gulp' );

/* SCSS */

gulp.task ( 'watch-scss', function () {

  gulp.watch ( util.input.getPath ( 'scss.all' ), ['build-css'] );

});
