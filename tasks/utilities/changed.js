
/* =========================================================================
 * Svelto - Tasks - Utilities - Changed
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _           = require ( 'lodash' ),
    project     = require ( '../config/project' ),
    projectPrev = require ( '../config/previous/project' );

/* CHANGED */

var changed = {

  project: function ( key ) {

    return key ? !_.isEqual ( _.get ( project, key ), _.get ( projectPrev, key ) ) : !_.isEqual ( project, projectPrev );

  },

  plugin: function ( name ) {

    return changed.project ( 'plugins.' + name );

  },

  plugins: function () {

    var names = Array.prototype.slice.call ( arguments );

    return names.length ? !!_.compact ( names.map ( changed.plugin ) ).length : changed.project ( 'plugins' );

  }

};

/* EXPORT */

module.exports = changed;
