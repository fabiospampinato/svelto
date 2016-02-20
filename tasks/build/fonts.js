
/* =========================================================================
 * Svelto - Tasks - Build - Fonts
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var plugins = require ( '../config/project' ).plugins,
    input   = require ( '../utilities/input' ),
    output  = require ( '../utilities/output' ),
    filter  = require ( '../plugins/filter' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) ),
    gulpif  = require ( 'gulp-if' ),
    flatten = require ( 'gulp-flatten' ),
    newer   = require ( 'gulp-newer' );

/* FONTS */

gulp.task ( 'build-fonts', 'Build fonts', function () {

  return gulp.src ( input.getPath ( 'fonts' ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( flatten () )
             .pipe ( newer ( output.getPath ( 'fonts' ) ) )
             .pipe ( gulp.dest ( output.getPath ( 'fonts' ) ) );

});
