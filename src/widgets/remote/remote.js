
// @require lib/fetch/fetch.js
// @require widgets/storable/storable.js

//TODO: Add locking capabilities

(function ( $, _, Svelto, Widgets, Factory, fetch ) {

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
      ajax: { // Options to pass to `fetch`
        cache: false,
        method: 'get',
        timeout: 31000 // 1 second more than the default value of PHP's `max_execution_time` setting
      },
      storage: {
        enabled: false
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

  class Remote extends Widgets.Storable {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this._requestsNr = 0;

    }

    _reset () {

      this.abort ();

      super._reset ();

    }

    /* PRIVATE */

    _getAjax ( options ) {

      return _.extend ( {}, this.options.ajax, options, {
        beforesend: this.__beforesend.bind ( this ),
        complete: this.__complete.bind ( this ),
        error: this.__error.bind ( this ),
        success: this.__success.bind ( this )
      });

    }

    /* REQUEST HANDLERS */

    __beforesend ( req ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'beforesend', req );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'error', res );

    }

    async __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = await fetch.getValue ( res );

      if ( resj && resj.error ) return this.__error ( res );

      this._trigger ( 'success', res );

    }

    __complete ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'complete', res );

    }

    __abort () {

      this._trigger ( 'abort' );

    }

    /* API */

    isRequesting () {

      return !!this.req && ![0, 4].includes ( this.req.readyState ); // 0: UNSENT, 4: DONE

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

      this.ajax.request = () => { // Saving the request object
        this.req = fetch.defaults.request ();
        return this.req;
      };

      fetch ( this.ajax );

    }

    isAborted () {

      return !!this._isAborted;

    }

    abort () {

      if ( !this.req || !this.isRequesting () ) return;

      this._isAborted = true;

      this.req.abort ();

      this.__abort ();

    }

  }

  /* FACTORY */

  Factory.make ( Remote, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.fetch ));
