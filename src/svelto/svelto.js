
/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Remove the _ dependency, after all we use it only for a few functions

(function ( window, document, undefined ) {

  'use strict';

  /* SVELTO */

  window.Svelto = {
    version: '0.2.0-beta.2',
    $: jQuery || Zepto || $ || false,
    _: lodash || underscore || _ || false
  };

  /* ERRORS */

  if ( !Svelto.$ ) {

    throw 'Svelto depends upon jQuery, dependency unmet.';

  }

  if ( !Svelto._ ) {

    throw 'Svelto depends upon lo-dash, dependency unmet.'

  }

}( window, document ));
