
/* =========================================================================
 * Svelto - Tasks - Build - SCSS (Parts)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Maybe disable filtering for parts that won't generate any CSS, so that we can skip the style of a component while still keeping its variables/mixins/functions/keyframes

/* REQUIRE */

var merge        = require ( 'merge-stream' ),
    plugins      = require ( '../config/project' ).plugins,
    changed      = require ( '../utilities/changed' ),
    input        = require ( '../utilities/input' ),
    log          = require ( '../utilities/log' ),
    output       = require ( '../utilities/output' ),
    dependencies = require ( '../plugins/dependencies' ),
    extend       = require ( '../plugins/extend' ),
    filter       = require ( '../plugins/filter' ),
    override     = require ( '../plugins/override' ),
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    gulpif       = require ( 'gulp-if' ),
    concat       = require ( 'gulp-concat' ),
    newer        = require ( 'gulp-newer' ),
    plumber      = require ( 'gulp-plumber' );

/* SCSS PARTS */

gulp.task ( 'build-scss-parts', false, function () {

  var needUpdate = changed.project ( 'components' ) || changed.plugins ( 'filter', 'override', 'dependencies', 'extend' );

  var parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'],
      filterable = [false, false, false, true, true];

  var streams = parts.map ( function ( part, index ) {

    return gulp.src ( input.getPath ( 'scss.' + part ) )
               .pipe ( plumber ( log.error ) )
               .pipe ( gulpif ( filterable[index] && plugins.filter.enabled, filter ( plugins.filter.options ) ) )
               .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'scss.' + part ) ) ) )
               .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
               .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
               .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
               .pipe ( concat ( output.getName ( 'scss.' + part ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'scss.' + part ) ) );

  });

  return merge.apply ( undefined, streams );

});
