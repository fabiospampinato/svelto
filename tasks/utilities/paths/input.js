
/* =========================================================================
 * Svelto - Tasks - Utilities - Input
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const paths = require ( './paths' );

/* INPUT */

const input = {

  getPath ( key ) {

    return paths.getPath ( `input.${key}` );

  }

};

/* EXPORT */

module.exports = input;
