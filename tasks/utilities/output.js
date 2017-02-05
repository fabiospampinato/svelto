
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

    const p = output.getPath ( key );

    return _.last ( p.split ( '/' ) ).includes ( '.' ) ? path.parse ( p ).dir : p;

  },

  getDirs ( key ) {

    const path = output.getPath ( key );

    return _.isPlainObject ( path ) ? _.uniq ( Object.keys ( path ).map ( subkey => output.getDir ( `${key}.${subkey}` ) ) ) : path;

  },

  getName ( key ) {

    return path.parse ( output.getPath ( key ) ).base;

  },

  getPath ( key ) {

    return _.get ( project.paths.output, key );

  }

};

/* EXPORT */

module.exports = output;
