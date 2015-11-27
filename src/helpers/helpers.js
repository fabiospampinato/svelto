
/* =========================================================================
 * Svelto - Helpers
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../widgetize/widgetize.js
 * @requires ../pointer/pointer.js
 * @requires vendor/screenfull.js
 * ========================================================================= */

//TODO: Move to their own folders/files

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SCROLL TO TOP */

  Widgetize.add ( function () {

    $('.scroll-to-top').on ( Pointer.tap, () => {

      $body.add ( $html ).animate ( { scrollTop: 0 }, Svelto.animation.normal )

    });

  });

  /* FULLSCREEN */

  //TODO: Add the ability to trigger the fullscreen for a specific element
  //FIXME: It doesn't work in iOS's Safari and IE10
  //TODO: Add support

  Widgetize.add ( function () {

    $('.fullscreen-toggler').on ( Pointer.tap, screenfull.toggle );

  });

}( Svelto.$, Svelto._, window, document ));
