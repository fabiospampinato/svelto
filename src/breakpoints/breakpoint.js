
/* =========================================================================
 * Svelto - Breakpoint
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* BREAKPOINT */

  Svelto.Breakpoint = {

    /* VARIABLES */

    previous: undefined,
    current: undefined,

    /* RESIZE */

    __resize () {

      let current = this.get ();

      if ( current !== this.current ) {

        this.previous = this.current;
        this.current = current;

        $window.trigger ( 'breakpoint:change' );

      }

    },

    /* API */

    get () {

      let intervals = _.sortBy ( _.values ( Svelto.breakpoints ) ),
          width = $window.width ();

      for ( let i = 0, l = intervals.length; i < l; i++ ) {

        if ( width >= intervals[i] && ( i === l - 1 || width < intervals[i+1] ) ) {

          return _.findKey ( Svelto.breakpoints, interval => interval === intervals[i] );

        }

      }

    }

  };

  /* READY */

  $(function () {

    Svelto.Breakpoint.current = Svelto.Breakpoint.get ();

    $window.on ( 'resize', _.throttle ( Svelto.Breakpoint.__resize.bind ( Svelto.Breakpoint ), 150 ) );

  });

}( Svelto.$, Svelto._, window, document ));
