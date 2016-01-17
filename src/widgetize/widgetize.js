
/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* WIDGETIZE */

  window.Widgetize = new class {

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

          this.trigger ( selector, $roots.filter ( selector ) );
          this.trigger ( selector, $roots.find ( selector ) );

        }

      }

    }

    trigger ( selector, $widgets ) {

      for ( let widget of $widgets ) {

        for ( let [widgetizer, data] of this.widgetizers[selector] ) {

          widgetizer ( $(widget), data );

        }

      }

    }

  };

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Widgetize.on ( this );

    return this;

  };

  /* READY */

  $(function () {

    $body.widgetize ();

  });

}( Svelto.$, Svelto._, window, document ));
