
/* =========================================================================
 * Svelto - Widgets - Selectable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, Browser, Keyboard ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    plugin: true,
    selector: 'table.selectable',
    options: {
      moveThreshold: 5, // Threshold after with we start to consider the `Pointer.move` events (Dragging disabled on touch device)
      classes: {
        selected: 'selected'
      },
      selectors: {
        element: 'tbody tr:not(.empty)'
      },
      keystrokes: {
        'ctrl + a': 'all',
        'ctrl + shift + a': 'clear',
        'ctrl + i': 'invert'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* SELECTABLE */

  class Selectable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$selectable = this.$element;
      this.$elements = this._getElements ();

    }

    _events () {

      this.___change ();
      this.___keydown ();
      this.___downTap ();

    }

    _destroy () {

      this.clear ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, 'change tablehelper:change sortable:sort', this.__change );

    }

    /* KEYDOWN */

    ___keydown () {

      if ( !Browser.is.touchDevice ) {

        this._onHover ( [this.$document, 'keydown', this.__keydown] );

      }

    }

    /* DOWN / TAP */

    ___downTap () {

      if ( Browser.is.touchDevice ) {

        this._on ( Pointer.tap, this.options.selectors.element, this.__tapTouch );

      } else {

        this._on ( Pointer.down, this.options.selectors.element, this.__down );

      }

    }

    /* TAP */ // Just for touch devices

    __tapTouch ( event ) {

      event.preventDefault ();

      $(event.currentTarget).toggleClass ( this.options.classes.selected );

    }

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      event.preventDefault ();

      this.startEvent = event;
      this.$startElement = $(event.currentTarget);

      this._on ( true, this.$document, Pointer.move, this.__move );

      this._one ( true, this.$document, Pointer.up, this.__up );

      this._one ( true, this.$document, Pointer.cancel, this.__cancel );

    }

    __move ( event ) {

      event.preventDefault ();

      let startXY = $.eventXY ( this.startEvent ),
          endXY = $.eventXY ( event ),
          deltaXY = {
            x: endXY.x - startXY.x,
            y: endXY.y - startXY.y
          },
          absDeltaXY = {
            x: Math.abs ( deltaXY.x ),
            y: Math.abs ( deltaXY.y )
          };

      if ( absDeltaXY.x >= this.options.moveThreshold || absDeltaXY.y >= this.options.moveThreshold ) {

        this._off ( this.$document, Pointer.move, this.__move );

        this._off ( this.$document, Pointer.up, this.__up );

        this._off ( this.$document, Pointer.cancel, this.__cancel );

        this._resetPrev ();

        if ( !Keyboard.keystroke.hasCtrlOrCmd ( event ) ) {

          this.$elements.removeClass ( this.options.classes.selected );

        }

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._on ( true, Pointer.enter, this.options.selectors.element, this.__dragEnter );

        this._one ( true, this.$document, Pointer.up + ' ' + Pointer.cancel, this.__dragEnd );

        this._trigger ( 'change' );

      }

    }

    __dragEnter ( event ) {

      this._toggleGroup ( this.$startElement, $(event.currentTarget) );

      this._trigger ( 'change' );

    }

    __dragEnd () {

      this._off ( Pointer.enter, this.__dragEnter );

    }

    __up ( event ) {

      this._off ( this.$document, Pointer.move, this.__move );

      this._off ( this.$document, Pointer.cancel, this.__cancel );

      if ( event.shiftKey ) {

        this._toggleGroup ( this.$prevElement, this.$startElement );

      } else if ( Keyboard.keystroke.hasCtrlOrCmd ( event ) ) {

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._resetPrev ( this.$startElement );

      } else {

        let $selected = this.get (),
            $others = $selected.not ( this.$startElement );

        if ( $others.length  ) {

          $others.removeClass ( this.options.classes.selected );

          this.$startElement.addClass ( this.options.classes.selected );

        } else {

          this.$startElement.toggleClass ( this.options.classes.selected );

        }

        this._resetPrev ( this.$startElement );

      }

      this._trigger ( 'change' );

    }

    __cancel () {

      this._off ( this.$document, Pointer.move, this.__move );

      this._off ( this.$document, Pointer.up, this.__up );

    }

    /* OTHER EVENTS */

    __change () {

      this.$elements = this._getElements ();

      this._resetPrev ();

    }

    /* PRIVATE */

    _toggleGroup ( $start, $end ) {

      let startIndex = $start ? this.$elements.index ( $start ) : 0,
          endIndex = this.$elements.index ( $end ),
          minIndex = Math.min ( startIndex, endIndex ),
          maxIndex = Math.max ( startIndex, endIndex );

      if ( minIndex === startIndex ) { // Direction: down

        minIndex += 1;
        maxIndex += 1;

      }

      let $newGroup = this.$elements.slice ( minIndex, maxIndex );

      if ( this.$prevGroup ) {

        $newGroup.not ( this.$prevGroup ).toggleClass ( this.options.classes.selected );

        this.$prevGroup.not ( $newGroup ).toggleClass ( this.options.classes.selected );

      } else {

        $newGroup.toggleClass ( this.options.classes.selected );

      }

      this.$prevGroup = $newGroup;

    }

    _getElements () {

      return this.$element.find ( this.options.selectors.element );

    }

    _resetPrev ( $element = false, $group = false ) {

      this.$prevElement = $element;
      this.$prevGroup = $group;

    }

    /* API */

    get () {

      return this.$elements.filter ( '.' + this.options.classes.selected );

    }

    all () {

      this.$elements.addClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

    clear () {

      this.$elements.removeClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

    invert () {

      this.$elements.toggleClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( Selectable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Browser, Svelto.Keyboard ));
