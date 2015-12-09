
/* =========================================================================
 * Svelto - Selectable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add dropdown for actions AND/OR right click for action (This is a good fit for a new component)
//FIXME: Add support for tableHelper and sortable
//TODO: Make it work with checkboxes (basically use checkboxes instead of the entire row)
//TODO: Store the current selected rows, it makes it faster than retrieving it at every change event

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    selector: 'table.selectable',
    options: {
      moveThreshold: 10,
      classes: {
        selected: 'selected'
      },
      selectors: {
        element: 'tbody tr:not(.empty)'
      },
      callbacks: {
        change () {}
      }
    }
  };

  /* SELECTABLE */

  class Selectable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$selectable = this.$element;
      this.$elements = this._getElements ();

      this.$startElement = false;
      this.$endElement = false;

    }

    _events () {

      /* KEYDOWN */

      if ( !$.browser.is.touchDevice ) {

        this._onHover ( [$document, 'keydown', this.__keydown] );

      }

      /* POINTER */

      this._on ( Pointer.down, this.options.selectors.element, this.__down );

      /* OTHERS */

      this._on ( 'change sort', this.__change );

    }

    /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

    __keydown ( event ) {

      if ( $.hasCtrlOrCmd ( event ) ) {

        switch ( event.keyCode ) {

          case 65: //INFO: `A`
            this.$elements.toggleClass ( this.options.classes.selected, !event.shiftKey ); //INFO: SHIFT or not //FIXME: It only works if the last character pushed is the `A`, but is it an unwanted behaviour?
            break;

          case 73: //INFO: `I`
            this.$elements.toggleClass ( this.options.classes.selected );
            break;

          default:
            return;

        }

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this._resetPrev ();

        this._trigger ( 'change' );

      }

    }

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      if ( event.button && event.button !== Svelto.mouseButton.LEFT ) return; //INFO: Only the left click is allowed

      if ( !$.browser.is.touchDevice ) {

        event.preventDefault ();

      }

      this.startEvent = event;
      this.$startElement = $(event.currentTarget);

      this.motion = false;

      this._on ( $document, Pointer.move, this.__move );

      this._one ( Pointer.up, this.options.selectors.element, this.__up );

      this._one ( Pointer.cancel, this.options.selectors.element, this.__cancel );

    }

    __move ( event ) {

      this.motion = true;

      if ( !$.browser.is.touchDevice ) {

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

          if ( !$.hasCtrlOrCmd ( event ) ) {

            this.$elements.removeClass ( this.options.classes.selected );

          }

          this._off ( Pointer.up, this.__up );

          this._off ( Pointer.cancel, this.__cancel );

          this._resetPrev ();

          this.$prevElement = this.$startElement;

          this.$startElement.toggleClass ( this.options.classes.selected );

          this._on ( Pointer.enter, this.options.selectors.element, this.__dragEnter );

          this._one ( $document, Pointer.up, this.__dragEnd );
          this._one ( $document, Pointer.cancel, this.__dragEnd );

          this._trigger ( 'change' );

        }

      } else {

        this._off ( $document, Pointer.move, this.__move );

      }

    }

    __dragEnter ( event ) {

      this.$endElement = $(event.currentTarget);

      let startIndex = this.$elements.index ( this.$startElement ),
          endIndex = this.$elements.index ( this.$endElement ),
          minIndex = Math.min ( startIndex, endIndex ),
          maxIndex = Math.max ( startIndex, endIndex );

      if ( minIndex === startIndex ) { //INFO: Direction: down

        minIndex += 1;
        maxIndex += 1;

      }

      let $newDragged = this.$elements.slice ( minIndex, maxIndex );

      if ( this.$prevDragged ) {

        $newDragged.not ( this.$prevDragged ).toggleClass ( this.options.classes.selected );

        this.$prevDragged.not ( $newDragged ).toggleClass ( this.options.classes.selected );

      } else {

        $newDragged.toggleClass ( this.options.classes.selected );

      }

      this.$prevDragged = $newDragged;

      this._trigger ( 'change' );

    }

    __dragEnd () {

      if ( !$.browser.is.touchDevice ) {

        this._off ( $document, Pointer.move, this.__move );

        this._off ( Pointer.enter, this.__dragEnter );

        this._off ( Pointer.up, this.__dragEnd );
        this._off ( Pointer.cancel, this.__dragEnd );

      }

      this.$prevDragged = false;

    }

    __up ( event ) {

      this._off ( $document, Pointer.move, this.__move );

      this._off ( Pointer.cancel, this.__cancel );

      if ( !$.browser.is.touchDevice || !this.motion ) {

        if ( event.shiftKey ) {

          let startIndex = this.$elements.index ( this.$prevElement ),
              endIndex = this.$prevElement ? this.$elements.index ( this.$startElement ) : 0,
              minIndex = Math.min ( startIndex, endIndex ),
              maxIndex = Math.max ( startIndex, endIndex );

          if ( minIndex === startIndex ) { //INFO: Direction: down

            minIndex += 1;
            maxIndex += 1;

          }

          let $newShifted = this.$elements.slice ( minIndex, maxIndex );

          if ( this.$prevShifted ) {

            $newShifted.not ( this.$prevShifted ).toggleClass ( this.options.classes.selected );

            this.$prevShifted.not ( $newShifted ).toggleClass ( this.options.classes.selected );

          } else {

            $newShifted.toggleClass ( this.options.classes.selected );

          }

          this.$prevShifted = $newShifted;

        } else if ( $.hasCtrlOrCmd ( event ) || $.browser.is.touchDevice ) { //TODO: On mobile we behave like if the `ctrl`/`cmd` key is always pressed, so that we can support selecting multiple rows even there //FIXME: Is this the wanted behavious?

          this.$startElement.toggleClass ( this.options.classes.selected );

          this._resetPrev ();

          this.$prevElement = this.$startElement;

        } else {

          this.$elements.removeClass ( this.options.classes.selected );

          this._resetPrev ();

        }

        this._trigger ( 'change' );

      }

    }

    __cancel () {

      this._off ( $document, Pointer.move, this.__move );

      this._off ( Pointer.up, this.__up );

    }

    /* OTHER EVENTS */

    __change () {

      this.$elements = this._getElements ();

      this._resetPrev ();

    }

    /* PRIVATE */

    _resetPrev () {

      this.$prevElement = false;
      this.$prevShifted = false;
      this.$prevDragged = false;

    }

    _getElements () {

      return this.$element.find ( this.options.selectors.element );

    }

    /* API */

    get () {

      return this.$elements.filter ( '.' + this.options.selectors.selected );

    }

  }

  /* BINDING */

  Svelto.Selectable = Selectable;
  Svelto.Selectable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Selectable );

}( Svelto.$, Svelto._, window, document ));
