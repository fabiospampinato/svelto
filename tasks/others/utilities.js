
/* =========================================================================
 * Svelto - Tasks - Others - Utilities
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    path    = require ( 'path' ),
    project = require ( '../config/project' );

/* UTILITIES */

var utilities = {

  /* FILE */

  loadFile: function ( path, defaultValue ) {

    var file = _.attempt ( require, path );

    return _.isError ( file ) ? defaultValue : file;

  },

  /* INPUT */

  input: {

    getDir: function ( key ) {

      return path.parse ( this.getPath ( key ) ).dir;

    },

    getName: function ( key ) {

      return path.parse ( this.getPath ( key ) ).base;

    },

    getPath: function ( key ) {

      return _.get ( project.paths.input, key );

    }

  },

  /* OUTPUT */

  output: {

    getDir: function ( key ) {

      return path.parse ( this.getPath ( key ) ).dir;

    },

    getName: function ( key ) {

      return path.parse ( this.getPath ( key ) ).base;

    },

    getPath: function ( key ) {

      return _.get ( project.paths.output, key );

    }

  }

};

/* EXPORT */

module.exports = utilities;
