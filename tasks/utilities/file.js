
/* =========================================================================
 * Svelto - Tasks - Utilities - File
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _   = require ( 'lodash' ),
      fs  = require ( 'fs' ),
      rdf = require ( 'require-dot-file' );

/* FILE */

const file = {

  load ( path, defaultValue ) {

    const file = _.attempt ( require, path );

    return _.isError ( file ) ? defaultValue : file;

  },

  loadRecursive ( name, defaultValue ) {

    return rdf ( name ) || defaultValue;

  },

  write ( path, content ) {

    fs.writeFileSync ( path, JSON.stringify ( content ) );

  }

};

/* EXPORT */

module.exports = file;
