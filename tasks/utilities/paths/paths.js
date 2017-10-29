
/* =========================================================================
 * Svelto - Tasks - Utilities - Paths
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      path    = require ( 'path' ),
      tokens  = require ( './tokens' ),
      project = require ( '../../config/project' );

/* PATHS */

const paths = {

  getDir ( key ) {

    const p = paths.getPath ( key ),
          name = path.parse ( p ).base;

    return name.includes ( '.' ) ? path.parse ( p ).dir : p;

  },

  getDirs ( key ) {

    const p = paths.getPath ( key );

    if ( !_.isPlainObject ( p ) ) return p;

    const subkeys = Object.keys ( p ),
          dirs = subkeys.map ( subkey => paths.getDir ( `${key}.${subkey}` ) );

    return _.uniq ( dirs );

  },

  getName ( key ) {

    const p = paths.getPath ( key );

    return path.parse ( p ).base;

  },

  getPath ( key ) {

    const p = _.get ( project.paths, key );

    if ( !_.isString ( p ) && !_.isArray ( p ) ) return p;

    return tokens.parse ( p );

  }

};

/* EXPORT */

module.exports = paths;
