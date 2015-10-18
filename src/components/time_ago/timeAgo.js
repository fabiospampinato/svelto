
/* =========================================================================
 * Svelto - Time Ago
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TIME AGO */

  $.factory ( 'svelto.timeAgo', {

    /* OPTIONS */

    options: {
      timestamp: false,
      title: false,
      callbacks: {
        change: _.noop
      }
    },

    /* SPECIAL */

    _widgetize: function ( $root ) {

      $root.find ( '[data-timestamp]' ).timeAgo ();
      $root.find ( '[data-timestamp-title]' ).timeAgo ({ title: true });

    },

    _variables: function () {

      this.$timeAgoElement = this.$element;

      if ( !this.options.timestamp ) {

        this.options.timestamp = this.$timeAgoElement.data ( this.options.title ? 'timestamp-title' : 'timestamp' );

      }

    },

    _init: function () {

      this._loop ( 0 );

    },

    /* PRIVATE */

    _loop: function ( wait ) {

      this._delay ( function () {

        this._loop ( this._update ().next );

      }, wait * 1000 );

    },

    _update: function () {

      var timeAgo = _.timeAgo ( this.options.timestamp );

      if ( this.options.title ) {

        this.$timeAgoElement.attr ( 'title', timeAgo.str );

      } else {

        this.$timeAgoElement.html ( timeAgo.str );

      }

      this._trigger ( 'change' );

      return timeAgo;

    }

  });

}( jQuery, _, window, document ));
