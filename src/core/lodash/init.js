
/* =========================================================================
 * Svelto - Core - lodash (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* LODASH */

  let _ = lodash || _;

  /* CHECKING */

  let version = _ ? _.VERSION : false,
      parts = version ? version.split ( '-' )[0].split ( '.' ) : false,
      supported = parts && Number ( parts[0] ) >= 4 && Number ( parts[1] ) >= 6 && Number ( parts[2] ) >= 1;

  if ( !_ || !supported ) {

    throw new Error ( 'Svelto depends upon lodash v4.6.1 or higher, dependency not found' );

  }

  /* EXPORT */

  window.lodash = _;

}());
