
/* =========================================================================
 * Svelto - Widgets - Remote - Reaction
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteReaction',
    options: {
      state: undefined, // The state of the reaction
      stateDefault: null, // The default state
      stateUrl: false, // If provided, fetch the state from here
      url: false, // Submit the reaction to this url
      ajax: {
        cache: false,
        method: 'POST'
      },
      datas: {
        state: 'state',
        stateUrl: 'state-url',
        url: 'url'
      }
    }
  };

  /* REMOTE REACTION */

  class RemoteReaction extends Widgets.Remote {

    /* SPECIAL */

    _variables () {

      this.$reaction = this.$element;

    }

    _init () {

      this.options.state = this.$reaction.hasAttribute ( `data-${this.options.datas.state}` ) ? this.$reaction.data ( this.options.datas.state ) : this.options.state || this.options.stateDefault;
      this.options.stateUrl = this.$reaction.data ( this.options.datas.stateUrl ) || this.options.stateUrl;
      this.options.url = this.$reaction.data ( this.options.datas.url ) || this.options.url;

      this._update ();

      this.___remoteState ();

    }

    /* REMOTE STATE */

    ___remoteState () {

      if ( !this.options.stateUrl ) return;

      $.get ( this.options.stateUrl, this.__remoteState.bind ( this ) );

    }

    __remoteState ( res ) {

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      if ( _.isError ( resj ) || !('state' in resj) ) return;

      this._remoteState ( resj );

    }

    _remoteState ( resj ) {

      if ( resj.state === this.options.state ) return;

      this.options.state = resj.state;

      this._update ();

    }

    /* UPDATE */

    _update () {

      this.$reaction.attr ( `data-${this.options.datas.state}`, String ( this.options.state ) );

    }

    /* REQUEST HANDLERS */

    __beforesend ( res ) {

      this.disable ();

      return super.__beforesend ( res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      $.toast ( _.isError ( resj ) || !('message' in resj) ? this.options.messages.error : resj.msg );

      return super.__error ( res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      if ( _.isError ( resj ) ) return this.__error ( res );

      this._success ( resj );

      if ( 'message' in resj ) $.toast ( resj.message );

      return super.__success ();

    }

    __complete ( res ) {

      this.enable ();

      return super.__complete ( res );

    }

    /* REQUEST CALLBACKS */

    _success ( resj ) {

      this.options.state = resj.state;

      this._update ();

    }

    /* API */

    get () {

      return this.options.state;

    }

    set ( state ) {

      if ( state === this.options.state ) return;

      let current = this.get (),
          ajax = {
            data: { current, state },
            url: this.options.url || this.options.ajax.url
          };

      return this.request ( ajax );

    }

    reset () {

      return this.set ( this.options.stateDefault );

    }

  }

  /* FACTORY */

  Factory.make ( RemoteReaction, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
