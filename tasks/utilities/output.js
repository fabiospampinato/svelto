
/* =========================================================================
 * Svelto - Tasks - Utilities - Output
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      path    = require ( 'path' ),
      project = require ( '../config/project' );

/* OUTPUT */

const output = {

  getDir ( key ) {

    return path.parse ( this.getPath ( key ) ).dir;

  },

  getName ( key ) {

    return path.parse ( this.getPath ( key ) ).base;

  },

  getPath ( key ) {

    return _.get ( project.paths.output, key );

  }

};

/* EXPORT */

module.exports = output;
