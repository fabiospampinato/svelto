
/* =========================================================================
 * Svelto - Tasks - Build - SCSS (Parts)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var input        = require ( '../utilities/input' ),
    output       = require ( '../utilities/output' ),
    plugins      = require ( '../config/project' ).plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    merge        = require ( 'merge-stream' ),
    concat       = require ( 'gulp-concat' ),
    dependencies = require ( 'gulp-resolve-dependencies' ),
    newer        = require ( 'gulp-newer' ),
    sort         = require ( 'gulp-sort' );

/* SCSS PARTS */

gulp.task ( 'build-scss-parts', false, function () {

  var variables = gulp.src ( input.getPath ( 'scss.variables' ) )
                      .pipe ( newer ( output.getPath ( 'scss.variables' ) ) )
                      .pipe ( sort () )
                      .pipe ( dependencies ( plugins.dependencies ) )
                      .pipe ( concat ( output.getName ( 'scss.variables' ) ) )
                      .pipe ( gulp.dest ( output.getDir ( 'scss.variables' ) ) );

  var mixins = gulp.src ( input.getPath ( 'scss.mixins' ) )
                   .pipe ( newer ( output.getPath ( 'scss.mixins' ) )
                   .pipe ( sort () )
                   .pipe ( dependencies ( plugins.dependencies ) )
                   .pipe ( concat ( output.getName ( 'scss.mixins' ) ) ) )
                   .pipe ( gulp.dest ( output.getDir ( 'scss.mixins' ) ) );

  var style = gulp.src ( input.getPath ( 'scss.style' ) )
                  .pipe ( newer ( output.getPath ( 'scss.style' ) ) )
                  .pipe ( sort () )
                  .pipe ( dependencies ( plugins.dependencies ) )
                  .pipe ( concat ( output.getName ( 'scss.style' ) ) )
                  .pipe ( gulp.dest ( output.getDir ( 'scss.style' ) ) );

  return merge ( variables, mixins, style );

});
