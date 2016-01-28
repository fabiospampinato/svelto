
/* =========================================================================
 * Svelto - Tasks - Build - Javascript (Temp)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _            = require ( 'lodash' ),
    path         = require ( 'path' ),
    env          = require ( '../config/environment' ),
    input        = require ( '../utilities/input' ),
    output       = require ( '../utilities/output' ),
    plugins      = require ( '../config/project' ).plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    babel        = require ( 'gulp-babel' ),
    dependencies = require ( 'gulp-resolve-dependencies' ),
    flatten      = require ( 'gulp-flatten' ),
    foreach      = require ( 'gulp-foreach' ),
    gulpif       = require ( 'gulp-if' ),
    gutil        = require ( 'gulp-util' ),
    newer        = require ( 'gulp-newer' ),
    sort         = require ( 'gulp-sort' );

/* JAVASCRIPT TEMP */

gulp.task ( 'build-javascript-temp', false, function () {

  if ( !env.isDevelopment ) return;

  var dependencyIndex = 0;

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( sort () )
             .pipe ( dependencies ( plugins.dependencies.options ) )
             .pipe ( foreach ( function ( stream, file ) {
               var basename = path.basename ( file.path );
               file.path = file.path.replace ( basename, _.padLeft ( dependencyIndex++, 3, 0 ) + '-' + basename );
               return stream;
             }))
             .pipe ( newer ({ //TODO: Flattening it before won't require the use of a map function?
               dest: output.getPath ( 'javascript.temp' ),
               map: path.basename
             }))
             .pipe ( flatten () )
             .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
             .on ( 'error', function ( err ) {
               gutil.log ( err.message );
             })
             .pipe ( gulp.dest ( output.getPath ( 'javascript.temp' ) ) );

});
