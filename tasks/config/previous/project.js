
/* =========================================================================
 * Svelto - Tasks - Config - Previous (Project)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* VARIABLES */

var PATH = require ( 'path' ).join ( __dirname, '.project.previous.json' );

/* REQUIRE */

var file     = require ( '../../utilities/file' ),
    previous = file.load ( PATH, {} ),
    project  = require ( '../project.js' );

/* UPDATE */

file.write ( PATH, project );

/* EXPORT */

module.exports = previous;
