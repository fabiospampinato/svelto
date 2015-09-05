
/* =========================================================================
 * Svelto - Time Ago v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TIME AGO */

  $.widget ( 'presto.timeAgo', {

    /* OPTIONS */

    options: {
      timestamp: false,
      title: false,
      callbacks: {
        update: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$timeAgo_wrp = this.$element;

      this.options.timestamp = this.$timeAgo_wrp.data ( this.options.title ? 'timestamp-title' : 'timestamp' );

    },

    _init: function () {

      this._update_loop ( 0 );

    },

    /* PRIVATE */

    _update_loop: function ( wait ) {

      this._delay ( function () {

        this._update_loop ( this.update ().next );

      }, wait * 1000 );

    },

    /* PUBLIC */

    update: function () {

      var timeAgo = _.timeAgo ( this.options.timestamp );

      if ( this.options.title ) {

        this.$timeAgo_wrp.attr ( 'title', timeAgo.str );

      } else {

        this.$timeAgo_wrp.html ( timeAgo.str );

      }

      this._trigger ( 'update' );

      return timeAgo;

    }

  });

  /* READY */

  $(function () {

    $('[data-timestamp]').timeAgo ();
    $('[data-timestamp-title]').timeAgo ({ title: true });

  });

}( jQuery, _, window, document ));
