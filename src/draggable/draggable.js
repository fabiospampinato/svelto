
/* =========================================================================
 * Svelto - Draggable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Add page autoscroll capabilities
//TODO: [MAYBE] Add support for handlers outside of the draggable element itself
//TODO: Add unhandlers
//TODO: Add support for ghost element, that will happear when dragging instead of the element itself, it should also work well with droppable

//FIXME: Make better _trigger datas, in linea con quelli che passiamo in droppable
//FIXME: Don't trigger the move events if we are not doing it more than a threashold, but just on touch devices, there is very difficult to do an extremelly precise tap without moving the finger
//FIXME: Handler drag cancel, for example in firefox and IE dragging outside of the window
//FIXME: On iOS, if the draggable is too close to the left edge of the screen dragging it will cause a `scroll to go back` event/animation on safari

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let isDragging = false;

  /* CONFIG */

  let config = {
    name: 'draggable',
    plugin: true,
    selector: '.draggable',
    options: {
      draggable: () => true, //INFO: Checks if we can drag it or not
      onlyHandlers: false, //INFO: Only an handler can drag it around
      revertable: false, //INFO: On dragend take it back to the starting position
      axis: false, //INFO: Limit the movements to this axis
      $proxy: false, //INFO: Drag the element also when we are triggering a drag from the `$proxy` element
      proxyWithoutMotion: true, //INFO: If enabled even if there's no motion the proxied draggable will get positionated to the dragend point event
      constrainer: { //INFO: Constrain the drag inside the $element
        $element: false, //INFO: If we want to keep the draggable inside this $element
        constrainCenter: false, //INFO: Set the constrain type, it will constrain the whole shape, or the center
        tollerance: { //INFO: The amount of pixel flexibility that a constrainer has
          x: 0,
          y: 0
        }
      },
      modifiers: { //INFO: It can modify the setted X and Y transforms values
        x: () => true,
        y: () => true
      },
      classes: {
        dragging: 'dragging'
      },
      selectors: {
        handler: '.draggable-handler'
      },
      callbacks: {
        start: _.noop,
        move: _.noop,
        end: _.noop
      }
    }
  };

  /* DRAGGABLE */

  class Draggable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.draggable = this.element;
      this.$draggable = this.$element;

      this.$handlers = this.options.onlyHandlers ? this.$draggable.find ( this.options.selectors.handler ) : this.$draggable;

    }

    _events () {

      /* DOWN */

      this._on ( this.$handlers, Pointer.down, this.__down );

      /* PROXY */

      if ( this.options.$proxy ) {

        this._on ( this.options.$proxy, Pointer.down, this.__down );

      }

    }

    /* ACTIONS */

    _centerToPoint ( point, suppressClasses ) {

      let draggableOffset = this.$draggable.offset ();

      let deltaXY = {
        X: point.X - ( draggableOffset.left + ( this.$draggable.outerWidth () / 2 ) ),
        Y: point.Y - ( draggableOffset.top + ( this.$draggable.outerHeight () / 2 ) )
      };

      return this._actionMove ( deltaXY, suppressClasses );

    }

    _actionMove ( deltaXY, suppressClasses ) {

      let baseXY = {
        X: this.proxyXY ? this.proxyXY.X : this.initialXY.X,
        Y: this.proxyXY ? this.proxyXY.Y : this.initialXY.Y
      };

      if ( this.motion === false ) {

        this.motion = true;

        if ( this.options.constrainer.$element ) {

          let constrainerOffset = this.options.constrainer.$element.offset (),
              draggableOffset = this.$draggable.offset ();

          if ( this.options.axis !== 'y' ) {

            let halfWidth = this.options.constrainer.constrainCenter ? this.$draggable.outerWidth () / 2 : 0;

            this.translateX_min = constrainerOffset.left - ( draggableOffset.left - baseXY.X ) - halfWidth;
            this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth () - ( ( draggableOffset.left - baseXY.X ) + this.$draggable.outerWidth () ) + halfWidth;

          }

          if ( this.options.axis !== 'x' ) {

            let halfHeight = this.options.constrainer.constrainCenter ? this.$draggable.outerHeight () / 2 : 0;

            this.translateY_min = constrainerOffset.top - ( draggableOffset.top - baseXY.Y ) - halfHeight;
            this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight () - ( ( draggableOffset.top - baseXY.Y ) + this.$draggable.outerHeight () ) + halfHeight;

          }

        }

        if ( !suppressClasses ) {

          $html.addClass ( this.options.classes.dragging );
          this.$draggable.addClass ( this.options.classes.dragging );

        }

      }

      let translateX = baseXY.X,
          translateY = baseXY.Y;

      if ( this.options.axis !== 'y' ) {

        translateX += deltaXY.X;

        if ( this.options.constrainer.$element ) {

          translateX = _.clamp ( this.translateX_min - this.options.constrainer.tollerance.x, translateX, this.translateX_max + this.options.constrainer.tollerance.x );

        }

      }

      if ( this.options.axis !== 'x' ) {

        translateY += deltaXY.Y;

        if ( this.options.constrainer.$element ) {

          translateY = _.clamp ( this.translateY_min - this.options.constrainer.tollerance.y, translateY, this.translateY_max + this.options.constrainer.tollerance.y );

        }

      }

      let modifiedXY = {
            X: this.options.modifiers.x ( translateX ),
            Y: this.options.modifiers.y ( translateY )
          },
          endXY = {
            X: _.isBoolean ( modifiedXY.X ) ? ( modifiedXY.X ? translateX : baseXY.X ) : modifiedXY.X,
            Y: _.isBoolean ( modifiedXY.Y ) ? ( modifiedXY.Y ? translateY : baseXY.Y ) : modifiedXY.Y
          };

      this.$draggable.translate ( endXY.X, endXY.Y );

      return endXY;

    }

    /* HANDLERS */

    __down ( event ) {

      if ( !isDragging && this.options.draggable () ) {

        event.preventDefault ();

        isDragging = true;

        this.motion = false;

        this.startXY = $.eventXY ( event );
        this.initialXY = this.$draggable.translate ();

        this.isProxyed = ( this.options.$proxy && event.currentTarget === this.options.$proxy[0] );
        this.proxyXY = false;

        this._trigger ( 'start', { draggable: this.draggable, event: event, initialXY: this.initialXY } );

        this._on ( $document, Pointer.move, this.__move );
        this._on ( $document, Pointer.up, this.__up );
        this._on ( $document, Pointer.cancel, this.__cancel );

      }

    }

    __move ( event ) {

      if ( this.isProxyed && this.motion === false ) {

        let modifiedXY = this._centerToPoint ( this.startXY );

        this.proxyXY = this.$draggable.translate ();

      }

      let moveXY = $.eventXY ( event ),
          deltaXY = {
            X: moveXY.X - this.startXY.X,
            Y: moveXY.Y - this.startXY.Y
          };

      let modifiedXY = this._actionMove ( deltaXY );

      this._trigger ( 'move', { draggable: this.draggable, event: event, initialXY: this.initialXY, moveXY: modifiedXY } );

    }

    __up ( event ) {

      let modifiedXY = this.initialXY;

      if ( this.motion === true ) {

        $html.removeClass ( this.options.classes.dragging );
        this.$draggable.removeClass ( this.options.classes.dragging );

        /* REVERTABLE */

        if ( this.options.revertable ) {

          this.$draggable.translate ( this.initialXY.X, this.initialXY.Y ); //TODO: Animate it

        } else {

          modifiedXY = this.$draggable.translate ();

        }

      } else if ( this.isProxyed ) {

        if ( this.options.proxyWithoutMotion && ( !event.button || event.button === Svelto.mouseButton.LEFT ) ) {

          let endXY = $.eventXY ( event );

          modifiedXY = this._centerToPoint ( endXY, true );

        }

      }

      isDragging = false;

      this._off ( $document, Pointer.move, this.__move );
      this._off ( $document, Pointer.up, this.__up );
      this._off ( $document, Pointer.cancel, this.__cancel );

      this._trigger ( 'end', { draggable: this.draggable, event: event, initialXY: this.initialXY, endXY: modifiedXY, motion: this.motion } );

    }

    __cancel () {

      isDragging = false;

      this._off ( $document, Pointer.move, this.__move );
      this._off ( $document, Pointer.up, this.__up );
      this._off ( $document, Pointer.cancel, this.__cancel );

    }

  }

  /* FACTORY */

  $.factory ( Draggable, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
