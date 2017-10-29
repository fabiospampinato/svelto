
/* =========================================================================
 * Svelto - Tasks - Utilities - File
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _    = require ( 'lodash' ),
      fs   = require ( 'fs' ),
      path = require ( 'path' ),
      rdf  = require ( 'require-dot-file' );

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

  },

  file2module ( file ) { //TODO: Maybe implement some caching mechanism

    const cwd = process.cwd (),
          src = require ( '../config/project' ).paths.tokens.src, // In order to avoid a cyclic dependency
          absSrc = src.map ( src => path.isAbsolute ( src ) ? src : path.resolve ( cwd, src ) ),
          absRootRe = new RegExp ( `^(${absSrc.map ( _.escapeRegExp ).join ( '|' )})\/?` );

    return file.path.replace ( /[\\|/]+/g, '/' )
                    .replace ( absRootRe, '' );

  }

};

/* EXPORT */

module.exports = file;
