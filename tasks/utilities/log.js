
/* =========================================================================
 * Svelto - Tasks - Utilities - Log
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var notifier = require ( 'node-notifier' ),
    path     = require ( 'path' ),
    gutil    = require ( 'gulp-util' ),
    chalk    = gutil.colors;

/* UTILITIES */

var line = function ( type, style, message ) {

  return '[' + chalk[style]( type ) + '] ' + message + '\n';

};

/* LOG */

var log = {

  buffer: function ( buffer ) {

    console.log ( buffer.toString ( 'utf8' ) );

  },

  error: function ( error ) {

    /* NOTIFICATION */

    notifier.notify ({
      title: 'Plugin error [' + error.plugin + ']',
      message: 'A task failed, check the console',
      icon: path.join ( process.cwd (), 'logo.png' ),
      sound: 'Basso',
      wait: false
    });

    /* LOG */

    var report = '';

    report += line ( 'Error', 'red', 'Plugin `' + chalk.underline ( error.plugin ) + '` encountered an error' );
    if ( error.fileName || error.relativePath || error.file ) report += line ( 'File', 'yellow', error.fileName || error.relativePath || error.file );
    if ( error.lineNumber || error.line ) report += line ( 'Line', 'yellow', error.lineNumber || error.line );
    if ( error.columnNumber || error.column ) report += line ( 'Column', 'yellow', error.columnNumber || error.column );
    report += line ( 'Message', 'yellow', error.messageFormatted || error.message );
    if ( error.codeFrame ) report += line ( 'Code', 'yellow', '\n' + error.codeFrame );

    console.log ( report );

    /* ENDING */

    // Prevents `watch` tasks from crashing

    this.emit ( 'end' );

  }

};

/* EXPORT */

module.exports = log;
