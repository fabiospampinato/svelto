
/* =========================================================================
 * Svelto - Tasks - Plugins - File log
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    through = require ( 'through2' );

/* UTILITIES */

var logFiles = function ( files ) {

  if ( files.length ) {

    var list = 'Files:\n';

    for ( var i = 0, l = files.length; i < l; i++ ) {

      list += _.padEnd ( i + 1, l.toString ().length ) + ' - ' + files[i].path;

      if ( i + 1 < l ) {

        list += '\n';

      }

    }

    console.log ( list );

  } else {

    console.log ( 'No files in the stream' );

  }

};

/* FILE LOG */

var filelog = function () {

  /* VARIABLES */

  var files = [];

  /* EXTEND */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    logFiles ( files );

    for ( var i = 0, l = files.length; i < l; i++ ) {

      this.push ( files[i] );

    }

    callback ();

  });

};

/* EXPORT */

module.exports = filelog;
