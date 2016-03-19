
/* =========================================================================
 * Svelto - Core - Modernizr (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./vendor/modernizr.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* CHECKING */

  let version = Modernizr ? Modernizr._version : false,
      parts = version ? version.split ( '-' )[0].split ( '.' ) : false,
      supported = parts && Number ( parts[0] ) >= 3 && Number ( parts[1] ) >= 3 && Number ( parts[2] ) >= 1;

  if ( !Modernizr || !supported ) {

    throw new Error ( 'Svelto depends upon Modernizr v3.3.1 or higher, dependency not found' );

  }

}( window.Modernizr ));
