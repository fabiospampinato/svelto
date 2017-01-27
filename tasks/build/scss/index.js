
/* =========================================================================
 * Svelto - Tasks - Build - SCSS
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp   = require ( 'gulp' ),
      concat = require ( 'gulp-concat' ),
      newer  = require ( 'gulp-newer' ),
      output = require ( '../../utilities/output' );

/* TASK */

function task () {

  const parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'];

  return gulp.src ( parts.map ( part => output.getPath ( `scss.${part}` ) ) )
             .pipe ( newer ( output.getPath ( 'scss.all' ) ) )
             .pipe ( concat ( output.getName ( 'scss.all' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'scss.all' ) ) );

}

task.description = '[ALL] Build scss';

/* GULP */

gulp.task ( 'build-scss', task );
