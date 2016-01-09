
/* =========================================================================
 * Svelto - Switch
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add flick support

(function ( $, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'switch',
    selector: '.switch',
    options: {
      colors: {
        on: 'secondary',
        off: 'gray'
      },
      datas: {
        colors: {
          on: 'color-on',
          off: 'color-off'
        }
      },
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input',
        bar: '.switch-bar',
        handler: '.switch-handler'
      },
      keystrokes: {
        'left': 'uncheck',
        'right': 'check',
        'space': 'toggle'
      },
      callbacks: {
        change () {},
        check () {},
        uncheck () {}
      }
    }
  };

  /* SWITCH */

  class Switch extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$switch = this.$element;
      this.$input = this.$switch.find ( this.options.selectors.input );
      this.$bar = this.$switch.find ( this.options.selectors.bar );
      this.$handler = this.$switch.find ( this.options.selectors.handler );

      this.isChecked = false;

      this.switchWidth = this.$switch.width ();
      this.handlerWidth = this.$handler.width ();

    }

    _init () {

      /* CONFIG */

      this.options.colors.on = this.$switch.data ( this.options.datas.colors.on ) || this.options.colors.on;
      this.options.colors.off = this.$switch.data ( this.options.datas.colors.off ) || this.options.colors.off;

      /* CHECKED */

      if ( this.$input.prop ( 'checked' ) ) {

        this.check ();

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* DRAG */

      this.$handler.draggable ({
        draggable: this.isEnabled.bind ( this ),
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

    }

    /* CHANGE */

    __change () {

      this.toggle ( this.$input.prop ( 'checked' ) );

    }

    /* DRAG */

    __dragEnd ( data ) {

      if ( data.motion ) {

        let isChecked = ( data.endXY.X + ( this.handlerWidth / 2 ) ) >= ( this.switchWidth / 2 );

        this.toggle ( isChecked, true );

      } else {

        this.toggle ();

      }

    }

    /* UPDATE */

    _updatePosition () {

      this.$handler.translateX ( this.isChecked ? this.switchWidth - this.handlerWidth : 0 );

    }

    _updateColors () {

      this.$bar.toggleClass ( this.options.colors.on, this.isChecked );
      this.$bar.toggleClass ( this.options.colors.off, !this.isChecked );

      this.$handler.toggleClass ( this.options.colors.on, this.isChecked );
      this.$handler.toggleClass ( this.options.colors.off, !this.isChecked );

    }

    _updateInput () {

      this.$input.prop ( 'checked', this.isChecked ).trigger ( 'change' );

    }

    _update () {

      this._updatePosition ();
      this._updateColors ();
      this._updateInput ();

    }

    /* API */

    get () {

      return this.isChecked;

    }

    toggle ( force, _reset ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isChecked;

      }

      if ( force !== this.isChecked ) {

        this.isChecked = force;

        this.$switch.toggleClass ( this.options.classes.checked, this.isChecked );

        this._update ();

        this._trigger ( 'change' );

        this._trigger ( this.isChecked ? 'check' : 'uncheck' );

      } else if ( _reset ) {

        this._updatePosition ();

      }

    }

    check () {

      this.toggle ( true );

    }

    uncheck () {

      this.toggle ( false );

    }

  }

  /* BINDING */

  Svelto.Switch = Switch;
  Svelto.Switch.config = config;

  /* FACTORY */

  $.factory ( Svelto.Switch );

}( Svelto.$, Svelto._, window, document ));
