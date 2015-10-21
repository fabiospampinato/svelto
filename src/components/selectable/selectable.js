
/* =========================================================================
 * Svelto - Selectable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add dropdown for actions AND/OR right click for action
//FIXME: Add support tableHelper and sortable
//TODO: Make it work with checkboxes (basically use checkboxes instead of the entire row)


//FIXME: It doens't work without the cmd/ctrl key on desktop


(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    templates: {
      base: false
    },
    options: {
      classes: {
        selected: 'selected'
      },
      selectors: {
        element: 'tbody tr:not(.empty)'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* SELECTABLE */

  class Selectable extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( 'table.selectable' ).selectable ();
      $root.filter ( 'table.selectable' ).selectable ();

    }

    _variables () {

      this.$selectable = this.$element;
      this.$elements = this._getElements ();

      this.$startElement = false;
      this.$endElement = false;

    }

    _events () {

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* POINTER */

      this._on ( Pointer.down, this.options.selectors.element, this.__down );

      /* OTHERS */

      this._on ( 'change sort', this.__change );

    }

    /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

    __keydown ( event ) {

      if ( $.hasCtrlOrCmd ( event ) ) {

        if ( event.keyCode === 65 ) { //INFO: A

          event.preventDefault ();
          event.stopImmediatePropagation ();

          this._resetPrev ();

          this.$elements.toggleClass ( this.options.classes.selected, !event.shiftKey ); //INFO: SHIFT or not //FIXME: It only works if the last character pushed is the `A`, but is it an unwanted behaviour?

          this._trigger ( 'change' );

        } else if ( event.keyCode === 73 ) { //INFO: I

          event.preventDefault ();
          event.stopImmediatePropagation ();

          this._resetPrev ();

          this.$elements.toggleClass ( this.options.classes.selected );

          this._trigger ( 'change' );

        }

      }

    }

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      if ( event.button && event.button !== UI.mouseButton.LEFT ) return; //INFO: Only the left click is allowed

      event.preventDefault ();

      this.$startElement = $(event.currentTarget);

      if ( !$.browser.is.touchDevice ) {

        this._on ( $document, Pointer.move, this.__move );

      }

      this._on ( Pointer.up, this.options.selectors.element, this.__up );

    }

    __move ( event ) {

      event.preventDefault ();

      this._off ( $document, Pointer.move, this.__move );

      this._off ( Pointer.up, this.__up );

      this.$elements.not ( this.$startElement ).removeClass ( this.options.classes.selected );

      this._resetPrev ();

      this.$prevElement = this.$startElement;

      this.$startElement.toggleClass ( this.options.classes.selected );

      this._on ( Pointer.enter, this.options.selectors.element, this.__dragEnter );

      this._on ( $document, Pointer.up, this.__dragMouseup );

      this._trigger ( 'change' );

    }

    __dragEnter ( event ) {

      //TODO: Remove previous

      this.$endElement = $(event.currentTarget);

      var startIndex = this.$elements.index ( this.$startElement ),
          endIndex = this.$elements.index ( this.$endElement ),
          minIndex = Math.min ( startIndex, endIndex ),
          maxIndex = Math.max ( startIndex, endIndex );

      if ( minIndex === startIndex ) { //INFO: Direction: down

        minIndex += 1;
        maxIndex += 1;

      }

      var $newDragged = this.$elements.slice ( minIndex, maxIndex );

      if ( this.$prevDragged ) {

        $newDragged.not ( this.$prevDragged ).toggleClass ( this.options.classes.selected );

        this.$prevDragged.not ( $newDragged ).toggleClass ( this.options.classes.selected );

      } else {

        $newDragged.toggleClass ( this.options.classes.selected );

      }

      this.$prevDragged = $newDragged;

      this._trigger ( 'change' );

    }

    __dragMouseup () {

      this._off ( Pointer.enter, this.__dragEnter );

      this._off ( $document, Pointer.up, this.__dragMouseup );

      this.$prevDragged = false;

    }

    __up ( event ) {

      this._off ( $document, Pointer.move, this.__move );

      this._off ( Pointer.up, this.__up );

      if ( event.shiftKey ) {

        var startIndex = this.$elements.index ( this.$prevElement ),
            endIndex = this.$prevElement ? this.$elements.index ( this.$startElement ) : 0,
            minIndex = Math.min ( startIndex, endIndex ),
            maxIndex = Math.max ( startIndex, endIndex );

        if ( minIndex === startIndex ) { //INFO: Direction: down

          minIndex += 1;
          maxIndex += 1;

        }

        var $newShifted = this.$elements.slice ( minIndex, maxIndex );

        if ( this.$prevShifted ) {

          $newShifted.not ( this.$prevShifted ).toggleClass ( this.options.classes.selected );

          this.$prevShifted.not ( $newShifted ).toggleClass ( this.options.classes.selected );

        } else {

          $newShifted.toggleClass ( this.options.classes.selected );

        }

        this.$prevShifted = $newShifted;

      } else if ( $.hasCtrlOrCmd ( event ) || $.browser.is.touchDevice ) { //TODO: On mobile we behave like if the `ctrl` key is always pressed, so that we can support selecting multiple rows even there //FIXME: Is this the wanted behavious?

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._resetPrev ();

        this.$prevElement = this.$startElement;

      } else {

        var $selected = this.$elements.not ( this.$startElement );

        if ( $selected.length > 0 ) {

          $selected.removeClass ( this.options.classes.selected );

        } else {

          this.$startElement.removeClass ( this.options.classes.selected );

        }

        this._resetPrev ();

        this.$prevElement = this.$startElement;

      }

      this._trigger ( 'change' );

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

}( jQuery, _, window, document ));
