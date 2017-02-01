
/* =========================================================================
 * Svelto - Tasks - Build - SCSS - Parts - General
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp         = require ( 'gulp' ),
      gulpif       = require ( 'gulp-if' ),
      concat       = require ( 'gulp-concat' ),
      newer        = require ( 'gulp-newer' ),
      plumber      = require ( 'gulp-plumber' ),
      touch        = require ( 'gulp-touch' ),
      plugins      = require ( '../../../config/project' ).plugins,
      changed      = require ( '../../../utilities/changed' ),
      log          = require ( '../../../utilities/log' ),
      input        = require ( '../../../utilities/input' ),
      output       = require ( '../../../utilities/output' ),
      dependencies = require ( '../../../plugins/dependencies' ),
      extend       = require ( '../../../plugins/extend' ),
      filter       = require ( '../../../plugins/filter' ),
      override     = require ( '../../../plugins/override' );

/* GENERAL */

function general ( name, filterable ) {

  const needUpdate = changed.project ( 'components' ) || changed.plugins ( 'filter', 'override', 'dependencies', 'extend' );

  return gulp.src ( input.getPath ( `scss.${name}` ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( filterable && plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( `scss.${name}` ) ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( concat ( output.getName ( `scss.${name}` ) ) )
             .pipe ( gulp.dest ( output.getDir ( `scss.${name}` ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = general;
