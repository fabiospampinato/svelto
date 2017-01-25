
/* =========================================================================
 * Svelto - Tasks - Utilities - File
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _   = require ( 'lodash' ),
    fs  = require ( 'fs' ),
    rdf = require ( 'require-dot-file' );

/* FILE */

var file = {

  load: function ( path, defaultValue ) {

    var file = _.attempt ( require, path );

    return _.isError ( file ) ? defaultValue : file;

  },

  loadRecursive: function ( name, defaultValue ) {

    return rdf ( name ) || defaultValue;

  },

  write: function ( path, content ) {

    fs.writeFileSync ( path, JSON.stringify ( content ) );

  }

};

/* EXPORT */

module.exports = file;
