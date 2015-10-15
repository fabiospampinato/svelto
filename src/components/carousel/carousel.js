
/* =========================================================================
 * Svelto - Carousel v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CAROUSEL */

  $.factory ( 'svelto.carousel', {

    /* OPTIONS */

    options: {
      selectors: {
      },
      callbacks: {
      }
    },

    /* SPECIAL */

    _variables: function () {

    },

    _init: function () {

    },

    _events: function () {

    }

  });

  /* READY */

  $(function () {

    $('.carousel').carousel ();

  });

}( jQuery, _, window, document ));
