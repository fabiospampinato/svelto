
/* =========================================================================
 * Svelto - Widgets - Liker
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/remote/remote.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'liker',
    plugin: true,
    selector: '.liker',
    options: {
      likes: 0,
      dislikes: 0,
      state: null,
      stateUrl: false,
      url: false,
      ajax: {
        cache: false,
        method: 'POST'
      },
      messages: {
        error: 'An error occurred, please try again later'
      },
      datas: {
        likes: 'likes',
        dislikes: 'dislikes',
        state: 'state',
        stateUrl: 'state-url',
        url: 'url'
      },
      selectors: {
        like: '.like',
        dislike: '.dislike'
      }
    }
  };

  /* LIKES */

  class Liker extends Widgets.Remote {

    /* SPECIAL */

    _variables () {

      this.$liker = this.$element;
      this.$like = this.$liker.find ( this.options.selectors.like );
      this.$dislike = this.$liker.find ( this.options.selectors.dislike );

    }

    _init () {

      this.options.likes = Number ( this.$like.data ( this.options.datas.likes ) ) || this.options.likes;
      this.options.dislikes = Number ( this.$dislike.data ( this.options.datas.dislikes ) ) || this.options.dislikes;
      this.options.stateUrl = this.$liker.data ( this.options.datas.stateUrl ) || this.options.stateUrl;
      this.options.url = this.$liker.data ( this.options.datas.url ) || this.options.url;

      let state = this.$liker.data ( this.options.datas.state );
      this.options.state = _.isBoolean ( state ) ? state : this.options.state;

      this.___remoteState ();
      this._update ();

    }

    _events () {

      this.___like ();
      this.___dislike ();

    }

    /* REMOTE STATE */

    ___remoteState () {

      if ( !this.options.stateUrl ) return;

      $.get ( this.options.stateUrl, this.__remoteState.bind ( this ) );

    }

    __remoteState ( res ) {

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      if ( _.isError ( resj ) || !('state' in resj) || resj.state === this.options.state ) return;

      this.options.state = resj.state;

      this._update ();

    }

    /* UPDATE */

    _update () {

      this.$liker.attr ( `data-${this.options.datas.state}`, String ( this.options.state ) );
      this.$like.attr ( `data-${this.options.datas.likes}`, this.options.likes );
      this.$dislike.attr ( `data-${this.options.datas.dislikes}`, this.options.dislikes );

    }

    /* LIKE */

    ___like () {

      this._on ( this.$like, Pointer.tap, this.__like );

    }

    __like () {

      this[this.options.state ? 'reset' : 'like'] ();

    }

    /* DISLIKE */

    ___dislike () {

      this._on ( this.$dislike, Pointer.tap, this.__dislike );

    }

    __dislike () {

      this[this.options.state === false ? 'reset' : 'dislike'] ();

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

      _.extend ( this.options, _.pick ( resj, ['likes', 'dislikes', 'state'] ) );

      this._update ();

      if ( 'message' in resj ) $.toast ( resj.message );

      return super.__success ();

    }

    __complete ( res  ) {

      this.enable ();

      return super.__complete ( res );

    }

    /* API */

    get () {

      return _.pick ( this.options, ['likes', 'dislikes', 'state'] );

    }

    set ( state = null ) {

      if ( state === this.options.state ) return;

      let options = {
        data: {
          current: this.get (),
          state
        },
        url: this.options.url || this.options.ajax.url
      };

      return this.request ( options );

    }

    reset () {

      return this.set ( null );

    }

    like () {

      return this.set ( true );

    }

    dislike () {

      return this.set ( false );

    }

  }

  /* FACTORY */

  Factory.init ( Liker, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
