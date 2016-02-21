
/* =========================================================================
 * Svelto - Tasks - Build - SCSS (Parts)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Maybe disable filtering for parts that won't generate any CSS

/* REQUIRE */

var merge        = require ( 'merge-stream' ),
    plugins      = require ( '../config/project' ).plugins,
    changed      = require ( '../utilities/changed' ),
    input        = require ( '../utilities/input' ),
    output       = require ( '../utilities/output' ),
    dependencies = require ( '../plugins/dependencies' ),
    extend       = require ( '../plugins/extend' ),
    filter       = require ( '../plugins/filter' ),
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    gulpif       = require ( 'gulp-if' ),
    concat       = require ( 'gulp-concat' ),
    newer        = require ( 'gulp-newer' );

/* SCSS PARTS */

gulp.task ( 'build-scss-parts', false, function () {

  var needUpdate = changed.project ( 'components' ) || changed.plugins ( 'filter', 'dependencies', 'extend' );

  var parts = ['variables', 'functions', 'mixins', 'keyframes', 'style'];

  var streams = parts.map ( function ( part ) {

    return gulp.src ( input.getPath ( 'scss.' + part ) )
               .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
               .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'scss.' + part ) ) ) )
               .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
               .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
               .pipe ( concat ( output.getName ( 'scss.' + part ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'scss.' + part ) ) );

  });

  return merge.apply ( undefined, streams );

});
