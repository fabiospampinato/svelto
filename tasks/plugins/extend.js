
/* =========================================================================
 * Svelto - Tasks - Plugins - Extend
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Export functions so that they can be used by `override` too

/* REQUIRE */

const _       = require ( 'lodash' ),
      path    = require ( 'path' ),
      through = require ( 'through2' ),
      gutil   = require ( 'gulp-util' ),
      fileU   = require ( '../utilities/file' );

/* UTILITIES */

function getFilePaths ( file ) {

  const module    = fileU.file2module ( file ),
        basename  = path.basename ( module ),
        dirs      = module.substr ( 0, module.indexOf ( basename ) ),
        ext       = path.extname ( basename ),
        fullname  = basename.substr ( 0, basename.indexOf ( ext ) ),
        nameParts = fullname.split ( '.' ),
        name      = nameParts.length > 1 ? nameParts.slice ( 0, nameParts.length - 1 ).join ( '.' ) : fullname,
        suffix    = nameParts.length > 1 ? _.last ( nameParts ) : '';

  return {
    module,
    dirs,
    basename,
    fullname,
    name,
    suffix,
    ext
  };

}

function getFilesPaths ( files ) {

  const paths = {};

  for ( let i = 0, l = files.length; i < l; i++ ) {

    paths[files[i].path] = getFilePaths ( files[i] );

  }

  return paths;

}

function partitionFiles ( files, paths, prefixes ) {

  return _.partition ( files, function ( file ) {

    return prefixes.indexOf ( paths[file.path].suffix ) === -1;

  });

}

function needsTarget ( file, paths, suffix ) {

  return paths[file.path].suffix === suffix;

}

function isTarget ( base, target, paths ) {

  return paths[base.path].dirs === paths[target.path].dirs && paths[base.path].ext === paths[target.path].ext && paths[base.path].name === paths[target.path].fullname;

}

function getTargetIndex ( file, files, paths ) {

  for ( let i = 0, l = files.length; i < l; i++ ) {

    if ( isTarget ( file, files[i], paths ) ) {

      return i;

    }

  }

  return -1;

}

/* WORKERS */

function workerPartial ( partition, paths, options ) {

  for ( let i = 0, l = partition[1].length; i < l; i++ ) {

    if ( needsTarget ( partition[1][i], paths, options.suffix ) ) {

      const ti = getTargetIndex ( partition[1][i], partition[0], paths );

      if ( ti >= 0 ) {

        options.callback ( partition[0][ti], partition[1][i] );

        partition[0].splice ( ti + options.offset, options.remove, partition[1][i] );
        partition[1][i] = false;

      }

    }

  }

  partition[1] = _.compact ( partition[1] );

}

function workerBefore ( partition, paths, config ) {

  workerPartial ( partition, paths, {
    suffix: 'before',
    offset: 0,
    remove: 0,
    callback: function ( base, extender ) {
      if ( config.log ) {
        console.log ( '`' + extender.path + '` has been prepended to `' + base.path + '`' );
      }
    }
  });

}

function workerAfter ( partition, paths, config ) {

  workerPartial ( partition, paths, {
    suffix: 'after',
    offset: 1,
    remove: 0,
    callback: function ( base, extender ) {
      if ( config.log ) {
        console.log ( '`' + extender.path + '` has been appendend to `' + base.path + '`' );
      }
    }
  });

}

/* WORKER */

function worker ( files, config ) {

  const paths = getFilesPaths ( files ),
        partition = partitionFiles ( files, paths, ['before', 'after'] );

  workerBefore ( partition, paths, config );
  workerAfter ( partition, paths, config );

  if ( partition[1].length ) {

    const filepaths = partition[1].map ( file => file.path );

    return new gutil.PluginError ( 'Extend', 'Missing target files for: ' + filepaths.join ( ', ' ) );

  } else {

    return partition[0];

  }

}

/* EXTEND */

function extend ( config ) {

  /* CONFIG */

  config = _.merge ({
    log: false
  }, config );

  /* VARIABLES */

  let files = [];

  /* EXTEND */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    files = worker ( files, config );

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

module.exports = extend;
