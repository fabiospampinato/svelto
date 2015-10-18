
/* =========================================================================
 * Svelto - Helpers v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../ui/ui.js
 * @requires ../pointer/Pointer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SCROLL TO TOP */

  $(function () {

    $('.scroll-to-top').on ( Pointer.tap, function () {

      $body.animate ({ scrollTop: 0 }, $.ui.animation.normal );

    });

  });

}( jQuery, _, window, document ));
