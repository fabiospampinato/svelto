
/* =========================================================================
 * Svelto - Tasks - Watch
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var gulp = require ( 'gulp-help' )( require ( 'gulp' ) );

/* WATCH */

gulp.task ( 'watch', 'Watch for changes and auto rebuild', ['watch-fonts', 'watch-images', 'watch-javascript', 'watch-scss'] );
