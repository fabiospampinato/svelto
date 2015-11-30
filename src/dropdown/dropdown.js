
/* =========================================================================
 * Svelto - Dropdown
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../positionate/positionate.js
 * @requires ../pseudo_css/pseudo_css.js
 * ========================================================================= */

//TODO: Add support for delegating the trigger click, so that we support the case when a trigger has been added to the DOM dynamically

//FIXME: Hover open, enter the dropdown and click it, it gets closed...

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let assignments = {},
      openedNr = 0;

  /* CONFIG */

  let config = {
    name: 'dropdown',
    selector: '.dropdown',
    options: {
      hover: {
        triggerable: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      spacing: {
        attached: 0,
        noTip: 7,
        normal: 14
      },
      classes: {
        noTip: 'no-tip',
        attached: 'attached',
        moving: 'moving',
        open: 'open'
      },
      selectors: {
        closer: '.dropdown-closer'
      },
      callbacks: {
        beforeopen () {},
        open () {},
        close () {}
      }
    }
  };

  /* DROPDOWN */

  class Dropdown extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$dropdown = this.$element;
      this.$closers = this.$dropdown.find ( this.options.selectors.closer );

      this.id = this.$dropdown.attr ( 'id' ); //FIXME: Remove this requirement

      this.hasTip = !this.$dropdown.hasClass ( this.options.classes.noTip );
      this.isAttached = this.$dropdown.hasClass ( this.options.classes.attached );

      this._isOpen = false;

    }

    _events () {

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

      // this.$btn_parents.on ( 'scroll', this.update ); //FIXME: If we are doing it into a scrollable content it will be a problem if we don't handle it, the dropdown will not move

      /* HOVER */

      if ( this.options.hover.triggerable ) {

        this._on ( this.$triggers, Pointer.enter, this.__hoverTriggerEnter );

      }

    }

    /* HOVER */

    __hoverTriggerEnter ( event ) {

      if ( !this._isOpen ) {

        this._isHoverOpen = false;
        this._hoverTrigger = event.currentTarget;

        this._hoverOpenTimeout = this._delay ( this.__hoverOpen, this.options.hover.delays.open );

        this._one ( $(event.currentTarget), Pointer.leave, this.__hoverTriggerLeave );

      }

    }

    __hoverOpen () {

      if ( !this._isOpen ) {

        this.open ( false, this._hoverTrigger );

        this._isHoverOpen = true;

        this._hoverOpenTimeout = false;

      }

    }

    __hoverTriggerLeave ( event ) {

      if ( this._hoverOpenTimeout ) {

        clearTimeout ( this._hoverOpenTimeout );

        this._hoverOpenTimeout = false;

      }

      if ( this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

        this._on ( Pointer.enter, this.__hoverDropdownEnter );

      }

    }

    __hoverClose () {

      if ( this._isHoverOpen ) {

        this.close ();

        this._isHoverOpen = false;

        this._hoverCloseTimeout = false;

      }

      this._off ( Pointer.enter, this.__hoverDropdownEnter );

    }

    __hoverDropdownEnter () {

      if ( this._hoverCloseTimeout ) {

        clearTimeout ( this._hoverCloseTimeout );

        this._hoverCloseTimeout = false;

      }

      if ( this._isHoverOpen ) {

        this._one ( Pointer.leave, this.__hoverDropdownLeave );

      }

    }

    __hoverDropdownLeave () {

      if ( this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

      }

    }

    /* WINDOW RESIZE / SCROLL */

    _bindWindowResizeScroll () {

      this._on ( $window, 'resize scroll', this._update );

    }

    _unbindWindowResizeScroll () {

      this._off ( $window, 'resize scroll', this._update );

    }

    /* WINDOW TAP */

    _bindWindowTap () {

      this._on ( $window, Pointer.tap, this.__windowTap );

    }

    _unbindWindowTap () {

      this._off ( $window, Pointer.tap, this.__windowTap );

    }

    __windowTap ( event ) {

      let eventXY = $.eventXY ( event ),
          rect = this.$dropdown.getRect ();

      if ( eventXY.X < rect.left || eventXY.X > rect.right || eventXY.Y < rect.top || eventXY.Y > rect.bottom ) {

        this.close ();

      }

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      var $trigger = $(assignments[this.id]),
          $mockTip = $('<div>'),
          noTip = $trigger.hasClass ( this.options.classes.noTip ) || !this.hasTip || this.isAttached,
          self = this;

      /* POSITIONATE */

      this.$dropdown.positionate ({
        $anchor: $trigger,
        $pointer: noTip ? false : $mockTip,
        spacing:  this.isAttached ? this.options.spacing.attached : ( noTip ? this.options.spacing.noTip : this.options.spacing.normal ),
        callbacks: {
          change ( data ) {
            $trigger.addClass ( 'dropdown-trigger-' + data.direction );
          }
        }
      });

      /* MOCK TIP */

      if ( !noTip ) {

        $.pseudoCSS ( '#' + this.id + ':before', $mockTip.attr ( 'style' ).slice ( 0, -1 ) + ' rotate(45deg)' ); //FIXME: A bit to hacky, expecially that `rotate(45deg)`

      }

    }

    /* PRIVATE */

    _update () {

      if ( this._isOpen ) {

        this._positionate ();

      }

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen

    }

    toggle ( event ) {

      this[( this._isOpen && assignments[this.id] === event.currentTarget ) ? 'close' : 'open']( event, event.currentTarget );

    }

    open ( event, trigger ) {

      if ( !this._isOpen ) {

        trigger = trigger || event.currentTarget;

        if ( trigger ) {

          $(assignments[this.id]).removeClass ( 'dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right ' + this.options.classes.open );

          if ( this._isOpen && assignments[this.id] !== trigger ) {

            this.$dropdown.addClass ( this.options.classes.moving );

          }

          assignments[this.id] = trigger;

          $(trigger).addClass ( this.options.classes.open );

        }

        this._trigger ( 'beforeopen' );

        this._positionate ();

        this.$dropdown.addClass ( this.options.classes.open );

        this._isOpen = true;

        openedNr += 1;

        this._delay ( this._bindWindowTap ); //FIXME: Why without the delay it doesn't work?
        this._bindWindowResizeScroll ();

        this._trigger ( 'open' );

      }

    }

    close () {

      if ( this._isOpen ) {

        $(assignments[this.id]).removeClass ( 'dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right ' + this.options.classes.open );

        this.$dropdown.removeClass ( this.options.classes.open + ' ' + this.options.classes.moving );

        this._isOpen = false;

        openedNr -= 1;

        if ( openedNr === 0 ) {

          this._unbindWindowTap ();
          this._unbindWindowResizeScroll ();

        }

        this._trigger ( 'close' );

      }

    }

  }

  /* BINDING */

  Svelto.Dropdown = Dropdown;
  Svelto.Dropdown.config = config;

  /* FACTORY */

  $.factory ( Svelto.Dropdown );

}( Svelto.$, Svelto._, window, document ));
