
/* =========================================================================
 * Svelto - Widgets - Remote - Loader
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteLoader',
    plugin: true,
    selector: '.remote-loader',
    options: {
      autorequest: {
        threshold: 400
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      datas: {
        url: 'url',
        data: 'data',
        method: 'method'
      },
      messages: {
        error: 'An error occurred, please try again later'
      }
    }
  };

  /* REMOTE LOADER */

  class RemoteLoader extends Widgets.Remote {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$loader = this.$element;
      this.$window = $(window);

    }

    _init () {

      this.options.ajax.url = this.$loader.data ( this.options.datas.url ) || this.$loader.attr ( this.options.attributes.href ) || this.options.ajax.url;
      this.options.ajax.data = this.$loader.data ( this.options.datas.data ) || this.options.ajax.data;
      this.options.ajax.method = this.$loader.data ( this.options.datas.method ) || this.options.ajax.method;

      this._defer ( () => !this.isRequesting () && this.disable () ); //TODO: Maybe define as an external function //TODO: Maybe add an option for this

    }

    _events () {

      this.___request ();

    }

    /* REQUEST */

    ___request () {

      this.__request ();

      let $scrollable = this.$window.add ( this.$loader.parents () ),
          handler = this._throttle ( this.__request, 100 );

      this._on ( true, this.$window, 'resize', handler );
      this._on ( true, $scrollable, 'scroll', handler );

    }

    __request () {

      if ( this.$loader.getRect ().top - ( this.$window.scrollTop () + this.$window.outerHeight () ) > this.options.autorequest.threshold ) return;

      this.request ();

    }

    /* REQUEST HANDLERS */

    __error ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      $.toast ( _.isError ( resj ) || !('message' in resj) ? this.options.messages.error : resj.message );

      super.__error ( res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res ),
          isJSON = !_.isError ( resj );

      if ( isJSON && !('html' in resj) ) return this.__error ( res );

      let content = isJSON ? resj.html : res,
          id = `remote-loaded-${$.guid++}`,
          container = `<div id="${id}" class="remote-loaded">${content}</div>`;

      this.$loader[0].outerHTML = container;

      $(`#${id}`).widgetize ();

      super.__success ( res );

    }

    __complete ( res ) {

      this.$loader.remove ();

      super.__complete ( res );

    }

    /* API OVERRIDES */

    request () {

      if ( this.isRequesting () || this.getRequestsNr () ) return;

      if ( this.getRequestsNr () >= 1 ) debugger;

      this.enable ();

      return super.request ();

    }

  }

  /* FACTORY */

  Factory.init ( RemoteLoader, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
