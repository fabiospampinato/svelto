
/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* SVELTO */

  let Svelto = {
    VERSION: '0.3.0-beta3',
    $: ( jQuery && 'jquery' in jQuery() ) ? jQuery : ( ( $ && 'jquery' in $() ) ? $ : false ), // Checking the presence of the `jquery` property in order to distinguish it from `Zepto` and other `jQuery`-like libraries
    _: ( lodash && Number ( lodash.VERSION[0] ) === 3 ) ? lodash : ( ( _ && 'VERSION' in _ && Number ( _.VERSION[0] ) === 3 ) ? _ : false ), // Checking the version also in order to distinguish it from `underscore`
    Widgets: {} // Namespace for the Svelto's widgets' classes
  };

  /* ERRORS */

  if ( !Svelto.$ ) {

    throw new Error ( 'Svelto depends upon jQuery, dependency not found' );

  }

  if ( !Svelto._ ) {

    throw new Error ( 'Svelto depends upon lodash, dependency not found' );

  }

  /* EXPORT */

  window.Svelto = Svelto;

}());
