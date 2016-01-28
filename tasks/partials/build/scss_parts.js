
/* =========================================================================
 * Svelto - Tasks - Build - SCSS (Parts)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var plugins      = require ( '../../config/project' ).plugins,
    util         = require ( '../../others/utilities' ),
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    merge        = require ( 'merge-stream' ),
    concat       = require ( 'gulp-concat' ),
    dependencies = require ( 'gulp-resolve-dependencies' ),
    newer        = require ( 'gulp-newer' ),
    sort         = require ( 'gulp-sort' );

/* SCSS PARTS */

gulp.task ( 'build-scss-parts', false, function () {

  var variables = gulp.src ( util.input.getPath ( 'scss.variables' ) )
                      .pipe ( newer ( util.output.getPath ( 'scss.variables' ) ) )
                      .pipe ( sort () )
                      .pipe ( dependencies ( plugins.dependencies ) )
                      .pipe ( concat ( util.output.getName ( 'scss.variables' ) ) )
                      .pipe ( gulp.dest ( util.output.getDir ( 'scss.variables' ) ) );

  var mixins = gulp.src ( util.input.getPath ( 'scss.mixins' ) )
                   .pipe ( newer ( util.output.getPath ( 'scss.mixins' ) )
                   .pipe ( sort () )
                   .pipe ( dependencies ( plugins.dependencies ) )
                   .pipe ( concat ( util.output.getName ( 'scss.mixins' ) ) ) )
                   .pipe ( gulp.dest ( util.output.getDir ( 'scss.mixins' ) ) );

  var style = gulp.src ( util.input.getPath ( 'scss.style' ) )
                  .pipe ( newer ( util.output.getPath ( 'scss.style' ) ) )
                  .pipe ( sort () )
                  .pipe ( dependencies ( plugins.dependencies ) )
                  .pipe ( concat ( util.output.getName ( 'scss.style' ) ) )
                  .pipe ( gulp.dest ( util.output.getDir ( 'scss.style' ) ) );

  return merge ( variables, mixins, style );

});
