
/* =========================================================================
 * Svelto - Widgets - Remote - Loader
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require lib/autofocus/autofocus.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Autofocus ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteLoader',
    plugin: true,
    selector: '.remote-loader',
    options: {
      target: false, // Selector pointing to the element that cointains the content
      wrap: true, // Wrap the content into a `.remote-loaded` element
      autorequest: {
        threshold: 400
      },
      preloading: {
        enabled: false, // Preload the content
        wait: true // Wait for an explicit request or autorequesting before doing the actual work
      },
      requests: {
        multiple: {
          parallel: false,
          sequential: false
        }
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      classes: {
        preload: 'preload',
        nowrap: 'no-wrap'
      },
      datas: {
        url: 'url',
        data: 'data',
        method: 'method',
        target: 'target'
      }
    }
  };

  /* REMOTE LOADER */

  class RemoteLoader extends Widgets.Remote {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$loader = this.$element;

    }

    _init () {

      this.options.preloading.enabled = this.$loader.hasClass ( this.options.classes.preload ) || this.options.preloading.enabled;
      this.options.ajax.url = this.$loader.data ( this.options.datas.url ) || this.$loader.attr ( this.options.attributes.href ) || this.options.ajax.url;
      this.options.ajax.data = this.$loader.data ( this.options.datas.data ) || this.options.ajax.data;
      this.options.ajax.method = this.$loader.data ( this.options.datas.method ) || this.options.ajax.method;
      this.options.target = this.$loader.data ( this.options.datas.target ) || this.options.target;
      this.options.wrap = this.$loader.hasClass ( this.options.classes.nowrap ) ? false : this.options.wrap;

      if ( this.options.target ) {

        this.$target = $(this.options.target);
        this.$target = this.$target.length ? this.$target : false;

      }

      if ( this.options.preloading.enabled ) this.preload ();

      this._defer ( () => !this.isRequesting () && this.disable () ); //TODO: Maybe define as an external function //TODO: Maybe add an option for this

    }

    _events () {

      this.___request ();

    }

    /* UTILITIES */

    _replace ( res, resj, isJSON ) {

      let content = isJSON ? resj.html : res,
          id = `remote-loaded-${$.guid++}`,
          contentWrapped = `<div id="${id}" class="remote-loaded">${content}</div>`,
          html = this.options.wrap ? contentWrapped : content,
          $loader = this.$loader.first (),
          $loaderWrp = $loader.parent ();

      $loader[0].outerHTML = html;

      let $container = this.options.wrap ? $(`#${id}`) : $loaderWrp;

      $container.widgetize ();

      Autofocus.focus ( $container );

      $loader.remove ();

      this._replaced = true;

    }

    /* REQUEST */

    ___request () {

      this.__request ();

      let $scrollable = $.$window.add ( this.$loader.parents () ),
          handler = this._frames ( this.__request.bind ( this ) );

      this._on ( true, $.$window, 'resize', handler );
      this._on ( true, $scrollable, 'scroll', handler );

    }

    __request () {

      if ( this.$loader.getRect ().top - $.window.innerHeight > this.options.autorequest.threshold ) return;

      this.request ();

    }

    /* REQUEST HANDLERS */

    __complete ( res ) {

      this._preloading = false;

      super.__complete ( res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      let message = $.ajaxResponseGet ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

      super.__error ( res );

      this.$loader.remove ();

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = $.ajaxParseResponse ( res ),
          isJSON = !!resj;

      if ( isJSON && !('html' in resj) ) return this.__error ( res );

      super.__success ( res );

      if ( this._preloading && this.options.preloading.wait && !this._requested ) {

        this.disable ();

        this._res = res;
        this._resj = resj;
        this._isJSON = isJSON;

      } else {

        this._replace ( res, resj, isJSON );

      }

    }

    /* API OVERRIDES */

    request ( preloading ) {

      if ( this._replaced ) return;

      if ( this.$target ) return this._replace ( this.$target.html (), null, false );

      if ( this._res ) return this._replace ( this._res, this._resj, this._isJSON );

      if ( !preloading ) this._requested = true;

      if ( !this.canRequest () ) return;

      this.enable ();

      return super.request ();

    }

    /* API */

    preload () {

      if ( this.$target ) return;

      this._preloading = true;

      this.request ( true );

    }

  }

  /* FACTORY */

  Factory.make ( RemoteLoader, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Autofocus ));
