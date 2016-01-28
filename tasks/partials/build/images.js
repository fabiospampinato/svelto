
/* =========================================================================
 * Svelto - Tasks - Build - Images
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var path     = require ( 'path' ),
    env      = require ( '../../config/environment' ),
    plugins  = require ( '../../config/project' ).plugins,
    util     = require ( '../../others/utilities' ),
    gulp     = require ( 'gulp' ),
    bytediff = require ( 'gulp-bytediff' ),
    flatten  = require ( 'gulp-flatten' ),
    gulpif   = require ( 'gulp-if' ),
    imagemin = require ( 'gulp-imagemin' ),
    newer    = require ( 'gulp-newer' );

/* IMAGES */

//FIXME: We shoudn't compress images lossly
//FIXME: It doesn't work with SVGs, the blur.svg doesn't work anymore after

gulp.task ( 'build-images', function () {

  return gulp.src ( util.input.getPath ( 'images' ) )
             .pipe ( newer ({ //TODO: Maybe flattening before won't require to set a map function?
               dest: util.output.getPath ( 'images' ),
               map: path.basename
             }))
             .pipe ( gulpif ( plugins.imagemin.enabled && !env.isDevelopment, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled && !env.isDevelopment, imagemin ( plugins.imagemin ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled && !env.isDevelopment, bytediff.stop () ) )
             .pipe ( flatten () )
             .pipe ( gulp.dest ( util.output.getPath ( 'images' ) ) );

});
