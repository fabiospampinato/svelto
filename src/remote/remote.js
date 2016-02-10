
/* =========================================================================
 * Svelto - Remote
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../widget/widget.js
 * ========================================================================= */

//TODO: Add locking capabilities

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remote',
    options: {
      ajax: { // Options to pass to `$.ajax`
        cache: true, // If set to false, it will force the requested url not to be cached by the browser
        method: 'GET', // Method of the remote request
        timeout: 31000 // 1 second more than the default value of PHP's `max_execution_time` setting
      },
      callbacks: {
        beforesend: _.noop,
        complete: _.noop,
        error: _.noop,
        success: _.noop,
        abort: _.noop
      }
    }
  };

  /* REMOTE */

  class Remote extends Widgets.Widget {

    /* SPECIAL */

    _reset () {

      this.abort ();

      super._reset ();

    }

    /* REQUEST HANDLERS */

    __beforesend ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'beforesend', res );

    }

    __complete ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'complete', res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'error', res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'success', res );

    }

    __abort () {

      this._trigger ( 'abort' );

    }

    /* API */

    isRequesting () {

      return !!this.xhr && ![0, 4].includes ( this.xhr.readyState ); // 0: UNSENT, 4: DONE

    }

    request () {

      this._isAborted = false;

      this.xhr = $.ajax ( _.extend ( {}, this.options.ajax, {
        beforeSend: this.__beforesend.bind ( this ),
        complete: this.__complete.bind ( this ),
        error: this.__error.bind ( this ),
        success: this.__success.bind ( this )
      }));

    }

    isAborted () {

      return !!this._isAborted;

    }

    abort () {

      if ( !this.xhr || !this.isRequesting () ) return;

      this._isAborted = true;

      this.xhr.abort ();

      this.__abort ();

    }

  }

  /* FACTORY */

  Factory.init ( Remote, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
