
/* =========================================================================
 * Svelto - Draggable v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add page autoscroll capabilities
//TODO: [MAYBE] Add support for handlers outside of the draggable element itself
//TODO: Add unhandlers

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var isDragging = false;

  /* DRAGGABLE */

  $.factory ( 'svelto.draggable', {

    /* OPTIONS */

    options: {
      selectors: {
        handler: '.draggable-handler'
      },
      draggable: _.true, //INFO: Checks if we can drag it or not
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
        x: _.true,
        y: _.true
      },
      callbacks: {
        start: _.noop,
        move: _.noop,
        end: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.draggable = this.element;
      this.$draggable = this.$element;

      this.$handlers = this.options.onlyHandlers ? this.$draggable.find ( this.options.selectors.handler ) : this.$draggable;
      this.$unhandlers = this.$draggable.find ( this.options.selectors.unhandler );

    },

    _events: function () {

      this._on ( this.$handlers, Pointer.dragstart, this._start );

      if ( this.options.$proxy ) {

        this._on ( this.options.$proxy, Pointer.dragstart, this._start );

      }

    },

    /* ACTIONS */

    _centerToPoint ( point, suppressClasses ) {

      var draggableOffset = this.$draggable.offset ();

      var deltaXY = {
        X: point.X - ( draggableOffset.left - $html.scrollLeft () + ( this.$draggable.outerWidth () / 2 ) ),
        Y: point.Y - ( draggableOffset.top - $html.scrollTop () + ( this.$draggable.outerHeight () / 2 ) )
      };

      return this._actionMove ( deltaXY, suppressClasses );

    },

    _actionMove ( deltaXY, suppressClasses ) {

      var baseXY = {
        X: this.proxyXY ? this.proxyXY.X : this.initialXY.X,
        Y: this.proxyXY ? this.proxyXY.Y : this.initialXY.Y
      };

      if ( this.motion === false ) {

        this.motion = true;

        if ( this.options.constrainer.$element ) {

          var constrainerOffset = this.options.constrainer.$element.offset (),
              draggableOffset = this.$draggable.offset ();

          if ( this.options.axis !== 'y' ) {

            var halfWidth = this.options.constrainer.constrainCenter ? this.$draggable.outerWidth () / 2 : 0;

            this.translateX_min = constrainerOffset.left - ( draggableOffset.left - baseXY.X ) - halfWidth;
            this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth () - ( ( draggableOffset.left - baseXY.X ) + this.$draggable.outerWidth () ) + halfWidth;

          }

          if ( this.options.axis !== 'x' ) {

            var halfHeight = this.options.constrainer.constrainCenter ? this.$draggable.outerHeight () / 2 : 0;

            this.translateY_min = constrainerOffset.top - ( draggableOffset.top - baseXY.Y ) - halfHeight;
            this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight () - ( ( draggableOffset.top - baseXY.Y ) + this.$draggable.outerHeight () ) + halfHeight;

          }

        }

        if ( !suppressClasses ) {

          $html.addClass ( 'dragging' );
          this.$draggable.addClass ( 'dragging' );

        }

      }

      var translateX = baseXY.X,
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

      var modifiedXY = {
        X: this.options.modifiers.x ( translateX ),
        Y: this.options.modifiers.y ( translateY )
      };

      this.$draggable.translate2d ( _.isBoolean ( modifiedXY.X ) ? ( modifiedXY.X ? translateX : baseXY.X ) : modifiedXY.X, _.isBoolean ( modifiedXY.Y ) ? ( modifiedXY.Y ? translateY : baseXY.Y ) : modifiedXY.Y );

      return modifiedXY;

    },

    /* HANDLERS */

    _start: function ( event, data, trigger ) {

      if ( !isDragging && this.options.draggable () ) {

        this.$trigger = $(trigger);

        isDragging = true;

        this.motion = false;

        this.isProxyed = ( this.options.$proxy && this.$trigger.get ( 0 ) === this.options.$proxy.get ( 0 ) );
        this.proxyXY = false;

        this.initialXY = this.$draggable.translate2d ();;

        this._trigger ( 'start', _.merge ( data, { initialXY: this.initialXY, draggable: this.draggable } ) );

        this._on ( this.$trigger, Pointer.dragmove, this._move );
        this._on ( this.$trigger, Pointer.dragend, this._end );

      }

    },

    _move: function ( event, data ) {

      if ( this.isProxyed && this.motion === false ) {

        var modifiedXY = this._centerToPoint ( data.startXY );

        this.proxyXY = this.$draggable.translate2d ();

      }

      var modifiedXY = this._actionMove ( data.deltaXY );

      this._trigger ( 'move', _.merge ( data, { initialXY: this.initialXY, modifiedXY: modifiedXY, draggable: this.draggable } ) );

    },

    _end: function ( event, data ) {

      if ( this.motion === true ) {

        $html.removeClass ( 'dragging' );
        this.$draggable.removeClass ( 'dragging' );

        if ( this.options.revertable ) {

          this.$draggable.translate2d ( this.initialXY.X, this.initialXY.Y ); //TODO: Animate it

        }

        var modifiedXY = { X: 0, Y: 0 };

      } else if ( this.isProxyed ) {

        if ( this.options.proxyWithoutMotion ) {

          var modifiedXY = this._centerToPoint ( data.endXY, true );

        }

      }

      isDragging = false;

      this._trigger ( 'end', _.merge ( data, { initialXY: this.initialXY, modifiedXY: modifiedXY, draggable: this.draggable, motion: this.motion } ) );

      this._off ( this.$trigger, Pointer.dragmove, this._move );
      this._off ( this.$trigger, Pointer.dragend, this._end );

    }

  });

  /* READY */

  $(function () {

    $('.draggable').draggable ();

  });

}( jQuery, _, window, document ));
