
/* =========================================================================
 * Svelto - Tasks - Utilities - Log
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _        = require ( 'lodash' ),
      chalk    = require ( 'chalk' ),
      notifier = require ( 'node-notifier' ),
      path     = require ( 'path' ),
      gutil    = require ( 'gulp-util' );

/* UTILITIES */

const line = function ( type, style, message ) {

  type = chalk[style]( type );

  return `[${type}] ${message}\n`;

};

/* LOG */

const log = {

  buffer ( buffer ) {

    console.log ( buffer.toString ( 'utf8' ) );

  },

  error ( error ) {

    /* NOTIFICATION */

    notifier.notify ({
      title: 'Plugin error [' + error.plugin + ']',
      message: 'A task failed, check the console',
      icon: path.join ( process.cwd (), 'logo.png' ),
      sound: 'Basso',
      wait: false
    });

    /* LOG */

    let report = '';

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

  },

  options ( ...options ) {

    let output = [];

    for ( let [key, args] of options ) {

      let part = chalk.cyan ( `--${key}` );

      if ( args ) {

        if ( !_.isArray ( args ) ) args = [args];

        if ( args.length ) {

          part += '=' + args.map ( arg => chalk.magenta ( arg ) ).join ( '|' );

        }

      }

      output.push ( part );

    }

    return `[${output.join ( ', ' )}]`;

  }

};

/* EXPORT */

module.exports = log;
