
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
          roots = require ( '../config/project' ).paths.input.roots, // In order to avoid a cyclic dependency
          absRoots = roots.map ( root => path.isAbsolute ( root ) ? root : path.resolve ( cwd, root ) ),
          absRootRe = new RegExp ( `^(${absRoots.map ( _.escapeRegExp ).join ( '|' )})\/?` );

    return file.path.replace ( /[\\|/]+/g, '/' )
                    .replace ( absRootRe, '' );

  }

};

/* EXPORT */

module.exports = file;
