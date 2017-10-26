
/* =========================================================================
 * Svelto - Tasks - Plugins - Dependencies
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      chalk   = require ( 'chalk' ),
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

function getFilePriority ( file, regex ) {

  const content = file.contents.toString ( 'utf8' );
        matches = getMatches ( content, regex );

  return Number ( _.last ( matches ) ) || 0;

}

function getFileTargets ( file, regex ) {

  const dirname = path.dirname ( fileU.file2module ( file ) ),
        content = file.contents.toString ( 'utf8' ),
        targets = getMatches ( content, regex );

  return targets.map ( function ( target ) {

    return ( target[0] === '.' ) ? path.join ( dirname, target ) : target;

  });

}

function inheritPriority ( modules, module ) {

  if ( module.dependencies && module.dependencies.length ) {

    for ( let di = 0, dl = module.dependencies.length; di < dl; di++ ) {

      const dep = modules[module.dependencies[di]],
            newPriority = Math.max ( dep.priority, module.priority );

      if ( dep.priority === newPriority ) continue;

      dep.priority = newPriority;

      inheritPriority ( modules, dep );

    }

  }

}

function getGraph ( files, config ) {

  const graph = {},
        modules = {};

  /* POPULATING */

  for ( let i = 0, l = files.length; i < l; i++ ) {

    const file = files[i];
    const module = {
      file: file,
      path: file.path,
      module: fileU.file2module ( file ),
      priority: config.priority ? getFilePriority ( file, config.priorityRe ) : 0,
      befores: getFileTargets ( file, config.beforeRe ),
      requires: getFileTargets ( file, config.requireRe )
    };

    graph[file.path] = module;
    modules[module.module] = module;

  }

  /* PARSING */

  for ( let i = 0, l = files.length; i < l; i++ ) {

    const module = graph[files[i].path];

    /* CHECKING BEFORE EXISTENCE */

    if ( module.befores && module.befores.length ) {

      for ( let bi = 0, bl = module.befores.length; bi < bl; bi++ ) {

        if ( !modules[module.befores[bi]] ) {

          module.befores[bi] = false;

        }

      }

      module.befores = _.compact ( module.befores );

    }

    /* DEPENDENCIES */

    module.dependencies = module.befores.concat ( module.requires );

    /* INHERITING PRIORITY */

    inheritPriority ( modules, module );

  }

  return graph;

}

function resolveGraph ( graph ) {

  const paths = _.sortBy ( _.keys ( graph ), [path => - graph[path].priority, _.identity] ),
        partition = _.partition ( paths, key => !graph[key].dependencies.length );

  let files = [],
      roots = partition[0],
      nodes = partition[1];

  function sortRoots ( roots ) {

    return _.sortBy ( roots, [root => - graph[root].priority, _.identity] );

  }

  function addRoot ( root ) {

    roots.push ( root );

    roots = sortRoots ( roots );

  }

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

          addRoot ( node );

        }

      }

    }

  };

  while ( roots.length ) { // The length will probably change dynamically

    let root = roots.shift ();

    resolveRoot ( root );

  }

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

    return new gutil.PluginError ( 'Dependencies', 'Circular dependencies found. Files involved: \n' + nodes.map ( node => `  ${node}` ).join ( '\n' ) );

  } else {

    return files;

  }

}

function logFiles ( graph, graphFiles ) {

  if ( graphFiles.length ) {

    let nrLength = graphFiles.length.toString ().length,
        list = 'Dependencies order:\n';

    for ( let i = 0, l = graphFiles.length; i < l; i++ ) {

      let path = graphFiles[i].path,
          priority = graph[path].priority,
          line = `${_.padEnd ( i + 1, nrLength )} - ${path}`;

      if ( priority ) {

        let arrow = priority > 0 ? '↑' : '↓',
            color = priority > 0 ? 'green' : 'red';

        line += ` (${priority}${arrow})`;

        line = chalk[color]( line );

      }

      if ( i + 1 < l ) {

        line += '\n';

      }

      list += line;

    }

    console.log ( list );

  }

}

/* WORKER */

function worker ( files, config ) {

  const graph = getGraph ( files, config ),
        graphFiles = resolveGraph ( graph );

  return {graph, graphFiles};

}

/* DEPENDENCIES */

function dependencies ( config ) {

  /* CONFIG */

  config = _.merge ({
    priority: true,
    priorityRe: /@priority[\s]+([0-9]+)[\s]*/g, //TODO: Add support for float priorities
    beforeRe: /@before[\s]+([\S]+\.[\S]+)[\s]*/g,
    requireRe: /@require[\s]+([\S]+\.[\S]+)[\s]*/g,
    log: false
  }, config );

  /* VARIABLES */

  let files = [];

  /* DEPENDENCIES */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    let {graph, graphFiles} = worker ( files, config );

    if ( graphFiles instanceof gutil.PluginError ) {

      callback ( graphFiles );

    } else {

      if ( config.log ) {

        logFiles ( graph, graphFiles );

      }

      for ( let i = 0, l = graphFiles.length; i < l; i++ ) {

        this.push ( graphFiles[i] );

      }

      callback ();

    }

  });

}

/* EXPORT */

module.exports = dependencies;
