
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
    filter       = require ( '../plugins/filter' ),
    project      = require ( '../config/project' ),
    projectPrev  = require ( '../config/previous/project' ),
    plugins      = project.plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    gulpif       = require ( 'gulp-if' ),
    concat       = require ( 'gulp-concat' ),
    dependencies = require ( 'gulp-resolve-dependencies' ),
    newer        = require ( 'gulp-newer' ),
    sort         = require ( 'gulp-sort' );

/* SCSS PARTS */

gulp.task ( 'build-scss-parts', false, function () {

  var needUpdate = !_.isEqual ( _.get ( project, 'components' ), _.get ( projectPrev, 'components' ) );

  var variables = gulp.src ( input.getPath ( 'scss.variables' ) )
                      .pipe ( filter () )
                      .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'scss.variables' ) ) ) )
                      .pipe ( sort () )
                      .pipe ( dependencies ( plugins.dependencies.options ) )
                      .pipe ( concat ( output.getName ( 'scss.variables' ) ) )
                      .pipe ( gulp.dest ( output.getDir ( 'scss.variables' ) ) );

  var mixins = gulp.src ( input.getPath ( 'scss.mixins' ) )
                   .pipe ( filter () )
                   .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'scss.mixins' ) ) ) )
                   .pipe ( sort () )
                   .pipe ( dependencies ( plugins.dependencies.options ) )
                   .pipe ( concat ( output.getName ( 'scss.mixins' ) ) )
                   .pipe ( gulp.dest ( output.getDir ( 'scss.mixins' ) ) );

  var style = gulp.src ( input.getPath ( 'scss.style' ) )
                  .pipe ( filter () )
                  .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'scss.style' ) ) ) )
                  .pipe ( sort () )
                  .pipe ( dependencies ( plugins.dependencies.options ) )
                  .pipe ( concat ( output.getName ( 'scss.style' ) ) )
                  .pipe ( gulp.dest ( output.getDir ( 'scss.style' ) ) );

  return merge ( variables, mixins, style );

});
