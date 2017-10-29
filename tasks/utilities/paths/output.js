
/* =========================================================================
 * Svelto - Tasks - Utilities - Output
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const paths = require ( './paths' );

/* OUTPUT */

const output = {

  getDir ( key ) {

    return paths.getDir ( `output.${key}` );

  },

  getDirs ( key ) {

    return paths.getDirs ( `output.${key}` );

  },

  getName ( key ) {

    return paths.getName ( `output.${key}` );

  },

  getPath ( key ) {

    return paths.getPath ( `output.${key}` );

  }

};

/* EXPORT */

module.exports = output;
