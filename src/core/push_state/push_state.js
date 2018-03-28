
// @require core/readify/readify.js

// Monkey patching `history.pushState` so that it will trigger an event that we can then use to properly trigger a `route` event

(function ( $, _, Svelto, Readify, history ) {

  /* PUSH STATE */

  Readify.add ( function () {

    let pushState = history.pushState;

    history.pushState = function ( state ) {

      if ( _.isFunction ( history.onpushstate ) ) {

        history.onpushstate ({ state });

      }

      $.$window.trigger ( 'pushstate' );

      return pushState.apply ( history, arguments );

    };

  });

})( Svelto.$, Svelto._, Svelto, Svelto.Readify, window.history );
