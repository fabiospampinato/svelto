
/* =========================================================================
 * Svelto - Selectable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    plugin: true,
    selector: 'table.selectable',
    options: {
      moveThreshold: 10,
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

  class Selectable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$selectable = this.$element;
      this.$elements = this._getElements ();

    }

    _events () {

      if ( $.browser.is.touchDevice ) {

        this._on ( Pointer.tap, this.options.selectors.element, this.__tapTouch );

      } else {

        /* KEYDOWN */

        this._onHover ( [$document, 'keydown', this.__keydown] );

        /* DOWN */

        this._on ( Pointer.down, this.options.selectors.element, this.__down );

      }

      /* CHANGE */

      this._on ( 'change sortable:sort', this.__change );

    }

    /* TAP */ //INFO: Just for touch devices

    __tapTouch ( event ) {

      event.preventDefault ();

      $(event.currentTarget).toggleClass ( this.options.classes.selected );

    }

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      if ( event.button && event.button !== Svelto.mouseButton.LEFT ) return; //INFO: Only the left click is allowed

      event.preventDefault ();

      this.startEvent = event;
      this.$startElement = $(event.currentTarget);

      this._on ( true, $document, Pointer.move, this.__move );

      this._one ( true, $document, Pointer.up, this.__up );

      this._one ( true, $document, Pointer.cancel, this.__cancel );

    }

    __move ( event ) {

      event.preventDefault ();

      let startXY = $.eventXY ( this.startEvent ),
          endXY = $.eventXY ( event ),
          deltaXY = {
            X: endXY.X - startXY.X,
            Y: endXY.Y - startXY.Y
          },
          absDeltaXY = {
            X: Math.abs ( deltaXY.X ),
            Y: Math.abs ( deltaXY.Y )
          };

      if ( absDeltaXY.X >= this.options.moveThreshold || absDeltaXY.Y >= this.options.moveThreshold ) {

        this._off ( $document, Pointer.move, this.__move );

        this._off ( $document, Pointer.up, this.__up );

        this._off ( $document, Pointer.cancel, this.__cancel );

        this._resetPrev ();

        if ( !$.hasCtrlOrCmd ( event ) ) {

          this.$elements.removeClass ( this.options.classes.selected );

        }

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._on ( true, Pointer.enter, this.options.selectors.element, this.__dragEnter );

        this._one ( true, $document, Pointer.up + ' ' + Pointer.cancel, this.__dragEnd );

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

      this._off ( $document, Pointer.move, this.__move );

      this._off ( $document, Pointer.cancel, this.__cancel );

      if ( event.shiftKey ) {

        this._toggleGroup ( this.$prevElement, this.$startElement );

      } else if ( $.hasCtrlOrCmd ( event ) ) {

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._resetPrev ( this.$startElement );

      } else {

        let $selected = this.get (),
            $others = $selected.not ( this.$startElement );

        if ( $others.length > 0  ) {

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

      this._off ( $document, Pointer.move, this.__move );

      this._off ( $document, Pointer.up, this.__up );

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

      if ( minIndex === startIndex ) { //INFO: Direction: down

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

  $.factory ( Selectable, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
