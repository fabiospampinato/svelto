
/* =========================================================================
 * Svelto - Widgets - Selectable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @optional widgets/datatables/datatables.js
 * @require core/browser/browser.js
 * @require core/mouse/mouse.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, Browser, Keyboard, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    plugin: true,
    selector: 'table.selectable',
    options: {
      moveThreshold: 5, // Threshold after with we start to consider the `Pointer.move` events (Dragging disabled on touch device)
      single: false, // Enforcing `select-single` even without the need to add the class
      classes: {
        selected: 'selected',
        single: 'select-single',
        datatable: 'datatable'
      },
      selectors: {
        element: 'tbody tr:not(.table-row-empty)', //FIXME: Add support for datatables' empty row
        selectionToggler: undefined // Selector having `element` as context. If falsy the entire `element` will be the selection toggler
      },
      keystrokes: {
        'ctmd + a': 'all',
        'ctmd + shift + a': 'clear',
        'ctmd + i': 'invert'
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

      this._isSingle = this.options.single || this.$selectable.hasClass ( this.options.classes.single );
      this._isDataTable = this.$selectable.hasClass ( this.options.classes.datatable );

      this._dtapi = this._isDataTable ? this.$selectable.DataTable () : false;

      this.$elements = this._getElements ();

      this._usingSelectionToggler = !!this.options.selectors.selectionToggler;
      this.options.selectors.selectionToggler = this._usingSelectionToggler ? this.options.selectors.element + ' ' + this.options.selectors.selectionToggler : this.options.selectors.element;

      this.__move = this._frames ( this.__move.bind ( this ) ); // For performance reasons

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

      this._on ( true, 'change tablehelper:change sortable:sort processing.dt sort.dt search.dt', this.__change );

    }

    __change () {

      this.$elements = this._getElements ();

      this._resetPrev ();

      this._trigger ( 'change' );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* DOWN / TAP */

    ___downTap () {

      if ( this._isSingle ) {

        this.___tap ();

      } else if ( Browser.is.touchDevice ) {

        this.___down ();
        this.___tap ();

      } else {

        this.___down ();

      }

    }

    ___down () {

      this._on ( Pointer.down, this.options.selectors.selectionToggler, this.__down );

    }

    ___tap () {

      this._tappable = true;

      this._on ( Pointer.tap, this.options.selectors.selectionToggler, this.__tapTouch );

    }

    /* TAP */ // Just for touch devices or single select

    __tapTouch ( event ) {

      if ( !this._tappable ) return;

      event.preventDefault ();

      let $target = this._getEventElement ( event );

      if ( this._isSingle ) {

        this.$elements.not ( $target ).removeClass ( this.options.classes.selected ); //FIXME: Quite performance intensive, most of it could be avoided

      }

      $target.toggleClass ( this.options.classes.selected );

      this._trigger ( 'change' );

    }

    /* CLICK / CTMD + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      this._tappable = Pointer.isTouchEvent ( event );

      if ( this._tappable ) return;

      event.preventDefault ();

      this.startEvent = event;
      this.$startElement = this._getEventElement ( event );

      this._on ( true, $.$document, Pointer.move, this.__move );

      this._one ( true, $.$document, Pointer.up, this.__up );

      this._one ( true, $.$document, Pointer.cancel, this.__cancel );

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

        this._off ( $.$document, Pointer.move, this.__move );

        this._off ( $.$document, Pointer.up, this.__up );

        this._off ( $.$document, Pointer.cancel, this.__cancel );

        this._resetPrev ();

        if ( !Keyboard.keystroke.hasCtrlOrCmd ( event ) ) {

          this.$elements.removeClass ( this.options.classes.selected );

        }

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._on ( true, Pointer.enter, this.options.selectors.element, this.__dragEnter );

        this._one ( true, $.$document, Pointer.up + ' ' + Pointer.cancel, this.__dragEnd );

        this._trigger ( 'change' );

      }

    }

    __dragEnter ( event ) {

      this._toggleGroup ( this.$startElement, this._getEventElement ( event ) );

      this._trigger ( 'change' );

    }

    __dragEnd () {

      this._off ( Pointer.enter, this.__dragEnter );

    }

    __up ( event ) {

      this._off ( $.$document, Pointer.move, this.__move );

      this._off ( $.$document, Pointer.cancel, this.__cancel );

      let isRightButton = Mouse.hasButton ( event, Mouse.buttons.RIGHT ); // When right clicking we suppose that we also want to select that element (useful when used in conjuction with SelectableActionsPopover)

      if ( event.shiftKey ) {

        this._toggleGroup ( this.$prevElement, this.$startElement );

      } else if ( Keyboard.keystroke.hasCtrlOrCmd ( event ) ) {

        this.$startElement.toggleClass ( this.options.classes.selected, isRightButton ? true : undefined );

        this._resetPrev ( this.$startElement );

      } else {

        let $selected = this.get (),
            $others = $selected.not ( this.$startElement );

        if ( $others.length  ) {

          $others.removeClass ( this.options.classes.selected );

          this.$startElement.addClass ( this.options.classes.selected );

        } else {

          this.$startElement.toggleClass ( this.options.classes.selected, isRightButton ? true : undefined );

        }

        this._resetPrev ( this.$startElement );

      }

      this._trigger ( 'change' );

    }

    __cancel () {

      this._off ( $.$document, Pointer.move, this.__move );

      this._off ( $.$document, Pointer.up, this.__up );

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

      return this._dtapi ? $(this._dtapi.rows ().nodes ()) : this.$selectable.find ( this.options.selectors.element );

    }

    _getEventElement ( event ) {

      let $target = $(event.currentTarget);

      return this._usingSelectionToggler ? $target.closest ( this.options.selectors.element) : $target;

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

      if ( this._isSingle ) return;

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

      if ( this._isSingle ) return;

      this.$elements.toggleClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( Selectable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Browser, Svelto.Keyboard, Svelto.Mouse ));
