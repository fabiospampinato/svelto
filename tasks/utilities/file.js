
/* =========================================================================
 * Svelto - Tasks - Utilities - File
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _ = require ( 'lodash' );

/* FILE */

var file = {

  load: function ( path, defaultValue ) {

    var file = _.attempt ( require, path );

    return _.isError ( file ) ? defaultValue : file;

  }

};

/* EXPORT */

module.exports = file;
