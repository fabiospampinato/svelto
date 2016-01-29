
/* =========================================================================
 * Svelto - Tasks - Utilities - File
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _  = require ( 'lodash' ),
    fs = require ( 'fs' );

/* FILE */

var file = {

  load: function ( path, defaultValue ) {

    var file = _.attempt ( require, path );

    return _.isError ( file ) ? defaultValue : file;

  },

  write: function ( path, content ) {

    fs.writeFileSync ( path, JSON.stringify ( content ) );

  }

};

/* EXPORT */

module.exports = file;
