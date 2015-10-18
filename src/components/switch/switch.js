
/* =========================================================================
 * Svelto - Switch v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

;(function ( $, window, document, undefined ) {

  'use strict';

  /* SWITCH */

  $.factory ( 'svelto.switch', {

    /* OPTIONS */

    options: {
      colors: {
        on: 'secondary',
        off: 'gray'
      },
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input',
        bar: '.switch-bar',
        handler: '.switch-handler'
      },
      callbacks: {
        change: _.noop,
        check: _.noop,
        uncheck: _.noop
      }
    },

    /* SPECIAL */

    _widgetize: function ( $root ) {

      $root.find ( '.switch' ).each ( function () {

        var $switch = $(this);

        $switch.switch ({
          colors: {
            on: $switch.data ( 'color-on' ) || 'secondary',
            off: $switch.data ( 'color-off' ) || 'gray'
          }
        });

      });

    },

    _variables: function () {

      this.$switch = this.$element;
      this.$input = this.$switch.find ( this.options.selectors.input );
      this.$bar = this.$switch.find ( this.options.selectors.bar );
      this.$handler = this.$switch.find ( this.options.selectors.handler );

      this.isChecked = false;

      this.switchWidth = this.$switch.width ();
      this.handlerWidth = this.$handler.width ();

    },

    _init: function () {

      if ( this.$input.prop ( 'checked' ) ) {

        this.check ();

      }

    },

    _events: function () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* DRAG */

      this.$handler.draggable ({
        axis: 'x',
        $proxy: this.$switch,
        proxyWithoutMotion: false,
        constrainer: {
          $element: this.$switch
        },
        callbacks: {
          end: this.__dragEnd.bind ( this )
        }
      });

    },

    /* CHANGE */

    __change: function () {

      this.toggle ( this.$input.prop ( 'checked' ) );

    },

    /* KEYS */

    __keydown: function ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.LEFT:
          this.uncheck ();
          break;

        case $.ui.keyCode.RIGHT:
          this.check ();
          break;

        case $.ui.keyCode.SPACE:
          this.toggle ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    },

    /* DRAG */

    __dragEnd: function ( data ) {

      if ( data.motion ) {

        var isChecked = ( data.endXY.X + ( this.handlerWidth / 2 ) ) >= ( this.switchWidth / 2 );

        this.toggle ( isChecked, true );

      } else {

        this.toggle ();

      }

    },

    /* UPDATE */

    _updatePosition: function () {

      this.$handler.translateX ( this.isChecked ? this.switchWidth - this.handlerWidth : 0 );

    },

    _updateColors: function () {

      this.$bar.toggleClass ( this.options.colors.on, this.isChecked );
      this.$bar.toggleClass ( this.options.colors.off, !this.isChecked );

      this.$handler.toggleClass ( this.options.colors.on, this.isChecked );
      this.$handler.toggleClass ( this.options.colors.off, !this.isChecked );

    },

    _updateInput: function () {

      this.$input.prop ( 'checked', this.isChecked ).trigger ( 'change' );

    },

    /* API */

    get: function () {

      return this.isChecked;

    },

    toggle: function ( force, reset ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isChecked;

      }

      if ( force !== this.isChecked ) {

        var prevChecked = this.isChecked;

        this.isChecked = force;

        this.$switch.toggleClass ( this.options.classes.checked, this.isChecked );

        this._updatePosition ();
        this._updateColors ();
        this._updateInput ();

        this._trigger ( 'change', {
          previous: prevChecked,
          checked: this.isChecked
        });

        this._trigger ( this.isChecked ? 'check' : 'uncheck' );

      } else if ( reset ) {

        this._updatePosition ();

      }

    },

    check: function () {

      this.toggle ( true );

    },

    uncheck: function () {

      this.toggle ( false );

    }

  });

}( jQuery, _, window, document ));
