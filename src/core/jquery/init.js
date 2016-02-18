
/* =========================================================================
 * Svelto - jQuery (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* JQUERY */

  let $ = ( jQuery && 'jquery' in jQuery() ) ? jQuery : ( ( $ && 'jquery' in $() ) ? $ : false ); // Checking the presence of the `jquery` property in order to distinguish it from `Zepto` and other `jQuery`-like libraries

  /* CHECKING */

  if ( !$ ) {

    throw new Error ( 'Svelto depends upon jQuery, dependency not found' );

  }

  /* EXPORT */

  window.jQuery = $;

}());
