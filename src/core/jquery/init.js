
/* =========================================================================
 * Svelto - Core - jQuery (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/jquery.js
 * ========================================================================= */

(function () {

  'use strict';

  /* JQUERY */

  let $ = jQuery || $;

  /* CHECKING */

  let version = $ ? $().jquery : false,
      parts = version ? version.split ( '-' )[0].split ( '.' ) : false,
      supported = parts && Number ( parts[0] ) >= 1 && Number ( parts[1] ) >= 11 && Number ( parts[2] ) >= 2;

  if ( !$ || !supported ) {

    throw new Error ( 'Svelto depends upon jQuery v1.11.2 or higher, dependency not found' );

  }

  /* EXPORT */

  window.jQuery = $;

}());
