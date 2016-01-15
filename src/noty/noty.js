
/* =========================================================================
 * Svelto - Noty
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Add better support for swipe to dismiss
//TODO: Clicking it from a iPod touch makes the click go through it (just on Chrome, not Safari)

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let openNotiesData = {};

  /* CONFIG */

  let config = {
    name: 'noty',
    plugin: true,
    selector: '.noty',
    templates: {
      base: '<div class="noty {%=o.type%} {%=(o.type !== "action" ? "actionable" : "")%} {%=o.color%} {%=o.css%}">' +
              '<div class="infobar">' +
                '{% if ( o.img ) { %}' +
                  '<img src="{%=o.img%}" class="noty-img infobar-left">' +
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
                    '{% include ( "noty.button", o.buttons[0] ); %}' +
                  '</div>' +
                '{% } %}' +
              '</div>' +
              '{% if ( o.buttons.length > 1 ) { %}' +
                '<div class="noty-buttons multiple centered">' +
                  '{% for ( var i = 0; i < o.buttons.length; i++ ) { %}' +
                    '{% include ( "noty.button", o.buttons[i] ); %}' +
                  '{% } %}' +
                '</div>' +
              '{% } %}' +
            '</div>',
      button: '<div class="button {%=(o.color || "white")%} {%=(o.size || "small")%} {%=(o.css || "")%}">' +
                '{%#(o.text || "")%}' +
              '</div>'
    },
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
      persistent: false, //INFO: Wether it should survive a change of page or not. Normally no extra code would be needed to support it, but when manipulating the history object it will be needed
      ttl: 3500,
      autoplay: true,
      timerMinimumRemaining: 1000,
      classes: {
        open: 'open'
      },
      selectors: {
        queues: '.noty-queues',
        queue: '.noty-queue',
        button: '.noty-buttons .button, .infobar-right .button'
      },
      animations: {
        remove: Svelto.animation.normal
      },
      keystrokes: {
        'esc': 'close'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* HELPER */

  $.noty = function ( options = {} ) {

    /* OPTIONS */

    options = _.isString ( options ) ? { body: options } : options;

    /* TYPE */

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* NOTY */

    return new Noty ( options );

  };

  /* NOTY */

  class Noty extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$noty = this.$element;
      this.$buttons = this.$noty.find ( this.options.selectors.button );

      this.timer = false;
      this._isOpen = false;
      this._openUrl = false;

    }

    _init () {

      if ( this.options.autoplay ) {

        this.open ();

      }

    }

    /* PRIVATE */

    _getUrl () {

      return window.location.href.split ( '#' )[0];

    }

    /* TIMER */

    ___timer () {

      if ( this.options.type !== 'action' && _.isNumber ( this.options.ttl ) && !_.isNaN ( this.options.ttl ) && this.options.ttl !== Infinity ) {

        if ( !this.timer ) {

          this.timer = new Timer ( this.close.bind ( this ), this.options.ttl, true );

        } else {

          this.timer.reset ();

        }

        openNotiesData[this.guid] = [this.timer, this.options.timerMinimumRemaining];

      }

    }

    /* TAP */

    ___tap () {

      if ( this.options.type !== 'action' ) {

        this._on ( Pointer.tap, this.close );

      }

    }

    /* BUTTON TAP */

    ___buttonTap () {

      this._on ( this.$buttons, Pointer.tap, this.__buttonTap );

    }

    __buttonTap ( event, data ) {

      let $button = $(event.target),
          index = this.$buttons.index ( $button ),
          buttonObj = this.options.buttons[index];

      if ( buttonObj.onClick ) {

        if ( buttonObj.onClick.apply ( $button[0], [event, data] ) === false ) return;

      }

      this.close ();

    }

    /* HOVER */

    ___hover () {

      this.$noty.hover ( function () {

        _.forIn ( openNotiesData, data => data[0].pause () );

      }, function () {

        _.forIn ( openNotiesData, data => data[0].remaining ( Math.max ( data[1], data[0].remaining () || 0 ) ).play () );

      });

    }

    /* FLICK */

    ___flick () {

      if ( this.options.type !== 'action' ) {

        this.$noty.flickable ({
          callbacks: {
            flick: function ( data ) {
              if ( data.orientation === 'horizontal' ) {
                this.close ();
              }
            }.bind ( this )
          }
        });

      }

    }

    /* PERSISTENT */

    ___persistent () {

      if ( !this.options.persistent ) {

        this._on ( $window, 'route', this.__route );

      }

    }

    __route () {

      let currentUrl = this._getUrl ();

      if ( this._openUrl !== currentUrl ) {

        this.close ();

      }

    }

    /* KEYDOWN */

    ___keydown () {

      this._on ( $document, 'keydown', this.__keydown );

    }

    /* RESET */

    _reset () {

      /* EVENTS */

      this.$noty.off ( this.eventNamespace );

      /* TIMER */

      delete openNotiesData[this.guid];

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    open () {

      if ( this._isOpen ) return;

      this._frame ( function () {

          $(this.options.selectors.queues + '.' + this.options.anchor.y + ' ' + this.options.selectors.queue + '.' + this.options.anchor.x).append ( this.$noty );

          this._frame ( function () {

            this.$noty.addClass ( this.options.classes.open );

          });

      });

      this.___timer ();
      this.___tap ();
      this.___flick ();
      this.___buttonTap ();
      this.___hover ();
      this.___persistent ();
      this.___keydown ();

      this._openUrl = this._getUrl ();
      this._isOpen = true;

      this._trigger ( 'open' );

    }

    close () {

      if ( !this._isOpen ) return;

      this._frame ( function () {

        this.$noty.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$noty.remove ();

        }, this.options.animations.remove );

      });

      this._reset ();

      this._isOpen = false;

      this._trigger ( 'close' );

    }

  }

  /* FACTORY */

  $.factory ( Noty, config, Svelto );

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

}( Svelto.$, Svelto._, window, document ));
