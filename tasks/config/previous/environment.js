
/* =========================================================================
 * Svelto - Tasks - Config - Previous (Environment)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* VARIABLES */

var PATH = require ( 'path' ).join ( __dirname, '.environment.previous.json' );

/* REQUIRE */

var file        = require ( '../../utilities/file' ),
    previous    = file.load ( PATH, {} ),
    environment = require ( '../environment.js' );

/* UPDATE */

file.write ( PATH, environment );

/* EXPORT */

module.exports = previous;
