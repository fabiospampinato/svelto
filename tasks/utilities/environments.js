
/* =========================================================================
 * Svelto - Tasks - Utilities - Environments
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _ = require ( 'lodash' );

/* ENVIRONMENTS */

const environments = {

  parse ( envs ) {

    if ( _.isArray ( envs ) ) return envs;

    return envs.split ( ',' ).map ( env => _.trim ( env ) );

  },

  pretty ( envs ) {

    if ( _.isString ( envs ) ) return environments.pretty ( envs.split ( ',' ) );

    return envs.join ( ' - ' );

  },

  get ( config, paths ) {

    return paths.map ( path => _.get ( config, `environments.${path}` ) ).filter ( env => env );

  }

};

/* EXPORT */

module.exports = environments;
