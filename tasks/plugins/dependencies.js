
/* =========================================================================
 * Svelto - Tasks - Plugins - Dependencies
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      path    = require ( 'path' ),
      through = require ( 'through2' ),
      gutil   = require ( 'gulp-util' ),
      fileU   = require ( '../utilities/file' );

/* UTILITIES */

function getMatches ( string, regex ) {

  const matches = [];

  let match;

  do {

    match = regex.exec ( string );

    if ( match ) matches.push ( match[1] );

  } while ( match );

  return matches;

}

function getFileTargets ( file, regex ) {

  const dirname = path.dirname ( fileU.file2module ( file ) ),
        content = file.contents.toString ( 'utf8' ),
        targets = getMatches ( content, regex );

  return targets.map ( function ( target ) {

    return ( target[0] === '.' ) ? path.join ( dirname, target ) : target;

  });

}

function getGraph ( files, config ) {

  const graph = {};

  /* POPULATING */

  for ( let i = 0, l = files.length; i < l; i++ ) {

    const file = files[i];

    graph[file.path] = {
      file: file,
      path: file.path,
      module: fileU.file2module ( file ),
      befores: getFileTargets ( file, config.before ),
      requires: getFileTargets ( file, config.require )
    };

  }

  /* PARSING */

  for ( let i = 0, l = files.length; i < l; i++ ) {

    const file = files[i];

    for ( let bi = 0, bl = graph[file.path].befores.length; bi < bl; bi++ ) {

      const found = _.find ( graph, n => n.module === graph[file.path].befores[bi] );

      if ( !found ) {

        graph[file.path].befores[bi] = false;

      }

    }

    graph[file.path].befores = _.compact ( graph[file.path].befores );
    graph[file.path].dependencies = graph[file.path].befores.concat ( graph[file.path].requires );

  }

  return graph;

}

function resolveGraph ( graph ) {

  const paths = _.keys ( graph ).sort (),
        partition = _.partition ( paths, key => !graph[key].dependencies.length );

  let files = [],
      roots = partition[0],
      nodes = partition[1];

  function resolveRoot ( root ) {

    const module = graph[root].module;

    files.push ( graph[root].file );

    for ( let ni = 0, nl = nodes.length; ni < nl; ni++ ) {

      const node = nodes[ni];

      if ( !node ) continue;

      if ( graph[node].dependencies.indexOf ( module ) >= 0 ) {

        _.remove ( graph[node].dependencies, dep => dep === module );

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

    for ( let ni = 0, nl = nodes.length; ni < nl; ni++ ) {

      const node = graph[nodes[ni]];

      if ( !node ) continue;

      for ( let di = 0, dl = node.dependencies.length; di < dl; di++ ) {

        const dep = node.dependencies[di],
              root = _.find ( graph, n => n.module === dep );

        if ( !root ) {

          return new gutil.PluginError ( 'Dependencies', '`' + node.path + '` requires `' + dep + '`, but it has not been found. Is the path corrent?' );

        }

      }

    }

    return new gutil.PluginError ( 'Dependencies', 'Circular dependencies found. Files involved: ' + nodes.join ( ', ' ) );

  } else {

    return files;

  }

}

function logFiles ( files ) {

  if ( files.length ) {

    let list = 'Dependencies order:\n';

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

function worker ( files, config ) {

  return resolveGraph ( getGraph ( files, config ) );

}

/* DEPENDENCIES */

function dependencies ( config ) {

  /* CONFIG */

  config = _.merge ({
    before: /@before[\s]+([\S]+\.[\S]+)[\s]*/g,
    require: /@require[\s]+([\S]+\.[\S]+)[\s]*/g,
    log: false
  }, config );

  /* VARIABLES */

  let files = [];

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

      for ( let i = 0, l = files.length; i < l; i++ ) {

        this.push ( files[i] );

      }

      callback ();

    }

  });

}

/* EXPORT */

module.exports = dependencies;
