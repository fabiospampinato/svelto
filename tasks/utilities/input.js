
/* =========================================================================
 * Svelto - Tasks - Utilities - Input
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    path    = require ( 'path' ),
    project = require ( '../config/project' );

/* INPUT */

var input = {

  getDir: function ( key ) {

    return path.parse ( this.getPath ( key ) ).dir;

  },

  getName: function ( key ) {

    return path.parse ( this.getPath ( key ) ).base;

  },

  getPath: function ( key ) {

    return _.get ( project.paths.input, key );

  }

};

/* EXPORT */

module.exports = input;
