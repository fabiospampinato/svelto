
/* =========================================================================
 * Svelto - Tasks - Build - Javascript
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var env          = require ( '../../config/environment' ),
    plugins      = require ( '../../config/project' ).plugins,
    util         = require ( '../../others/utilities' ),
    gulp         = require ( 'gulp' ),
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

gulp.task ( 'build-javascript', ['build-javascript-temp'], function () {

  if ( env.isDevelopment ) {

    return gulp.src ( util.input.getPath ( 'javascript.temp' ) )
               .pipe ( newer ( util.output.getPath ( 'javascript.uncompressed' ) ) )
               .pipe ( sort () )
               .pipe ( concat ( util.output.getName ( 'javascript.uncompressed' ) ) )
               .pipe ( gulp.dest ( util.output.getDir ( 'javascript.uncompressed' ) ) )
               .pipe ( rename ( util.output.getName ( 'javascript.compressed' ) ) )
               .pipe ( gulp.dest ( util.output.getDir ( 'javascript.compressed' ) ) );

  } else {

    return gulp.src ( util.input.getPath ( 'javascript.all' ) )
              //  .pipe ( newer ( DEST.js + '/svelto.js' ) ) //FIXME: Maybe nothing is changed in the files, but we switched between development and production so we should recompile
               .pipe ( sort () )
               .pipe ( dependencies ( plugins.dependencies ) )
               .pipe ( flatten () )
               .pipe ( concat ( util.output.getName ( 'javascript.uncompressed' ) ) )
               .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel ) ) )
               .on ( 'error', function ( err ) {
                 gutil.log ( err.message );
               })
               .pipe ( gulp.dest ( util.output.getDir ( 'javascript.uncompressed' ) ) )
               .pipe ( gulpif ( plugins.uglify.enabled, uglify ( plugins.uglify ) ) )
               .pipe ( rename ( util.output.getName ( 'javascript.uncompressed' ) ) )
               .pipe ( gulp.dest ( util.output.getDir ( 'javascript.uncompressed' ) ) );

  }

});
