
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
    VERSION: '0.3.0-beta2',
    $: jQuery ? jQuery : ( ( $ && 'jquery' in $() ) ? $ : false ), //INFO: Checking the presence of the `jquery` property in order to distinguish it from `Zepto` and other `jQuery`-like libraries
    _: lodash ? lodash : ( ( _ && 'VERSION' in _ && Number ( _.VERSION[0] ) === 3 ) ? _ : false ), //INFO: Checking the version also in order to distinguish it from `underscore`
    Widgets: {}
  };

  /* ERRORS */

  if ( !Svelto.$ ) {

    throw new Error ( 'Svelto depends upon jQuery, dependency unmet' );

  }

  if ( !Svelto._ ) {

    throw new Error ( 'Svelto depends upon lodash, dependency unmet' );

  }

  /* EXPORT */

  window.Svelto = Svelto;

}());
