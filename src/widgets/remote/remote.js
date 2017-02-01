
/* =========================================================================
 * Svelto - Widgets - Remote
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Add locking capabilities

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remote',
    options: {
      requests: {
        multiple: {
          parallel: false,
          sequential: true
        }
      },
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

    _variables () {

      this._requestsNr = 0;

    }

    _reset () {

      this.abort ();

      super._reset ();

    }

    /* PRIVATE */

    _getAjax ( options ) {

      return _.extend ( {}, this.options.ajax, options, {
        beforeSend: this.__beforesend.bind ( this ),
        complete: this.__complete.bind ( this ),
        error: this.__error.bind ( this ),
        success: this.__success.bind ( this )
      });

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

      return !!this.xhr && !_.includes ( [0, 4], this.xhr.readyState ); // 0: UNSENT, 4: DONE

    }

    getRequestsNr () {

      return this._requestsNr;

    }

    canRequest () {

      if ( !this.options.requests.multiple.parallel && this.isRequesting () ) return false;

      if ( !this.options.requests.multiple.sequential && this._requestsNr ) return false;

      return true;

    }

    request ( options ) {

      if ( !this.canRequest () ) return;

      this._requestsNr++;
      this._isAborted = false;

      this.ajax = this._getAjax ( options );
      this.xhr = $.ajax ( this.ajax );

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

  Factory.make ( Remote, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
