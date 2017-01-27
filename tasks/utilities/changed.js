
/* =========================================================================
 * Svelto - Tasks - Utilities - Changed
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _           = require ( 'lodash' ),
      argv        = require ( 'yargs' ).argv,
      project     = require ( '../config/project' ),
      projectPrev = require ( '../config/previous/project' );

/* CHANGED */

const changed = {

  _previous: JSON.parse ( JSON.stringify ( projectPrev ) ), // Using JSON so that all the objects get parsed the same way (basically for supporting functions)
  _current : JSON.parse ( JSON.stringify ( project     ) ), // Using JSON so that all the objects get parsed the same way (basically for supporting functions)

  project ( key ) {

    if ( argv.fresh ) return true;

    return key ? !_.isEqual ( _.get ( changed._current, key ), _.get ( changed._previous, key ) ) : !_.isEqual ( changed._current, changed._previous );

  },

  plugin ( name ) {

    return changed.project ( `plugins.${name}` );

  },

  plugins ( ...names ) {

    return names.length ? !!_.compact ( names.map ( changed.plugin ) ).length : changed.project ( 'plugins' );

  }

};

/* EXPORT */

module.exports = changed;
