
// @require core/breakpoints/breakpoints.js
// @require core/readify/readify.js

(function ( $, _, Svelto, Breakpoints, Readify ) {

  'use strict';

  /* BREAKPOINT */

  let Breakpoint = {

    /* VARIABLES */

    previous: undefined, // Previous breakpoint
    current: undefined, // Current breakpoint

    /* RESIZE */

    __resize () {

      let current = this.get ();

      if ( current === this.current ) return;

      this.previous = this.current;
      this.current = current;

      $.$window.trigger ( 'breakpoint:change' );

    },

    /* API */

    init () {

      Breakpoint.current = Breakpoint.get ();

      $.$window.on ( 'resize', _.frames ( Breakpoint.__resize.bind ( Breakpoint ) ) );

    },

    get () {

      this._widths = this._widths || _.sortBy ( _.values ( Breakpoints.widths ) );
      this._width2breakpoint = this._width2breakpoint || _.invert ( Breakpoints.widths );

      let width = $.window.innerWidth;

      for ( let i = 0, l = this._widths.length; i < l; i++ ) {

        if ( width >= this._widths[i] && ( i === l - 1 || width < this._widths[i+1] ) ) {

          return this._width2breakpoint[this._widths[i]];

        }

      }

    }

  };

  /* INIT */

  Breakpoint.init ();

  /* EXPORT */

  Svelto.Breakpoint = Breakpoint;

}( Svelto.$, Svelto._, Svelto, Svelto.Breakpoints, Svelto.Readify ));
