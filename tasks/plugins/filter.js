
/* =========================================================================
 * Svelto - Tasks - Plugins - Filter
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      through = require ( 'through2' ),
      gutil   = require ( 'gulp-util' ),
      project = require ( '../config/project' ),
      fileU   = require ( '../utilities/file' );

/* COMPONENTS */

function parseComponents ( obj, prefix ) {

  const parsed = {};

  for ( let key in obj ) {

    if ( obj.hasOwnProperty ( key ) ) {

      const value = obj[key];

      if ( _.isBoolean ( value ) ) {

        parsed[_.trim ( prefix + key, '/' )] = value;

      } else if ( _.isPlainObject ( value ) ) {

        parsed[_.trim ( prefix + key, '/' )] = true;

        _.extend ( parsed, parseComponents ( value, `${prefix}${key}/` ) );

      }

    }

  }

  return parsed;

}

/* UTILITIES */

function needsFiltering ( components, file ) {

  const module = fileU.file2module ( file ),
        maxPriority = module.split ( '/' ).length;

  let priority = 0,
      needs = false;

  for ( let component in components ) {

    if ( components.hasOwnProperty ( component ) ) {

      const newPriority = component.split ( '/' ).length;

      if ( newPriority > priority && newPriority <= maxPriority && _.startsWith ( module, component ) ) {

        priority = newPriority;
        needs = !components[component];

      }

    }

  }

  return needs;

}

function partitionFiles ( files, components ) {

  return _.partition ( files, _.partial ( needsFiltering, components ) );

}

function logFiltered ( files ) {

  if ( files.length ) {

    let list = 'Filtered files:\n';

    for ( let i = 0, l = files.length; i < l; i++ ) {

      list += _.padEnd ( i + 1, l.toString ().length ) + ' - ' + files[i].path;

      if ( i + 1 < l ) {

        list += '\n';

      }

    }

    console.log ( list );

  }

}

/* WORKER */

function worker ( files, config, components ) {

  const partition = partitionFiles ( files, components ),
        filtered = partition[0],
        allowed = partition[1];

  if ( config.log ) {

    logFiltered ( filtered );

  }

  return allowed;

}

/* FILTER */

function filter ( config ) {

  /* CONFIG */

  config = _.merge ({
    log: false
  }, config );

  /* VARIABLES */

  const components = parseComponents ( project.components, '' );

  let files = [];

  /* FILTER */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    files = worker ( files, config, components );

    if ( files instanceof gutil.PluginError ) {

      callback ( files );

    } else {

      for ( let i = 0, l = files.length; i < l; i++ ) {

        this.push ( files[i] );

      }

      callback ();

    }

  });

}

/* EXPORT */

module.exports = filter;
