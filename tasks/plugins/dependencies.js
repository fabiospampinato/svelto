
/* =========================================================================
 * Svelto - Tasks - Plugins - Dependencies
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    path    = require ( 'path' ),
    through = require ( 'through2' ),
    gutil   = require ( 'gulp-util' );

/* UTILITIES */

var getMatches = function ( string, regex ) {

  var matches = [],
      match;

  do {

    match = regex.exec ( string );

    if ( match ) matches.push ( match[1] );

  } while ( match );

  return matches;

};

var getFileTargets = function ( file, regex ) {

  var dirname = path.dirname ( file.relative ),
      content = file.contents.toString ( 'utf8' ),
      targets = getMatches ( content, regex );

  return targets.map ( function ( target ) {

    return ( target[0] === '.' ) ? path.join ( dirname, target ) : target;

  });

};

var getGraph = function ( files, config ) {

  var graph = {};

  /* POPULATING */

  for ( var i = 0, l = files.length; i < l; i++ ) {

    var file = files[i];

    graph[file.path] = {
      file: file,
      path: file.path,
      module: file.relative,
      befores: getFileTargets ( file, config.before ),
      requires: getFileTargets ( file, config.require )
    };

  }

  /* PARSING */

  for ( var i = 0, l = files.length; i < l; i++ ) {

    var file = files[i];

    for ( var bi = 0, bl = graph[file.path].befores.length; bi < bl; bi++ ) {

      var found = _.find ( graph, function ( n ) { return n.module === graph[file.path].befores[bi]; } );

      if ( !found ) {

        graph[file.path].befores[bi] = false;

      }

    }

    graph[file.path].befores = _.compact ( graph[file.path].befores );
    graph[file.path].dependencies = graph[file.path].befores.concat ( graph[file.path].requires );

  }

  return graph;

};

var resolveGraph = function ( graph ) {

  var files = [],
      paths = _.keys ( graph ).sort (),
      partition = _.partition ( paths, function ( key ) { return !graph[key].dependencies.length; } ),
      roots = partition[0],
      nodes = partition[1];

  var resolveRoot = function ( root ) {

    var module = graph[root].module;

    files.push ( graph[root].file );

    for ( var ni = 0, nl = nodes.length; ni < nl; ni++ ) {

      var node = nodes[ni];

      if ( !node ) continue;

      if ( graph[node].dependencies.indexOf ( module ) >= 0 ) {

        _.remove ( graph[node].dependencies, function ( dep ) { return dep === module; } );

        if ( !graph[node].dependencies.length ) {

          nodes[ni] = false;

          resolveRoot ( node );

        }

      }

    }

  };

  roots.forEach ( resolveRoot );

  nodes = _.compact ( nodes );

  if ( nodes.length ) {

    for ( var ni = 0, nl = nodes.length; ni < nl; ni++ ) {

      var node = graph[nodes[ni]];

      if ( !node ) continue;

      for ( var di = 0, dl = node.dependencies.length; di < dl; di++ ) {

        var dep = node.dependencies[di],
            root = _.find ( graph, function ( n ) { return n.module === dep; } );

        if ( !root ) {

          return new gutil.PluginError ( 'Dependencies', '`' + node.path + '` requires `' + dep + '`, but it has not been found. Is the path corrent?' );

        }

      }

    }

    return new gutil.PluginError ( 'Dependencies', 'Circular dependencies found. Files involved: ' + nodes.join ( ', ' ) );

  } else {

    return files;

  }

};

var logFiles = function ( files ) {

  if ( files.length ) {

    var list = 'Dependencies order:\n';

    for ( var i = 0, l = files.length; i < l; i++ ) {

      list += _.padEnd ( i + 1, l.toString ().length ) + ' - ' + files[i].path;

      if ( i + 1 < l ) {

        list += '\n';

      }

    }

    console.log ( list );

  }

};

/* WORKER */

var worker = function ( files, config ) {

  return resolveGraph ( getGraph ( files, config ) );

};

/* DEPENDENCIES */

var dependencies = function ( config ) {

  /* CONFIG */

  config = _.merge ({
    before: /@before[\s]+([\S]+\.[\S]+)[\s]*/g,
    require: /@require[\s]+([\S]+\.[\S]+)[\s]*/g,
    log: false
  }, config );

  /* VARIABLES */

  var files = [];

  /* DEPENDENCIES */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    files = worker ( files, config );

    if ( files instanceof gutil.PluginError ) {

      callback ( files );

    } else {

      if ( config.log ) {

        logFiles ( files );

      }

      for ( var i = 0, l = files.length; i < l; i++ ) {

        this.push ( files[i] );

      }

      callback ();

    }

  });

};

/* EXPORT */

module.exports = dependencies;
