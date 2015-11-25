
/* =========================================================================
 * Svelto - Time Ago
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'timeAgo',
    options: {
      timestamp: false,
      title: false,
      callbacks: {
        change () {}
      }
    }
  };

  /* TIME AGO */

  class TimeAgo extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '[data-timestamp]' ).timeAgo ();
      $root.filter ( '[data-timestamp]' ).timeAgo ();

      $root.find ( '[data-timestamp-title]' ).timeAgo ({ title: true });
      $root.filter ( '[data-timestamp-title]' ).timeAgo ({ title: true });

    }

    _variables () {

      this.$timeAgoElement = this.$element;

      if ( !this.options.timestamp ) {

        this.options.timestamp = this.$timeAgoElement.data ( this.options.title ? 'timestamp-title' : 'timestamp' );

      }

    }

    _init () {

      this._loop ( 0 );

    }

    /* PRIVATE */

    _loop ( wait ) {

      this._delay ( function () {

        this._loop ( this._update ().next );

      }, wait * 1000 );

    }

    _update () {

      let timeAgo = _.timeAgo ( this.options.timestamp );

      if ( this.options.title ) {

        this.$timeAgoElement.attr ( 'title', timeAgo.str );

      } else {

        this.$timeAgoElement.html ( timeAgo.str );

      }

      this._trigger ( 'change' );

      return timeAgo;

    }

  }

  /* BINDING */

  Svelto.TimeAgo = TimeAgo;
  Svelto.TimeAgo.config = config;

  /* FACTORY */

  $.factory ( Svelto.TimeAgo );

}( Svelto.$, Svelto._, window, document ));
