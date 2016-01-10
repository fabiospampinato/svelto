
/* =========================================================================
 * Svelto - Breakpoints
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Make it work with `.layout` instead of just with the window

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let intervals = _.sortBy ( _.values ( Svelto.breakpoints ) ),
      previous;

  /* FUNCTIONS */

  function getBreakpoint () {

    let width = $window.width ();

    for ( let i = 0, l = intervals.length; i < l; i++ ) {

      if ( width >= intervals[i] && ( i === l - 1 || width < intervals[i+1] ) ) {

        return _.findKey ( Svelto.breakpoints, interval => interval === intervals[i] );

      }

    }

  }

  function update () {

    let current = getBreakpoint ();

    if ( current !== previous ) {

      $window.trigger ( 'breakpoint:change', { breakpoint: current } );

      previous = current;

    }

  }

  /* READY */

  $(function () {

    update ();

    $window.on ( 'resize', _.throttle ( update, 150 ) );

  });

}( Svelto.$, Svelto._, window, document ));
