
/* =========================================================================
 * Svelto - Tasks - Build - Fonts
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var changed = require ( '../utilities/changed' ),
    input   = require ( '../utilities/input' ),
    log     = require ( '../utilities/log' ),
    output  = require ( '../utilities/output' ),
    plugins = require ( '../config/project' ).plugins,
    filter  = require ( '../plugins/filter' ),
    extend  = require ( '../plugins/extend' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) ),
    gulpif  = require ( 'gulp-if' ),
    flatten = require ( 'gulp-flatten' ),
    gulpif  = require ( 'gulp-if' ),
    newer   = require ( 'gulp-newer' ),
    plumber = require ( 'gulp-plumber' );

/* FONTS */

gulp.task ( 'build-fonts', 'Build fonts', function () {

  var needUpdate = changed.plugin ( 'extend' );

  return gulp.src ( input.getPath ( 'fonts' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'fonts' ) ) ) )
             .pipe ( gulp.dest ( output.getPath ( 'fonts' ) ) );

});
