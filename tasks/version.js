
/* =========================================================================
 * Svelto - Tasks - Version
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    release = require ( './config/release' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) );

/* VERSION */

gulp.task ( 'version', 'Display Svelto\'s version', function () {

  console.log ( _.upperFirst ( release.name ) + ' version: ' + release.version );

});
