
/* =========================================================================
 * Svelto - Toggler
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Detect the widget in use, not add the extra property -> no need to extend it every time and no need for the extra .widget-toggler class
//FIXME: Hover open, enter the dropdown and click it, it gets closed...

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'toggler',
    selector: undefined,
    options: {
      widget: false, //INFO: The widget class to toggle
      hover: {
        triggerable: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      datas: {
        target: 'target'
      }
    }
  };

  /* TOGGLER */

  class Toggler extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.toggler = this.element;
      this.$toggler = this.$element;

      this.targetSelector = this.$toggler.data ( this.options.datas.target );

      this.$target = this.targetSelector ? $(this.targetSelector) : this.$toggler.closest ( this.options.widget.config.selector );

      this._instance = this.$target[this.options.widget.config.name]( 'instance' );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, function ( event ) {

        return this._instance.toggle ( undefined, this.toggler, event );

      });

      /* HOVER */

      if ( this.options.hover.triggerable ) {

        this._on ( Pointer.enter, this.__hoverEnter );

      }

    }

    /* HOVER */

    __hoverEnter () {

      if ( !this._instance.isOpen () ) {

        this._isHoverOpen = false;

        this._hoverOpenTimeout = this._delay ( this.__hoverOpen, this.options.hover.delays.open );

        this._one ( Pointer.leave, this.__hoverLeave );

      } else if ( this._isHoverOpen ) {

        if ( this._hoverCloseTimeout ) {

          clearTimeout ( this._hoverCloseTimeout );

          this._hoverCloseTimeout = false;

        }

        this._one ( Pointer.leave, this.__hoverLeave );

      }

    }

    __hoverOpen () {

      if ( !this._instance.isOpen () ) {

        this._instance.open ( this.toggler );

        this._isHoverOpen = true;

      }

      this._hoverOpenTimeout = false;

    }

    __hoverLeave  () {

      if ( this._hoverOpenTimeout ) {

        clearTimeout ( this._hoverOpenTimeout );

        this._hoverOpenTimeout = false;

      }

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

        this._one ( this.$target, Pointer.enter, this.__hoverTargetEnter );

      }

    }

    __hoverClose () {

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._instance.close ( this.toggler );

      }

      this._isHoverOpen = false;

      this._hoverCloseTimeout = false;

      this._off ( this.$target, Pointer.enter, this.__hoverTargetEnter );

    }

    __hoverTargetEnter () {

      if ( this._hoverCloseTimeout ) {

        clearTimeout ( this._hoverCloseTimeout );

        this._hoverCloseTimeout = false;

      }

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._one ( this.$target, Pointer.leave, this.__hoverTargetLeave );

      }

    }

    __hoverTargetLeave () {

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

        this._one ( this.$target, Pointer.enter, this.__hoverTargetEnter );

      }

    }

    /* PUBLIC */

    toggle ( force ) {

      return this._instance.toggle ( force, this.toggler );

    }

  }

  /* BINDING */

  Svelto.Toggler = Toggler;
  Svelto.Toggler.config = config;

}( Svelto.$, Svelto._, window, document ));
