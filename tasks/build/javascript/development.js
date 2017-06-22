
/* =========================================================================
 * Svelto - Tasks - Build - Javascript - Development
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp   = require ( 'gulp' ),
      concat = require ( 'gulp-concat' ),
      newer  = require ( 'gulp-newer' ),
      rename = require ( 'gulp-rename' ),
      touch  = require ( 'gulp-touch-cmd' ),
      input  = require ( '../../utilities/input' ),
      output = require ( '../../utilities/output' );

/* TASK */

function task () {

  return gulp.src ( input.getPath ( 'javascript.temp' ) )
             .pipe ( newer ( output.getPath ( 'javascript.uncompressed' ) ) )
             .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
             .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) )
             .pipe ( touch () );

}

task.description = '[DEV] Build development javascript';

/* GULP */

gulp.task ( 'build-javascript-development', task );
