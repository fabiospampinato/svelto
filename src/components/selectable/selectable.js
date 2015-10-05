
/* =========================================================================
 * Svelto - Selectable v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */


// ------------------------------------------------------------------------------------------------
//TODO: Abstract mousedown, mouseup, mousemove etc with the pointer, then write `selectable` better
// ------------------------------------------------------------------------------------------------


//TODO: Add dropdown for actions AND/OR right click for action
//FIXME: Make it workable with sorting (update after sorting since we may)
//TODO: Make it work with checkboxes (basically use checkboxes instead of the entire row)
//FIXME: Select multiple with shift, then just click inside the selection, the clicked element doesn't get selected

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* PRIVATE */

  var clearSelection = function () {

    if ( document.selection ) {

      document.selection.empty ();

    } else if ( window.getSelection ) {

      window.getSelection ().removeAllRanges ();

    }

  };

  /* SELECTABLE */

  $.factory ( 'svelto.selectable', {

    /* OPTIONS */

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
    },

    /* SPECIAL */

    _variables: function () {

      this.$selectable = this.$element;
      this.$elements = this._getElements ();

      this.$startElement = false;
      this.$endElement = false;

      this._resetPrev ();

    },

    _events: function () {

      /* KEYS */

      this._on ( 'mouseenter', this.__keysIn );

      this._on ( 'mouseleave', this.__keysOut );

      /* MOUSE */

      this._on ( 'mousedown', this.options.selectors.element, this.__mousedown );

      /* OTHERS */

      //FIXME: Add support tableHelper and sortable

      this._on ( 'change sort', this.__change );

      this._on ( 'mousedown mouseup', this.__clearSelection );

    },

    /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

    __keysIn: function () {

      this._on ( $document, 'keydown', this.__keysKeydown );

    },

    __keysOut: function () {

      this._off ( $document, 'keydown', this.__keysKeydown );

    },

    __keysKeydown: function ( event ) {

      if ( ( $.browser.is.mac && event.metaKey ) || ( !$.browser.is.mac && event.ctrlKey ) ) { //INFO: COMMAND or CTRL, is we are on Mac or not

        if ( event.keyCode === 65 ) { //INFO: A

          event.preventDefault ();

          this._resetPrev ();

          this.$elements.toggleClass ( this.options.selected_class, !event.shiftKey ); //INFO: SHIFT or not //FIXME: only works if the last character pushed is the `A`, but is it an unwanted behaviour?

          this._trigger ( 'select' );

        } else if ( event.keyCode === 73 ) { //INFO: I

          event.preventDefault ();

          this._resetPrev ();

          this.$elements.toggleClass ( this.options.selected_class );

          this._trigger ( 'select' );

        }

      }

    },

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG */

    __mousedown: function ( event ) {

      if ( event.button !== 0 ) return; //INFO: Only the left click is enabled

      this.$startElement = $(event.currentTarget);

      this._on ( $document, 'mousemove', this.__mousemove );

      this._on ( 'mouseup', this.options.selector, this.__mouseUp );

    },

    __mousemove: function ( event ) { // DRAG

      if ( ( $.browser.is.mac && !event.metaKey ) || ( !$.browser.is.mac && !event.ctrlKey ) ) return;

      this._off ( $document, 'mousemove', this.__mousemove );

      this._off ( 'mouseup', this.__mouseUp );

      this._resetPrev ();

      this.$prevElement = this.$startElement;

      this.$startElement.toggleClass ( this.options.selected_class );

      $html.addClass ( 'dragging' );

      this._on ( 'mouseenter', this.options.selector, this.__dragMouseenter );

      this._on ( $document, 'mouseup', this.__dragMouseup );

      this._trigger ( 'select' );

    },

    __dragMouseenter: function ( event ) { // DRAG HOVER

      this.$endElement = $(event.currentTarget);

      var start_index = this.$elements.index ( this.$startElement ),
        end_index = this.$elements.index ( this.$endElement ),
        min_index = Math.min ( start_index, end_index ),
        max_index = Math.max ( start_index, end_index );

      if ( min_index === start_index ) { // down

        min_index += 1;
        max_index += 1;

      }

      var $new_dragged = this.$elements.slice ( min_index, max_index );

      if ( this.$prevDragged ) {

        $new_dragged.not ( this.$prevDragged ).toggleClass ( this.options.selected_class );

        this.$prevDragged.not ( $new_dragged ).toggleClass ( this.options.selected_class );

      } else {

        $new_dragged.toggleClass ( this.options.selected_class );

      }

      this.$prevDragged = $new_dragged;

      this._trigger ( 'select' );

    },

    __dragMouseup: function () { // DRAG END

      this._off ( 'mouseenter', this.__dragMouseenter );

      this._off ( $document, 'mouseup', this.__dragMouseup );

      this.$prevDragged = false;

      $html.removeClass ( 'dragging' );

    },

    __mouseUp: function ( event ) { // CLICK

      this._off ( $document, 'mousemove', this.__mousemove );

      this._off ( 'mouseup', this.__mouseUp );

      if ( event.shiftKey ) {

        var start_index = this.$elements.index ( this.$prevElement ),
          end_index = this.$prevElement ? this.$elements.index ( this.$startElement ) : 0,
          min_index = Math.min ( start_index, end_index ),
          max_index = Math.max ( start_index, end_index );

        if ( min_index === start_index ) { // down

          min_index += 1;
          max_index += 1;

        }

        var $new_shifted = this.$elements.slice ( min_index, max_index );

        if ( this.$prevShifted ) {

          $new_shifted.not ( this.$prevShifted ).toggleClass ( this.options.selected_class );

          this.$prevShifted.not ( $new_shifted ).toggleClass ( this.options.selected_class );

        } else {

          $new_shifted.toggleClass ( this.options.selected_class );

        }

        this.$prevShifted = $new_shifted;

      } else if ( ( $.browser.is.mac && event.metaKey ) || ( !$.browser.is.mac && event.ctrlKey ) || $.browser.is.touchDevice ) { //TODO: On mobile we behave like if the `ctrl` key is always pressed, so that we can support selecting multiple rows even there //FIXME: Is this the wanted behavious?

        this.$startElement.toggleClass ( this.options.selected_class );

        this._resetPrev ();

        this.$prevElement = this.$startElement;

      } else {

        this.$elements.not ( this.$startElement ).removeClass ( this.options.selected_class );

        this.$startElement.toggleClass ( this.options.selected_class );

        this._resetPrev ();

        this.$prevElement = this.$startElement;

      }

      this._trigger ( 'select' );

    },

    /* OTHER EVENTS */

    __change: function () {

      this.$elements = this._getElements ();

    },

    __clearSelection: function () {

      $.reflow ();

      clearSelection ();

    },

    /* PRIVATE */

    _resetPrev: function () {

      this.$prevElement = false;
      this.$prevShifted = false;
      this.$prevDragged = false;

    },

    _getElements: function () {

      return this.$element.find ( this.options.selector );

    },

    /* API */

    get: function () {

      //TODO: Return selected rows

    }

  });

  /* READY */

  $(function () {

    $('table.table.selectable').selectable ();

  });

}( jQuery, _, window, document ));
