
/* =========================================================================
 * Svelto - Tasks - Build - Images
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var changed  = require ( '../utilities/changed' ),
    input    = require ( '../utilities/input' ),
    log      = require ( '../utilities/log' ),
    output   = require ( '../utilities/output' ),
    filter   = require ( '../plugins/filter' ),
    override = require ( '../plugins/override' ),
    plugins  = require ( '../config/project' ).plugins,
    gulp     = require ( 'gulp-help' )( require ( 'gulp' ) ),
    bytediff = require ( 'gulp-bytediff' ),
    flatten  = require ( 'gulp-flatten' ),
    gulpif   = require ( 'gulp-if' ),
    imagemin = require ( 'gulp-imagemin' ),
    newer    = require ( 'gulp-newer' ),
    plumber  = require ( 'gulp-plumber' );

/* IMAGES */

gulp.task ( 'build-images', 'Build images', function () {

var needUpdate = changed.plugins ( 'override', 'imagemin' );

  return gulp.src ( input.getPath ( 'images' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'images' ) ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, imagemin ( plugins.imagemin.options ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.stop () ) )
             .pipe ( gulp.dest ( output.getPath ( 'images' ) ) );

});
