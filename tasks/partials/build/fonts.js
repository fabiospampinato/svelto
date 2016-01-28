
/* =========================================================================
 * Svelto - Tasks - Build - Fonts
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var util    = require ( '../../others/utilities' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) ),
    flatten = require ( 'gulp-flatten' );

/* FONTS */

gulp.task ( 'build-fonts', 'Build fonts', function () {

  return gulp.src ( util.input.getPath ( 'fonts' ) )
             .pipe ( flatten () )
             .pipe ( gulp.dest ( util.output.getPath ( 'fonts' ) ) );

});
