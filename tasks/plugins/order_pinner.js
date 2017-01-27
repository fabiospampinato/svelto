
/* =========================================================================
 * Svelto - Tasks - Plugins - Order Pinner
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      path    = require ( 'path' ),
      foreach = require ( 'gulp-foreach' ),
      newer   = require ( 'gulp-newer' );

/* ORDER PINNER */

function orderPinner ( stream, file ) {

  let index = 1;

  return foreach ( ( stream, file ) => {

    const basename = path.basename ( file.path ),
          padded   = _.padStart ( index++, 3, 0 ) + '-' + basename;

    file.path = file.path.replace ( basename, padded );

    return stream;

  });

}

/* EXPORT */

module.exports = orderPinner;
