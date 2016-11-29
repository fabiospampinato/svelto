
/* =========================================================================
 * Svelto - Core - Breakpoint
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/breakpoints/breakpoints.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto, Breakpoints ) {

  'use strict';

  /* VARIABLES */

  let $window = $(window);

  /* BREAKPOINT */

  let Breakpoint = {

    /* VARIABLES */

    throttle: 150, // Milliseconds used to throttle the `$window.on ( 'resize' )` handler
    previous: undefined, // Previous breakpoint
    current: undefined, // Current breakpoint

    /* RESIZE */

    __resize () {

      let current = this.get ();

      if ( current === this.current ) return;

      this.previous = this.current;
      this.current = current;

      $window.trigger ( 'breakpoint:change' );

    },

    /* API */

    get () {

      let widths = _.sortBy ( _.values ( Breakpoints.widths ) ),
          width = $window.width ();

      for ( let i = 0, l = widths.length; i < l; i++ ) {

        if ( width >= widths[i] && ( i === l - 1 || width < widths[i+1] ) ) {

          return _.findKey ( Breakpoints.widths, width => width === widths[i] );

        }

      }

    }

  };

  /* READY */

  $(function () {

    Breakpoint.current = Breakpoint.get ();

    $window.on ( 'resize', _.throttle ( Breakpoint.__resize.bind ( Breakpoint ), Breakpoint.throttle ) );

  });

  /* EXPORT */

  Svelto.Breakpoint = Breakpoint;

}( Svelto.$, Svelto._, Svelto, Svelto.Breakpoints ));
