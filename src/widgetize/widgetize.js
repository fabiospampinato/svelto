
/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* WIDGETIZE */

  class Widgetize {

    constructor () {

      this.widgetizers = {};

    }

    add ( selector, widgetizer, data ) {

      if ( !(selector in this.widgetizers) ) {

        this.widgetizers[selector] = [];

      }

      this.widgetizers[selector].push ( [widgetizer, data] );

    }

    get () {

      return this.widgetizers;

    }

    remove ( selector, widgetizer ) {

      if ( selector in this.widgetizers ) {

        for ( let i = 0, l = this.widgetizers[selector].length; i < l; i++ ) {

          if ( this.widgetizers[selector][i][0] === widgetizer ) {

            this.widgetizers[selector].splice ( i, 1 );

          }

        }

        if ( !this.widgetizers[selector].length ) {

          delete this.widgetizers[selector];

        }

      }

    }

    on ( $roots ) {

      for ( let selector in this.widgetizers ) {

        if ( this.widgetizers.hasOwnProperty ( selector ) ) {

          let widgetizers = this.widgetizers[selector];

          this.worker ( widgetizers, $roots.filter ( selector ) );
          this.worker ( widgetizers, $roots.find ( selector ) );

        }

      }

    }

    worker ( widgetizers, $widgets ) {

      for ( let widget of $widgets ) {

        for ( let [widgetizer, data] of widgetizers ) {

          widgetizer ( $(widget), data );

        }

      }

    }

  }

  /* EXPORT */

  Svelto.Widgetize = new Widgetize ();

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Svelto.Widgetize.on ( this );

    return this;

  };

  /* READY */

  $(function () {

    $(document.body).widgetize ();

  });

}( Svelto.$, Svelto._, Svelto ));
