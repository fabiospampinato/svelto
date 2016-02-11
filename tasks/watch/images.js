
/* =========================================================================
 * Svelto - Tasks - Watch - Images
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input = require ( '../utilities/input' ),
    gulp  = require ( 'gulp-help' )( require ( 'gulp' ) );

/* IMAGES */

gulp.task ( 'watch-images', 'Watch images', function () {

  return gulp.watch ( input.getPath ( 'images' ), ['build-images'] );

});
