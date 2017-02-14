
/* =========================================================================
 * Svelto - Core - Route
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/push_state/push_state.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* ROUTE */

(function ( $, _, Svelto ) {

  'use strict';

  $(function () {

    let previous = window.location.href.split ( '#' )[0];

    Svelto.$window.on ( 'popstate pushstate', function () {

      _.defer ( function () { // We need the `window.location.href` to get updated before

        let current = window.location.href.split ( '#' )[0];

        if ( current !== previous ) {

          previous = current;

          Svelto.$window.trigger ( 'route' );

        }

      });

    });

  });

})( Svelto.$, Svelto._, Svelto );
