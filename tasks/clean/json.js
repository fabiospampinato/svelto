
/* =========================================================================
 * Svelto - Tasks - Clean - JSON
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config/project' ).plugins,
      output  = require ( '../utilities/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'json' ), plugins.del.options );

}

task.description = '[ALL] Clean generated json';

/* GULP */

gulp.task ( 'clean-json', task );
