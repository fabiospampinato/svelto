
/* =========================================================================
 * Svelto - Core - Push state
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

// Monkey patching `history.pushState` so that it will trigger an event that we can then use to properly trigger a `route` event

(function ( $, _, Svelto, history ) {

  'use strict';

  /* PUSH STATE */

  $(function () {

    let pushState = history.pushState;

    history.pushState = function ( state ) {

      if ( _.isFunction ( history.onpushstate ) ) {

        history.onpushstate ({ state });

      }

      Svelto.$window.trigger ( 'pushstate' );

      return pushState.apply ( history, arguments );

    };

  });

})( Svelto.$, Svelto._, Svelto, window.history );
