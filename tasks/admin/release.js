
/* =========================================================================
 * Svelto - Tasks - Admin - Tag
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var gulp = require ( 'gulp-help' )( require ( 'gulp' ) ),
    tag  = require ( 'gulp-tag-version' );

/* RELEASE */

gulp.task ( 'release', 'Release Svelto and tag it', function () {

  return gulp.src ( './package.json' )
             .pipe ( tag () );

});
