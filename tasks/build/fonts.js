
/* =========================================================================
 * Svelto - Tasks - Build - Fonts
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input   = require ( '../utilities/input' ),
    output  = require ( '../utilities/output' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) ),
    filter  = require ( '../plugins/filter' ),
    flatten = require ( 'gulp-flatten' ),
    newer   = require ( 'gulp-newer' );

/* FONTS */

gulp.task ( 'build-fonts', 'Build fonts', function () {

  return gulp.src ( input.getPath ( 'fonts' ) )
             .pipe ( filter () )
             .pipe ( flatten () )
             .pipe ( newer ( output.getPath ( 'fonts' ) ) )
             .pipe ( gulp.dest ( output.getPath ( 'fonts' ) ) );

});
