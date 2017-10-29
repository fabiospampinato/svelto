
/* =========================================================================
 * Svelto - Tasks - Utilities - Tokens
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      project = require ( '../../config/project' );

/* TOKENS */

const tokens = {

  parse ( paths ) {

    paths = _.castArray ( paths );

    _.forOwn ( project.paths.tokens, ( replacements, token ) => {

      replacements = _.castArray ( replacements );

      paths = _.uniq ( _.flatten ( paths.map ( path => {

        return replacements.map ( replacement => path.replace ( `[${token}]`, replacement ) );

      })));

    });

    return paths.length === 1 ? paths[0] : paths;

  }

};

/* EXPORT */

module.exports = tokens;
