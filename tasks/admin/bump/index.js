
/* =========================================================================
 * Svelto - Tasks - Admin - Bump
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' ),
      log  = require ( '../../utilities/log' );

/* TASK */

const task = gulp.series ( 'bump-npm', gulp.parallel ( 'bump-scss', 'bump-javascript', 'bump-meteor' ) );

task.description = '[ADMIN] Bump Svelto\'s version ' + log.options ( ['type', ['major', 'minor', 'patch', 'prerelease']], ['version', 'mayout.minor.patch'], ['preid', 'beta'] );

/* GULP */

gulp.task ( 'bump', task );
