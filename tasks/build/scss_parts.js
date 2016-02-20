
/* =========================================================================
 * Svelto - Tasks - Build - SCSS (Parts)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _            = require ( 'lodash' ),
    merge        = require ( 'merge-stream' ),
    input        = require ( '../utilities/input' ),
    output       = require ( '../utilities/output' ),
    dependencies = require ( '../plugins/dependencies' ),
    extend       = require ( '../plugins/extend' ),
    filter       = require ( '../plugins/filter' ),
    project      = require ( '../config/project' ),
    projectPrev  = require ( '../config/previous/project' ),
    plugins      = project.plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    gulpif       = require ( 'gulp-if' ),
    concat       = require ( 'gulp-concat' ),
    newer        = require ( 'gulp-newer' ),
    sort         = require ( 'gulp-sort' );

/* SCSS PARTS */

gulp.task ( 'build-scss-parts', false, function () {

  var needUpdate = !_.isEqual ( _.get ( project, 'components' ), _.get ( projectPrev, 'components' ) );

  var parts = ['variables', 'functions', 'mixins', 'keyframes', 'style'];

  var streams = parts.map ( function ( part ) {

    return gulp.src ( input.getPath ( 'scss.' + part ) )
               .pipe ( filter () )
               .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'scss.' + part ) ) ) )
               .pipe ( dependencies ( plugins.dependencies.options ) )
               .pipe ( extend () )
               .pipe ( concat ( output.getName ( 'scss.' + part ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'scss.' + part ) ) );

  });

  return merge.apply ( undefined, streams );

});
