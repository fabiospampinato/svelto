
/* =========================================================================
 * Svelto - Widgets - Remote - Widget
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Clicking on the trigger when it's open should close it, not request another
//TODO: Add locking capabilities, both at class-level and global-level (should be layout-level but seems impossible to implement)

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* VARIABLES */

  let cache = []; // Storing remote widgets here //TODO: Maybe make this variable accessible from the outside

  /* CONFIG */

  let config = {
    name: 'remoteWidget',
    templates: {
      placeholder: false
    },
    options: {
      persistent: false, // Wether it should survive a change of page or not. Needed when used in frameworks like Meteor
      resize: true, // Wether performing a resize transition between the loading widget and the remove widget or not
      $wrapper: false, // The loading widget will be appended to it, fallback to the $layout
      widget: false,
      methods: {
        open: 'open',
        close: 'close'
      },
      events: {
        beforeclose: 'beforeclose',
        close: 'close'
      },
      ajax: {
        cache: false,
        method: 'POST'
      },
      cache: {
        enabled: false, // Wether remote widgets should be cached or not
        size: 50 // Maximum amount of cached widgets to store, shouldn't change from widget to widget
      },
      messages: {
        error: 'An error occurred, please try again later'
      },
      classes: {
        placeholder: 'remote-widget-placeholder',
        placeholderExtra: '',
        loaded: 'remote-widget-loaded',
        resizing: 'remote-widget-resizing',
        showing: 'remote-widget-showing'
      },
      animations: {
        resize: Animations.normal
      }
    }
  };

  /* REMOTE WIDGET */

  class RemoteWidget extends Widgets.Remote {

    /* SPECIAL */

    _init () {

      this.options.$wrapper = this.options.$wrapper || this.$layout;

    }

    /* PRIVATE */

    _getUrl () {

      return window.location.href.split ( '#' )[0];

    }

    _getRequestId ( ajax ) {

      let {method, url, data} = ajax;

      if ( _.isPlainObject ( data ) ) data = JSON.stringify ( data );

      return [method, url, data].join ( '.' );

    }

    /* PERSISTENT */

    ___persistent () {

      if ( !this.options.persistent ) {

        this.___route ();

      }

    }

    __route () {

      let currentUrl = this._getUrl ();

      if ( this._openUrl && this._openUrl !== currentUrl ) {

        this.abort ();

      }

    }

    /* WIDGET */

    ___widget ( widget ) {

      widget = widget || this._template ( 'placeholder', this.options );

      this.$widget = $(widget).appendTo ( this.options.$wrapper );

    }

    _widgetInit () {

      this.$widget.widgetize ();

    }

    _widgetOpen () {

      this.$widget[this.options.widget.config.name]( this.options.methods.open );

    }

    _widgetReplaceWith ( $replacement ) {

      let instance = this.$widget[this.options.widget.config.name]( 'instance' );

      instance[this.options.methods.close] = _.noop;
      instance.destroy ();

      this.$widget.replaceWith ( $replacement );
      this.$widget = $replacement;

      this._widgetInit ();

    }

    _widgetResizing () {}

    _widgetResized () {

      this.$widget.css ({
        width: '',
        height: ''
      });

      this.$widget.removeClass ( this.options.classes.placeholder ).removeClass ( this.options.classes.loaded ).removeClass ( this.options.classes.resizing ).removeClass ( this.options.classes.showing );

    }

    _widgetDestroy () {

      if ( !this.$widget ) return;

      this.$widget[this.options.widget.config.name]( this.options.methods.close );

      this._delay ( function () {

        if ( !this.$widget ) return;

        this.$widget.remove ();

        this.$widget = false;

      }, this.options.widget.config.options.animations[this.options.methods.close] );

    }

    /* CACHE */

    _cacheGet ( id ) {

      return cache.find ( obj => obj.id === id );

    }

    _cacheSet ( id, widget ) {

      cache.unshift ({
        id,
        widget
      });

      if ( cache.length > this.options.cache.size ) {

        cache = cache.slice ( 0, this.options.cache.size );

      }

    }

    _cacheShow ( obj ) {

      let $widget = $(obj.widget);

      this.___widget ( $widget );
      this._widgetInit ();
      this._widgetOpen ();
      this.___close ();

    }

    /* ABORT */

    ___abort () {

      this._on ( true, this.$widget, `${this.options.widget.config.name}:${this.options.events.beforeclose}`.toLowerCase (), this.abort );

    }

    /* CLOSE */

    ___close () {

      this._on ( true, this.$widget, `${this.options.widget.config.name}:${this.options.events.close}`.toLowerCase (), this._widgetDestroy );

    }

    /* REQUEST HANDLERS */

    __beforesend ( res ) {

      if ( this.isAborted () ) return;

      this.requestId = this._getRequestId ( this.ajax );

      /* CACHE */

      if ( this.options.cache.enabled ) {

        let cached = this._cacheGet ( this.requestId );

        if ( cached ) {

          this._cacheShow ( cached );

          return false;

        }

      }

      /* REQUEST */

      this._defer ( function () {

        this._openUrl = this._getUrl ();

      });

      this.___persistent ();
      this.___widget ();
      this.___abort ();

      this._widgetInit ();
      this._widgetOpen ();

      super.__beforesend ( res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      $.toast ( _.isError ( resj ) || !('message' in resj) ? this.options.messages.error : resj.message );

      this._widgetDestroy ();

      super.__error ( res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      if ( _.isError ( resj ) || !(this.options.widget.config.name in resj) ) return this.__error ( res );

      /* VARIABLES */

      let remoteWidget = resj[this.options.widget.config.name],
          $remoteWidget = $(remoteWidget),
          prevRect;

      if ( this.options.resize ) prevRect = this.$widget.getRect ();

      $remoteWidget.addClass ( this.options.widget.config.options.classes.show ).addClass ( this.options.widget.config.options.classes[this.options.methods.open] );

      /* CACHE */

      if ( this.options.cache.enabled ) {

        this._cacheSet ( this.requestId, remoteWidget );

      }

      /* REPLACING */

      this._frame ( function () {

        this._widgetReplaceWith ( $remoteWidget );

        this.___close ();

        if ( this.options.resize ) {

          let newRect = this.$widget.getRect ();

          this.$widget.css ({
            width: prevRect.width,
            height: prevRect.height
          });

          this.$widget.addClass ( this.options.classes.placeholder ).addClass ( this.options.classes.resizing );

          this._frame ( function () {

            this.$widget.addClass ( this.options.classes.showing );

            this.$widget.animate ({
              width: newRect.width,
              height: newRect.height
            }, {
              duration: this.options.animations.resize,
              step: this._widgetResizing.bind ( this ),
              always: this._widgetResized.bind ( this )
            });

          });

        }

      });

      super.__success ( res );

    }

    /* API OVERRIDES */

    abort () {

      this._widgetDestroy ();

      super.abort ();

    }

  }

  /* FACTORY */

  Factory.init ( RemoteWidget, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));
