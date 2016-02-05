
/* =========================================================================
 * Svelto - Tasks - Build - SCSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var output = require ( '../utilities/output' ),
    gulp   = require ( 'gulp-help' )( require ( 'gulp' ) ),
    concat = require ( 'gulp-concat' ),
    newer  = require ( 'gulp-newer' );

/* SCSS */

gulp.task ( 'build-scss', 'Build SCSS', ['build-scss-parts'], function () {

 return gulp.src ( [output.getPath ( 'scss.variables' ), output.getPath ( 'scss.mixins' ), output.getPath ( 'scss.style' )] )
            .pipe ( newer ( output.getPath ( 'scss.all' ) ) )
            .pipe ( concat ( output.getName ( 'scss.all' ) ) )
            .pipe ( gulp.dest ( output.getDir ( 'scss.all' ) ) );

});
