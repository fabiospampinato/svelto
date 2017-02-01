
/* =========================================================================
 * Svelto - Widgets - Time Ago
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'timeAgo',
    plugin: true,
    selector: '.timeago, .time-ago',
    options: {
      timestamp: false, // UNIX timestamp
      title: false, // Update the title or the text?
      datas: {
        timestamp: 'timestamp'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* TIME AGO */

  class TimeAgo extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$timeAgoElement = this.$element;

    }

    _init () {

      if ( !this.options.timestamp ) {

        this.options.timestamp = this.$timeAgoElement.data ( this.options.datas.timestamp );

      }

      if ( this.isEnabled () ) {

        this._loop ();

      }

    }

    _destroy () {

      clearTimeout ( this.loopId );

    }

    /* LOOP */

    _loop ( seconds = 0 ) {

      this.loopId = this._delay ( function () {

        this._loop ( this._update ().next );

      }, seconds * 1000 );

    }

    /* UPDATE */

    _update () {

      let timeAgo = _.timeAgo ( this.options.timestamp );

      if ( this.options.title ) {

        this.$timeAgoElement.attr ( 'title', timeAgo.str );

      } else {

        this.$timeAgoElement.text ( timeAgo.str );

      }

      this._trigger ( 'change' );

      return timeAgo;

    }

    /* API OVERRIDES */

    enable () {

      super.enable ();

      this._loop ();

    }

    disable () {

      super.disable ();

      clearTimeout ( this.loopId );

    }

  }

  /* FACTORY */

  Factory.make ( TimeAgo, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Timer ));
