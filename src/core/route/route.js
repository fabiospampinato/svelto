
/* =========================================================================
 * Svelto - Core - Route
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/push_state/push_state.js
 * @require core/readify/readify.js
 * ========================================================================= */

/* ROUTE */

(function ( $, _, Svelto, Readify ) {

  'use strict';

  Readify.add ( function () {

    let previous = window.location.href.split ( '#' )[0];

    $.$window.on ( 'popstate pushstate', function () {

      _.defer ( function () { // We need the `window.location.href` to get updated before

        let current = window.location.href.split ( '#' )[0];

        if ( current !== previous ) {

          previous = current;

          $.$window.trigger ( 'route' );

        }

      });

    });

  });

})( Svelto.$, Svelto._, Svelto, Svelto.Readify );
