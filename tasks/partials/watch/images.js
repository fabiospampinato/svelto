
/* =========================================================================
 * Svelto - Tasks - Watch - Images
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var util = require ( '../../others/utilities' ),
    gulp = require ( 'gulp-help' )( require ( 'gulp' ) );

/* IMAGES */

gulp.task ( 'watch-images', 'Watch images', function () {

  gulp.watch ( util.input.getPath ( 'images' ), ['build-images'] );

});
