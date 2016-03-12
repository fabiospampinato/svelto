
/* =========================================================================
 * Svelto - Tasks - Utilities - Input
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    project = require ( '../config/project' );

/* INPUT */

var input = {

  getPath: function ( key ) {

    var roots = project.paths.input.roots,
        partials = _.get ( project.paths.input, key );

    roots = _.isString ( roots ) ? [roots] : roots;
    partials = _.isString ( partials ) ? [partials] : partials;

    var globs = roots.map ( function ( root ) {

      return partials.map ( function ( partial ) {

        return partial.replace ( /<root>/g, root );

      });

    });

    return _.uniq ( _.flatten ( globs ) );

  }

};

/* EXPORT */

module.exports = input;
