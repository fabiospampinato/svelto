
/* =========================================================================
 * Svelto - Ripple v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* RIPPLE */

  var Ripple = {

    delay: {
      show: 350,
      hide: 400
    },

    show: function ( event, $element ) {

      var $ripple = $( '<div class="ripple-circle">' ).appendTo ( $element ),
          offset = $element.offset (),
          eventXY = $.eventXY ( event ),
          now = _.now ();

      $ripple.css ({
        top: eventXY.Y - offset.top,
        left: eventXY.X - offset.left
      }).addClass ( 'ripple-circle-show' );

      $element.on ( Pointer.up + ' ' + Pointer.cancel, function () {

        Ripple.hide ( $ripple, now );

      });

    },

    hide: function ( $ripple, before ) {

      var delay = Math.max ( 0, Ripple.delay.show + before - _.now () );

      setTimeout ( function () {

        $ripple.addClass ( 'ripple-circle-hide' );

        setTimeout ( function () {

          $ripple.remove ();

        }, Ripple.delay.hide );

      }, delay );

    }
  };

  /* READY */

  $(function () {

    $body.on ( Pointer.down, '.ripple', function ( event ) {

      if ( event.button === $.ui.mouseButton.RIGHT ) return;

      Ripple.show ( event, $(this) );

    });

  });

}( jQuery, _, window, document ));
