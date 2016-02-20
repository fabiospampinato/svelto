
/* =========================================================================
 * Svelto - Tasks - Plugins - Filter
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    path    = require ( 'path' ),
    through = require ( 'through2' ),
    project = require ( '../config/project' ),
    gutil   = require ( 'gulp-util' );

/* COMPONENTS */

var parseComponents = function ( obj, prefix ) {

  var parsed = {};

  for ( var key in obj ) {

    if ( obj.hasOwnProperty ( key ) ) {

      var value = obj[key];

      if ( _.isBoolean ( value ) ) {

        parsed[_.trim ( prefix + key, '/' )] = value;

      } else if ( _.isPlainObject ( value ) ) {

        parsed[_.trim ( prefix + key, '/' )] = true;

        _.extend ( parsed, parseComponents ( value, prefix + key + '/' ) );

      }

    }

  }

  return parsed;

};

/* UTILITIES */

var needsFiltering = function ( components, file ) {

  var relative = path.dirname ( file.relative ).replace ( /\\\\/g, '/' ).replace ( /\/\//g, '/' ),
      maxPriority = relative.split ( '/' ).length,
      priority = 0,
      needs = false;

  if ( relative.indexOf ( path.sep ) === - 1 ) { //TODO: Remove it
    throw new Error ( 'needed check, apparently... at lest for: ' + relative );
  }

  for ( var component in components ) {

    if ( components.hasOwnProperty ( component ) ) {

      var newPriority = component.split ( '/' ).length;

      if ( newPriority > priority && newPriority <= maxPriority && _.startsWith ( relative, component ) ) {

        priority = newPriority;
        needs = !components[component];

      }

    }

  }

  return needs;

};

var partitionFiles = function ( files, components ) {

  return _.partition ( files, _.partial ( needsFiltering, components ) );

};

var logFiltered = function ( files ) {

  if ( files.length ) {

    var list = 'Filtered files:\n';

    for ( var i = 0, l = files.length; i < l; i++ ) {

      list += _.padRight ( i + 1, l.toString ().length ) + ' - ' + files[i].path;

      if ( i + 1 < l ) {

        list += '\n';

      }

    }

    console.log ( list );

  } else {

    console.log ( 'No files have been filtered' );

  }

};

/* WORKER */

var worker = function ( files, config, components ) {

  var partition = partitionFiles ( files, components ),
      filtered = partition[0],
      allowed = partition[1];

  if ( config.log ) {

    logFiltered ( filtered );

  }

  return allowed;

};

/* FILTER */

var filter = function ( config ) {

  /* CONFIG */

  config = _.merge ({
    log: false
  }, config );

  /* VARIABLES */

  var files = [],
      components = parseComponents ( project.components, '' );

  /* EXTEND */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    files = worker ( files, config, components );

    if ( files instanceof gutil.PluginError ) {

      callback ( files );

    } else {

      for ( var i = 0, l = files.length; i < l; i++ ) {

        this.push ( files[i] );

      }

      callback ();

    }

  });

};

/* EXPORT */

module.exports = filter;
