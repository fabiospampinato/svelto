
/* =========================================================================
 * Svelto - Tasks - Utilities - Input
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      project = require ( '../config/project' );

/* INPUT */

const input = {

  getPath ( key ) {

    let roots = project.paths.input.roots,
        partials = _.get ( project.paths.input, key );

    roots = _.isString ( roots ) ? [roots] : roots;
    partials = _.isString ( partials ) ? [partials] : partials;

    const globs = roots.map ( root => partials.map ( partial => partial.replace ( /<root>/g, root ) ) );

    return _.uniq ( _.flatten ( globs ) );

  }

};

/* EXPORT */

module.exports = input;
