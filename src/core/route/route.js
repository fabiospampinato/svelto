
// @require core/push_state/push_state.js
// @require core/readify/readify.js

/* ROUTE */

(function ( $, _, Svelto, Readify ) {

  Readify.add ( function () {

    let previous = window.location.href.split ( '#' )[0];

    $.$window.on ( 'popstate pushstate', function () {

      setTimeout ( function () { // We need the `window.location.href` to get updated before

        let current = window.location.href.split ( '#' )[0];

        if ( current !== previous ) {

          previous = current;

          $.$window.trigger ( 'route' );

        }

      });

    });

  });

})( Svelto.$, Svelto._, Svelto, Svelto.Readify );
