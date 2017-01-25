
/* =========================================================================
 * Svelto - Tasks - Plugins - Extend
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Export functions so that they can be used by `override` too

/* REQUIRE */

var _       = require ( 'lodash' ),
    path    = require ( 'path' ),
    through = require ( 'through2' ),
    gutil   = require ( 'gulp-util' );

/* UTILITIES */

var getFilePaths = function ( file ) {

  var relative  = file.relative,
      basename  = path.basename ( relative ),
      dirs      = relative.substr ( 0, relative.indexOf ( basename ) ),
      ext       = path.extname ( basename ),
      fullname  = basename.substr ( 0, basename.indexOf ( ext ) ),
      nameParts = fullname.split ( '.' ),
      name      = nameParts.length > 1 ? nameParts.slice ( 0, nameParts.length - 1 ).join ( '.' ) : fullname,
      suffix    = nameParts.length > 1 ? _.last ( nameParts ) : '';

  return {
    relative: relative,
    dirs: dirs,
    basename: basename,
    fullname: fullname,
    name: name,
    suffix: suffix,
    ext: ext
  };

};

var getFilesPaths = function ( files ) {

  var paths = {};

  for ( var i = 0, l = files.length; i < l; i++ ) {

    paths[files[i].path] = getFilePaths ( files[i] );

  }

  return paths;

};

var partitionFiles = function ( files, paths, prefixes ) {

  return _.partition ( files, function ( file ) {

    return prefixes.indexOf ( paths[file.path].suffix ) === -1;

  });

};

var needsTarget = function ( file, paths, suffix ) {

  return paths[file.path].suffix === suffix;

};

var isTarget = function ( base, target, paths ) {

  return paths[base.path].dirs === paths[target.path].dirs && paths[base.path].ext === paths[target.path].ext && paths[base.path].name === paths[target.path].fullname;

};

var getTargetIndex = function ( file, files, paths ) {

  for ( var i = 0, l = files.length; i < l; i++ ) {

    if ( isTarget ( file, files[i], paths ) ) {

      return i;

    }

  }

  return -1;

};

/* WORKERS */

var workerPartial = function ( partition, paths, options ) {

  for ( var i = 0, l = partition[1].length; i < l; i++ ) {

    if ( needsTarget ( partition[1][i], paths, options.suffix ) ) {

      var ti = getTargetIndex ( partition[1][i], partition[0], paths );

      if ( ti >= 0 ) {

        options.callback ( partition[0][ti], partition[1][i] );

        partition[0].splice ( ti + options.offset, options.remove, partition[1][i] );
        partition[1][i] = false;

      }

    }

  }

  partition[1] = _.compact ( partition[1] );

};

var workerBefore = function ( partition, paths, config ) {

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

};

var workerAfter = function ( partition, paths, config ) {

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

};

/* WORKER */

var worker = function ( files, config ) {

  var paths = getFilesPaths ( files ),
      partition = partitionFiles ( files, paths, ['before', 'after'] );

  workerBefore ( partition, paths, config );
  workerAfter ( partition, paths, config );

  if ( partition[1].length ) {

    var filepaths = partition[1].map ( function ( file ) { return file.path; } );

    return new gutil.PluginError ( 'Extend', 'Missing target files for: ' + filepaths.join ( ', ' ) );

  } else {

    return partition[0];

  }

};

/* EXTEND */

var extend = function ( config ) {

  /* CONFIG */

  config = _.merge ({
    log: false
  }, config );

  /* VARIABLES */

  var files = [];

  /* EXTEND */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    files = worker ( files, config );

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

module.exports = extend;
