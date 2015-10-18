
/* =========================================================================
 * Svelto - Noty
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add better support for swipe to dismiss

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var notiesTimers = [];

  /* HELPER */

  $.noty ( options ) {

    /* OPTIONS */

    options = _.isString ( options ) ? { body: options } : ( options || {} );

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* NOTY */

    return new $.svelto.noty ( options );

  };

  /* NOTY */

  $.factory ( 'svelto.noty', {

    /* TEMPLATES */

    templates: {
      base: '<div class="noty {%=o.type%} {%=(o.type !== "action" ? "actionable" : "")%} {%=o.color%} {%=o.css%}">' +
              '<div class="infobar">' +
                '{% if ( o.img ) { %}' +
                  '<img src="{%=o.img%}" class="noty-img infobar-left" />' +
                '{% } %}' +
                '{% if ( o.title || o.body ) { %}' +
                  '<div class="infobar-center">' +
                    '{% if ( o.title ) { %}' +
                      '<p class="infobar-title">' +
                         '{%#o.title%}' +
                       '</p>' +
                    '{% } %}' +
                    '{% if ( o.body ) { %}' +
                      '{%#o.body%}' +
                    '{% } %}' +
                  '</div>' +
                '{% } %}' +
                '{% if ( o.buttons.length === 1 ) { %}' +
                  '<div class="infobar-right">' +
                    '{% include ( "svelto.noty.button", o.buttons[0] ); %}' +
                  '</div>' +
                '{% } %}' +
              '</div>' +
              '{% if ( o.buttons.length > 1 ) { %}' +
                '<div class="noty-buttons multiple centered">' +
                  '{% for ( var i = 0; i < o.buttons.length; i++ ) { %}' +
                    '{% include ( "svelto.noty.button", o.buttons[i] ); %}' +
                  '{% } %}' +
                '</div>' +
              '{% } %}' +
            '</div>',
      button: '<div class="button {%=(o.color || "white")%} {%=(o.size || "small")%} {%=(o.css || "")%}">' +
                '{%#(o.text || "")%}' +
              '</div>'
    },

    /* OPTIONS */

    options: {
      anchor: {
        y: 'bottom',
        x: 'left'
      },

      title: false,
      body: false,
      img: false,
      buttons: [],
      /*
             : [{
                color: 'white',
                size: 'small',
                css: '',
                text: '',
                onClick: _.noop
             }],
      */

      type: 'alert',
      color: 'black',
      css: '',

      ttl: 3500,
      autoplay: true,
      timerMinimumRemaining: 1000,

      classes: {
        open: 'open'
      },

      selectors: {
        button: '.noty-buttons .button, .infobar-right .button'
      },

      animations: {
        remove: $.ui.animation.normal
      },

      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    //TODO: Add a `_widgetize` special function

    _variables () {

      this.$noty = this.$element;
      this.$buttons = this.$noty.find ( this.options.selectors.button );

      this.timer = false;
      this._isOpen = false;
      this.neverOpened = true;

    },

    _init () {

      if ( this.options.autoplay ) {

        this.open ();

      }

    },

    /* PRIVATE */

    ___tap () {

      if ( this.options.type !== 'action' ) {

        //FIXME: If mouse only if left mouse button click

        this._on ( Pointer.tap, this.close );

      }

    },

    ___buttonTap () {

      _.each ( this.options.buttons, function ( button, index ) {

        this._on ( this.$buttons.eq ( index ), Pointer.tap, function ( event, data ) {

          if ( button.onClick ) {

            if ( button.onClick.apply ( this.$buttons[index], [event, data] ) === false ) return;

          }

          this.close ();

        });

      }, this );

    },

    ___timer () {

      if ( this.options.type !== 'action' && _.isNumber ( this.options.ttl ) && this.options.ttl !== Infinity ) {

        this.timer = $.timer ( this.close.bind ( this ), this.options.ttl, true );

        notiesTimers.push ( this.timer );

      }

    },

    ___hover () {

      var instance = this;

      this.$noty.hover ( () => {

        notiesTimers.forEach ( timer.pause );

      }, () => {

        notiesTimers.forEach ( timer => {

          timer.remaining ( Math.max ( instance.options.timerMinimumRemaining, timer.remaining () || 0 ) );

          timer.play ();

        });

      });

    },

    ___flick () {

      if ( this.options.type !== 'action' ) {

        this._on ( Pointer.flick, function ( event, data ) {

          if ( data.orientation === 'horizontal' ) {

            this.close ();

          }

        });

      }

    },

    __keydown ( event ) {

      if ( event.keyCode === $.ui.keyCode.ESCAPE ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.close ();

      }

    },

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    },

    open () {

      if ( !this._isOpen ) {

        this._frame ( function () {

            $('.noty-queues.' + this.options.anchor.y + ' .noty-queue.' + this.options.anchor.x).append ( this.$noty );

            this._frame ( function () {

              this.$noty.addClass ( this.options.classes.open );

            });

        });

        if ( this.neverOpened ) {

          this.___tap ();
          this.___flick ();
          this.___buttonTap ();
          this.___hover ();

          this.neverOpened = false;

        }

        this.___timer ();

        this._on ( $document, 'keydown', this.__keydown );

        this._isOpen = true;

        this._trigger ( 'open' );

      }

    },

    close () {

      if ( this._isOpen ) {

        this.$noty.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$noty.detach ();

        }, this.options.animations.remove );

        if ( this.timer ) {

          _.pull ( notiesTimers, this.timer );

          this.timer.stop ();

        }

        this._off ( $document, 'keydown', this.__keydown );

        this._isOpen = false;

        this._trigger ( 'close' );

      }

    }

  });

  /* READY */

  $(function () {

    $body.append (
      '<div class="noty-queues top">' +
        '<div class="noty-queue expanded"></div>' +
        '<div class="noty-queues-row">' +
          '<div class="noty-queue left"></div>' +
          '<div class="noty-queue center"></div>' +
          '<div class="noty-queue right"></div>' +
        '</div>' +
      '</div>' +
      '<div class="noty-queues bottom">' +
        '<div class="noty-queues-row">' +
          '<div class="noty-queue left"></div>' +
          '<div class="noty-queue center"></div>' +
          '<div class="noty-queue right"></div>' +
        '</div>' +
        '<div class="noty-queue expanded"></div>' +
      '</div>'
    );

  });

}( jQuery, _, window, document ));
