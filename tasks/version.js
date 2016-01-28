
/* =========================================================================
 * Svelto - Tasks - Version
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRES */

var _       = require ( 'lodash' ),
    release = require ( './config/release' ),
    gulp    = require ( 'gulp' );

/* VERSION */

gulp.task ( 'version', function () {

  console.log ( _.capitalize ( release.name ) + ' version: ' + release.version );

});
