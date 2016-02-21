
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
        partial = _.get ( project.paths.input, key );

    roots = _.isString ( roots ) ? [roots] : roots;

    return _.unique ( roots.map ( function ( root ) { return partial.replace ( /<root>/g, root ); } ) );

  }

};

/* EXPORT */

module.exports = input;
