
/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* WIDGETIZE */

  window.Widgetize = new class {

    constructor () {

      this.widgetizers = [];

    }

    add ( widgetizer ) {

      this.widgetizers.push ( widgetizer );

    }

    get () {

      return this.widgetizers;

    }

    remove ( widgetizer ) {

      _.pull ( this.widgetizers, widgetizer );

    }

    on ( $root ) {

      for ( let widgetizer of this.widgetizers ) {

        widgetizer ( $root );

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

}( jQuery, _, window, document ));
