
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

    add ( selector, widgetizer ) {

      if ( !(selector in this.widgetizers) ) {

        this.widgetizers[selector] = [];

      }

      this.widgetizers[selector].push ( widgetizer );

    }

    get () {

      return this.widgetizers;

    }

    remove ( selector, widgetizer ) {

      if ( selector in this.widgetizers ) {

        _.pull ( this.widgetizers[selector], widgetizer );

        if ( this.widgetizers[selector].length === 0 ) {

          delete this.widgetizers[selector];

        }

      }

    }

    on ( $roots ) {

      for ( let selector in this.widgetizers ) {

        this.trigger ( selector, $roots.filter ( selector ) );
        this.trigger ( selector, $roots.find ( selector ) );

      }

    }

    trigger ( selector, $widgets ) {

      for ( let widget of $widgets ) {

        for ( let widgetizer of this.widgetizers[selector] ) {

          widgetizer ( $(widget) );

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
