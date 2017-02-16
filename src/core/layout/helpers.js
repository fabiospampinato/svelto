
/* =========================================================================
 * Svelto - Core - Layout
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

// `body` is used as a fallback

(function ( $, _, Svelto ) {

  'use strict';

  /* LAYOUT */

  $.$layout = $('.layout, .body').first ();

  $.getLayoutOf = function ( ele ) {

    if ( ele ) {

      let $layout = $(ele).parent ().closest ( '.layout, body' );

      if ( $layout.length ) return $layout;

    }

    return $.$layout;

  };

}( Svelto.$, Svelto._, Svelto ));
