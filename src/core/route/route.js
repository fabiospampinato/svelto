
/* =========================================================================
 * Svelto - Core - Route
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* PUSHSTATE */

(function ( $, _, Svelto, history ) {

  'use strict';

  $(function () {

    let $window = $(window),
        pushState = history.pushState;

    history.pushState = function ( state ) {

      if ( _.isFunction ( history.onpushstate ) ) {

        history.onpushstate ( { state: state } );

      }

      $window.trigger ( 'pushstate' );

      return pushState.apply ( history, arguments );

    };

  });

})( Svelto.$, Svelto._, Svelto, window.history );

/* ROUTE */

(function ( $, _, Svelto ) {

  'use strict';

  $(function () {

    let $window = $(window),
        previous = window.location.href.split ( '#' )[0];

    $window.on ( 'popstate pushstate', function () {

      _.defer ( function () { // We need the `window.location.href` to get updated before

        let current = window.location.href.split ( '#' )[0];

        if ( current !== previous ) {

          previous = current;

          $window.trigger ( 'route' );

        }

      });

    });

  });

})( Svelto.$, Svelto._, Svelto, window.history );
