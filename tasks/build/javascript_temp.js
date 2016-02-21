
/* =========================================================================
 * Svelto - Tasks - Build - Javascript (Temp)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//FIXME: Make it work in a different way, so that if we add new files we don't need to clean it up before (one may forget to do it)

/* REQUIRE */

var _            = require ( 'lodash' ),
    del          = require ( 'del' ),
    path         = require ( 'path' ),
    project      = require ( '../config/project' ),
    plugins      = project.plugins,
    changed      = require ( '../utilities/changed' ),
    input        = require ( '../utilities/input' ),
    output       = require ( '../utilities/output' ),
    dependencies = require ( '../plugins/dependencies' ),
    extend       = require ( '../plugins/extend' ),
    filter       = require ( '../plugins/filter' ),
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    babel        = require ( 'gulp-babel' ),
    flatten      = require ( 'gulp-flatten' ),
    foreach      = require ( 'gulp-foreach' ),
    gulpif       = require ( 'gulp-if' ),
    gutil        = require ( 'gulp-util' ),
    newer        = require ( 'gulp-newer' );

/* JAVASCRIPT TEMP */

gulp.task ( 'build-javascript-temp', false, function () {

  if ( !project.isDevelopment ) return;

  var needCleaning = changed.project ( 'components' ) || changed.project ( 'output.javascript' ) || changed.plugins ( 'filter', 'dependencies', 'extend' ),
      needUpdate   = needCleaning || changed.plugin ( 'babel' );

  if ( needCleaning ) {

    del ( output.getPath ( 'javascript.temp' ), plugins.del.options );

  }

  var dependencyIndex = 1;

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( foreach ( function ( stream, file ) {
               var basename = path.basename ( file.path );
               file.path = file.path.replace ( basename, _.padLeft ( dependencyIndex++, 3, 0 ) + '-' + basename );
               return stream;
             }))
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.temp' ) ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
             .on ( 'error', function ( err ) { gutil.log ( err.message ); })
             .pipe ( gulp.dest ( output.getPath ( 'javascript.temp' ) ) );

});
