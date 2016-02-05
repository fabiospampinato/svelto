
/* =========================================================================
 * Svelto - Tasks - Build - Javascript
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _            = require ( 'lodash' ),
    input        = require ( '../utilities/input' ),
    output       = require ( '../utilities/output' ),
    filter       = require ( '../plugins/filter' ),
    project      = require ( '../config/project' ),
    projectPrev  = require ( '../config/previous/project' ),
    plugins      = project.plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    babel        = require ( 'gulp-babel' ),
    concat       = require ( 'gulp-concat' ),
    dependencies = require ( 'gulp-resolve-dependencies' ),
    flatten      = require ( 'gulp-flatten' ),
    gulpif       = require ( 'gulp-if' ),
    gutil        = require ( 'gulp-util' ),
    newer        = require ( 'gulp-newer' ),
    rename       = require ( 'gulp-rename' ),
    sort         = require ( 'gulp-sort' ),
    uglify       = require ( 'gulp-uglify' );

/* JAVASCRIPT */

gulp.task ( 'build-javascript', 'Build javascript', ['build-javascript-temp'], function () {

  if ( !!project.isDevelopment ) {

    return gulp.src ( input.getPath ( 'javascript.temp' ) )
               .pipe ( newer ( output.getPath ( 'javascript.uncompressed' ) ) )
               .pipe ( sort () )
               .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
               .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) );

  } else {

    var needUpdate = !_.isEqual ( _.get ( project, 'components' ), _.get ( projectPrev, 'components' ) ) ||
                     _.get ( project, 'plugins.babel.enabled' ) !== _.get ( projectPrev, 'plugins.babel.enabled' ) ||
                     !_.isEqual ( _.get ( project, 'plugins.babel.options' ), _.get ( projectPrev, 'plugins.babel.options' ) ) ||
                     _.get ( project, 'plugins.uglify.enabled' ) !== _.get ( projectPrev, 'plugins.uglify.enabled' ) ||
                     !_.isEqual ( _.get ( project, 'plugins.uglify.options' ), _.get ( projectPrev, 'plugins.uglify.options' ) );

    return gulp.src ( input.getPath ( 'javascript.all' ) )
               .pipe ( filter () )
               .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.uncompressed' ) ) ) )
               .pipe ( sort () )
               .pipe ( dependencies ( plugins.dependencies.options ) )
               .pipe ( flatten () )
               .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
               .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
               .on ( 'error', function ( err ) {
                 gutil.log ( err.message );
               })
               .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
               .pipe ( gulpif ( plugins.uglify.enabled, uglify ( plugins.uglify.options ) ) )
               .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
               .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) );

  }

});
