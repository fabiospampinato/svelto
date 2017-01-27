
/* =========================================================================
 * Svelto - Tasks - Build - Javascript - Temp
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Saving a list of the files order and using it will greatly improve performance in the case where we are adding a new file, so that we won't need to clean the directory and parse all the files again

/* REQUIRE */

const _            = require ( 'lodash' ),
      del          = require ( 'del' ),
      path         = require ( 'path' ),
      gulp         = require ( 'gulp' ),
      babel        = require ( 'gulp-babel' ),
      flatten      = require ( 'gulp-flatten' ),
      foreach      = require ( 'gulp-foreach' ),
      gulpif       = require ( 'gulp-if' ),
      newer        = require ( 'gulp-newer' ),
      plugins      = require ( '../../config/project' ).plugins,
      changed      = require ( '../../utilities/changed' ),
      input        = require ( '../../utilities/input' ),
      output       = require ( '../../utilities/output' ),
      dependencies = require ( '../../plugins/dependencies' ),
      extend       = require ( '../../plugins/extend' ),
      filter       = require ( '../../plugins/filter' ),
      orderPinner  = require ( '../../plugins/order_pinner' ),
      override     = require ( '../../plugins/override' );

/* TASK */

function task () {

  const needCleaning = changed.project ( 'components' ) || changed.project ( 'output.javascript' ) || changed.plugins ( 'filter', 'override', 'dependencies', 'extend' ),
        needUpdate   = needCleaning || changed.plugin ( 'babel' );

  if ( needCleaning ) {

    del.sync ( output.getPath ( 'javascript.temp' ), plugins.del.options );

  }

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( orderPinner () )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.temp' ) ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
             .pipe ( gulp.dest ( output.getPath ( 'javascript.temp' ) ) );

}

task.description = '[DEV] Build temporary javascript';

/* GULP */

gulp.task ( 'build-javascript-temp', task );
