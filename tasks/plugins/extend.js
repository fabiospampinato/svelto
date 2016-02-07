
/* =========================================================================
 * Svelto - Tasks - Plugins - Extend
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    path    = require ( 'path' ),
    through = require ( 'through2' );

/* UTILITIES */

var arrRemove = function ( arr, index ) {

  arr.splice ( index, 1 );

};

var arrMove = function ( arr, from, to ) {

  arr.splice ( to, 0, arr.splice ( from, 1 )[0] );

};

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

var needsTarget = function ( base, suffix ) {

  return base.suffix === suffix;

};

var isTarget = function ( base, target ) {

  return base.dirs === target.dirs && base.ext === target.ext && base.name === target.fullname;

};

var getTargetIndex = function ( base, targets ) {

  for ( var i = 0, l = targets.length; i < l; i++ ) {

    if ( isTarget ( base, targets[i] ) ) {

      return i;

    }

  }

  return -1;

};

/* WORKERS */

var workerBefore = function ( files, paths ) {

  for ( var i = 0; i < files.length; i++ ) {

    if ( !paths[i]._done && needsTarget ( paths[i], 'before' ) ) {

      paths[i]._done = true;

      var ti = getTargetIndex ( paths[i], paths );

      if ( ti === -1 ) {

        arrRemove ( files, i );
        arrRemove ( paths, i );

        i--;

      } else if ( ti === i + 1 ) {

        continue;

      } else if ( ti > i ) {

        arrMove ( files, i, ti - 1 );
        arrMove ( paths, i, ti - 1 );

        i--;

      } else {

        arrMove ( files, i, ti );
        arrMove ( paths, i, ti );

      }

    }

  }

};

var workerAfter = function ( files, paths ) {

  for ( var i = 0; i < files.length; i++ ) {

    if ( !paths[i]._done && needsTarget ( paths[i], 'after' ) ) {

      paths[i]._done = true;

      var ti = getTargetIndex ( paths[i], paths );

      if ( ti === -1 ) {

        arrRemove ( files, i );
        arrRemove ( paths, i );

        i--;

      } else if ( ti === i - 1 ) {

        continue;

      } else if ( ti > i ) {

        arrMove ( files, i, ti );
        arrMove ( paths, i, ti );

        i--;

      } else {

        arrMove ( files, i, ti + 1 );
        arrMove ( paths, i, ti + 1 );

      }

    }

  }

};

var workerOverride = function ( files, paths ) {

  for ( var i = 0; i < files.length; i++ ) {

    if ( !paths[i]._done && needsTarget ( paths[i], 'override' ) ) {

      paths[i]._done = true;

      var ti = getTargetIndex ( paths[i], paths );

      if ( ti === -1 ) {

        arrRemove ( files, i );
        arrRemove ( paths, i );

      } else if ( ti > i ) {

        arrMove ( files, i, ti );
        arrMove ( paths, i, ti );
        arrRemove ( files, ti - 1 );
        arrRemove ( paths, ti - 1 );

      } else if ( ti < i ) {

        arrMove ( files, i, ti + 1 );
        arrMove ( paths, i, ti + 1 );
        arrRemove ( files, ti );
        arrRemove ( paths, ti );

      }

      i--;

    }

  }

};

/* WORKER */

var worker = function ( files ) {

  var paths = files.map ( getFilePaths );

  workerBefore ( files, paths );
  workerAfter ( files, paths );
  workerOverride ( files, paths );

};

/* EXTEND */

var extend = function () {

  /* VARIABLES */

  var files = [];

  /* EXTEND */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    worker ( files );

    for ( var i = 0, l = files.length; i < l; i++ ) {

      this.push ( files[i] );

    }

    callback ();

  });

};

/* EXPORT */

module.exports = extend;
