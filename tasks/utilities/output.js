
/* =========================================================================
 * Svelto - Tasks - Utilities - Output
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    path    = require ( 'path' ),
    project = require ( '../config/project' );

/* OUTPUT */

var output = {

  getDir: function ( key ) {

    return path.parse ( this.getPath ( key ) ).dir;

  },

  getName: function ( key ) {

    return path.parse ( this.getPath ( key ) ).base;

  },

  getPath: function ( key ) {

    return _.get ( project.paths.output, key );

  }

};

/* EXPORT */

module.exports = output;
