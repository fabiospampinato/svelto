
/* =========================================================================
 * Svelto - Tasks - Build - SCSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var util   = require ( '../../others/utilities' ),
    gulp   = require ( 'gulp-help' )( require ( 'gulp' ) ),
    concat = require ( 'gulp-concat' ),
    newer  = require ( 'gulp-newer' );

/* SCSS */

gulp.task ( 'build-scss', 'Build SCSS', ['build-scss-parts'], function () {

 return gulp.src ( [util.output.getPath ( 'scss.variables' ), util.output.getPath ( 'scss.mixins' ), util.output.getPath ( 'scss.style' )] )
            .pipe ( newer ( util.output.getPath ( 'scss.all' ) ) )
            .pipe ( concat ( util.output.getName ( 'scss.all' ) ) )
            .pipe ( gulp.dest ( util.output.getDir ( 'scss.all' ) ) );

});
