
/* =========================================================================
 * Svelto - Tasks - Build - SCSS
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var log     = require ( '../utilities/log' ),
    output  = require ( '../utilities/output' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) ),
    concat  = require ( 'gulp-concat' ),
    newer   = require ( 'gulp-newer' ),
    plumber = require ( 'gulp-plumber' );

/* SCSS */

gulp.task ( 'build-scss', 'Build SCSS', ['build-scss-parts'], function () {

  var parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'];

  return gulp.src ( parts.map ( function ( part ) { return output.getPath ( 'scss.' + part ); } ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( newer ( output.getPath ( 'scss.all' ) ) )
             .pipe ( concat ( output.getName ( 'scss.all' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'scss.all' ) ) );

});
