
/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var widgetizers = [];

  /* WIDGETIZE */

  window.Widgetize = function ( $root ) {

    for ( var i = 0, l = widgetizers.length; i < l; i++ ) {

      widgetizers[i]( $root );

    }

  };

  /* METHODS */

  Widgetize.add = function ( widgetizer ) {

    widgetizers.push ( widgetizer );

  };

  Widgetize.get = function () {

    return widgetizers;

  };

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Widgetize ( this );

    return this;

  };

  /* READY */

  $(function () {

    $body.widgetize ();

  });

}( jQuery, _, window, document ));
