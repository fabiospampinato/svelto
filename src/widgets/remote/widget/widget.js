
// @require ../remote.js
// @require lib/autofocus/autofocus.js
// @require lib/fetch/fetch.js
// @require widgets/toast/toast.js

//TODO: Add locking capabilities, both at class-level and global-level (should be layout-level but seems impossible to implement)

(function ( $, _, Svelto, Widgets, Factory, Animations, Autofocus, fetch ) {

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
      persistent: false, // Whether it should survive a change of page or not. Needed when used in frameworks like Meteor
      resize: true, // Whether performing a resize transition between the loading widget and the remove widget or not
      $wrapper: false, // The loading widget will be appended to it, fallback to the $layout
      widget: false,
      waitPlaceholderAnimation: true, // Whether to wait at least `animations.placeholder` or not //FIXME: Ugly name
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
        method: 'get'
      },
      cache: {
        enabled: false, // Whether remote widgets should be cached or not
        size: 50 // Maximum amount of cached widgets to store, shouldn't change from widget to widget
      },
      storage: {
        enabled: false, // Whether to preserve the content across refreshes/sessions
        ttl: 86400 // 1 day
      },
      attributes: {
        id: 'data-remote-widget-id'
      },
      classes: {
        placeholder: 'remote-widget-placeholder',
        placeholderExtra: '',
        loaded: 'remote-widget-loaded',
        resizing: 'remote-widget-resizing',
        showing: 'remote-widget-showing'
      },
      animations: {
        placeholder: 0,
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

      return btoa ( [method, url, data].join () ); // Using base64 as a fast hash function (we need to strip out apices for the selectors)

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

      if ( !widget ) {

        widget = $(this._template ( 'placeholder', this.options )).attr ( this.options.attributes.id, this.requestId );

      }

      this.$widget = $(widget).appendTo ( this.options.$wrapper );

    }

    _widgetInit () {

      this.$widget.widgetize ();

      Autofocus.focus ( this.$widget );

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

      this.$widget.removeClass ( this.options.classes.placeholder )
                  .removeClass ( this.options.classes.loaded )
                  .removeClass ( this.options.classes.resizing )
                  .removeClass ( this.options.classes.showing );

    }

    _widgetDestroy () {

      if ( !this.$widget ) return;

      let instance = this.$widget[this.options.widget.config.name]( 'instance' );

      instance.whenUnlocked ( () => {

        instance[this.options.methods.close]();

        this._delay ( function () {

          if ( !this.$widget ) return;

          this.$widget.remove ();

          this.$widget = false;

        }, instance.options.animations[this.options.methods.close] );

      });

    }

    /* CACHE */

    _cacheGet ( id ) {

      return cache.find ( obj => obj.id === id );

    }

    _cacheSet ( id, widget ) {

      cache.unshift ({ id, widget });

      if ( cache.length > this.options.cache.size ) {

        cache = cache.slice ( 0, this.options.cache.size );

      }

    }

    _cacheShow ( obj ) {

      let $widget = $(obj.widget).attr ( this.options.attributes.id, obj.id );

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

    __beforesend ( req ) {

      if ( this.isAborted () ) return;

      this.requestId = this._getRequestId ( this.ajax );
      this.requestTimestamp = Date.now ();

      /* CLOSING */

      let $widget = $(`[${this.options.attributes.id}="${this.requestId}"]`);

      if ( $widget.length ) {

        $widget[this.options.widget.config.name]( this.options.methods.close );

        return false;

      }

      /* CACHE */

      if ( this.options.cache.enabled ) {

        let cached = this._cacheGet ( this.requestId );

        if ( cached ) {

          this._cacheShow ( cached );

          return false;

        }

      }

      /* STORAGE */

      if ( this.options.storage.enabled ) {

        let stored = this._storageGet ( this.requestId );

        if ( stored ) {

          this._cacheShow ( stored );

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

      super.__beforesend ( req );

    }

    async __error ( res ) {

      if ( this.isAborted () ) return;

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

      this._widgetDestroy ();

      super.__error ( res );

    }

    async __success ( res ) {

      if ( this.isAborted () ) return;

      if ( !this.$widget ) return;

      let resj = await fetch.getValue ( res );

      if ( !resj || resj.error || !(this.options.widget.config.name in resj) ) return this.__error ( res );

      /* WAIT */

      if ( this.options.waitPlaceholderAnimation ) {

        let wait = this.options.animations.placeholder - ( Date.now () - this.requestTimestamp );

        if ( wait > 0 ) await _.wait ( wait );

      }

      /* VARIABLES */

      let remoteWidget = resj[this.options.widget.config.name],
          $remoteWidget = $(remoteWidget),
          prevRect;

      if ( this.options.resize ) prevRect = this.$widget.getRect ();

      $remoteWidget.addClass ( this.options.widget.config.options.classes.show ).addClass ( this.options.widget.config.options.classes[this.options.methods.open] );
      $remoteWidget.attr ( this.options.attributes.id, this.requestId );

      /* CACHE */

      if ( this.options.cache.enabled ) {

        this._cacheSet ( this.requestId, remoteWidget );

      }

      /* STORAGE */

      if ( this.options.storage.enabled ) {

        let storable = {
          id: this.requestId,
          widget: remoteWidget
        };

        this._storageSet ( this.requestId, storable, this.options.storage.ttl );

      }

      /* REPLACING */

      this._frame ( function () {

        this._widgetReplaceWith ( $remoteWidget );

        this.___close ();

        if ( this.options.resize ) {

          let newRect = this.$widget.getRect (),
              needsResize = ( prevRect.width !== newRect.width || prevRect.height !== newRect.height );

          if ( needsResize ) {

            this.$widget.css ({
              width: prevRect.width,
              height: prevRect.height
            });

            this.$widget.addClass ( this.options.classes.placeholder ).addClass ( this.options.classes.resizing );

            this._frame ( function () {

              this.$widget.addClass ( this.options.classes.showing );

              $.animate ( this.$widget[0], {
                width: newRect.width,
                height: newRect.height
              }, {
                duration: this.options.animations.resize,
                callbacks: {
                  tick: this._widgetResizing.bind ( this ),
                  end: this._widgetResized.bind ( this )
                }
              });

            });

          }

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

  Factory.make ( RemoteWidget, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations, Svelto.Autofocus, Svelto.fetch ));
