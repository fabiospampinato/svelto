
/* =========================================================================
 * Svelto - Tasks - Clean
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      project = require ( '../config/project' ),
      plugins = project.plugins;

/* TASK */

function task () {

  return del ( project.paths.clean, plugins.del.options );

}

task.description = '[ALL] Clean generated files';

/* GULP */

gulp.task ( 'clean', task );
