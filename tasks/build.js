
/* =========================================================================
 * Svelto - Tasks - Build
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var gulp = require ( 'gulp' );

/* BUILD */

gulp.task ( 'build', ['build-fonts', 'build-images', 'build-javascript', 'build-css'] );
