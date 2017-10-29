
/* =========================================================================
 * Svelto - Tasks - Utilities - Clean
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const paths = require ( './paths' );

/* CLEAN */

const clean = {

  getPath () {

    return paths.getPath ( 'clean' );

  }

};

/* EXPORT */

module.exports = clean;
