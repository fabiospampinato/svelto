
/* =========================================================================
 * Svelto - Tasks - Build - Javascript (Temp)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Saving a list of the files order and using it will greatly improve performance in the case where we are adding a new file, so that we won't need to clean the directory and parse all the files again

/* REQUIRE */

var _            = require ( 'lodash' ),
    del          = require ( 'del' ),
    path         = require ( 'path' ),
    project      = require ( '../config/project' ),
    plugins      = project.plugins,
    changed      = require ( '../utilities/changed' ),
    input        = require ( '../utilities/input' ),
    log          = require ( '../utilities/log' ),
    output       = require ( '../utilities/output' ),
    dependencies = require ( '../plugins/dependencies' ),
    extend       = require ( '../plugins/extend' ),
    filter       = require ( '../plugins/filter' ),
    override     = require ( '../plugins/override' ),
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    babel        = require ( 'gulp-babel' ),
    flatten      = require ( 'gulp-flatten' ),
    foreach      = require ( 'gulp-foreach' ),
    gulpif       = require ( 'gulp-if' ),
    newer        = require ( 'gulp-newer' ),
    plumber      = require ( 'gulp-plumber' );

/* JAVASCRIPT TEMP */

gulp.task ( 'build-javascript-temp', false, function () {

  if ( !project.isDevelopment ) return;

  var needCleaning = changed.project ( 'components' ) || changed.project ( 'output.javascript' ) || changed.plugins ( 'filter', 'override', 'dependencies', 'extend' ),
      needUpdate   = needCleaning || changed.plugin ( 'babel' );

  if ( needCleaning ) {

    del ( output.getPath ( 'javascript.temp' ), plugins.del.options );

  }

  var dependencyIndex = 1;

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( foreach ( function ( stream, file ) {
               var basename = path.basename ( file.path );
               file.path = file.path.replace ( basename, _.padStart ( dependencyIndex++, 3, 0 ) + '-' + basename );
               return stream;
             }))
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.temp' ) ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
             .pipe ( gulp.dest ( output.getPath ( 'javascript.temp' ) ) );

});
