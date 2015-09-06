
/* =========================================================================
 * Svelto - Draggable v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* DRAGGABLE */

  $.factory ( 'svelto.draggable', {

    /* OPTIONS */

    options: {
      selectors: {
        handler: '.draggable-handler'
      },
      draggable: _.true, //INFO: checks if we can drag it or not
      only_handlers: false, //INFO: only an handler can drag it around
      revertable: false, //INFO: on dragend take it back to the starting position
      axis: false, //INFO: limit the movements to this axis
      constrainer: { //INFO: constrain the drag inside the $element or coordinates
        $element: false, //INFO: if we want to keep the draggable inside this $element
        coordinates: false, //INFO: if we want to keep the draggable inside the coordinates //TODO: implement
        // {
        //   x1: 0,
        //   x2: 0,
        //   y1: 0,
        //   y2: 0
        // }
        constrain_center: false, //INFO: set the constrain type, it will constrain the whole shape, or the center
        axis: false, //INFO: if we want to constrain the draggable only in a specific axis
        tollerance: { //INFO: the amount of pixel flexibility that a constrainer has
          x: 0,
          y: 0
        }
      },
      modifiers: { //INFO: it can modify the setted X and Y transforms values
        x: _.true,
        y: _.true
      },
      callbacks: {
        beforestart: _.noop,
        start: _.noop,
        move: _.noop,
        end: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.draggable = this.element;
      this.$draggable = this.$element;

      if ( this.options.only_handlers ) {

        this.$handlers = this.$draggable.find ( this.options.selectors.handler ); //FIXME: does it make sense to have handlers inside the $draggable?

      }

    },

    _events: function () {

      if ( this.options.only_handlers ) {

        this._on ( this.$handlers, $.Pointer.dragstart, this._start );
        this._on ( this.$handlers, $.Pointer.dragmove, this._move );
        this._on ( this.$handlers, $.Pointer.dragend, this._end );

      } else {

        this._on ( $.Pointer.dragstart, this._start );
        this._on ( $.Pointer.dragmove, this._move );
        this._on ( $.Pointer.dragend, this._end );

      }

    },

    /* PRIVATE */

    _start: function ( event, data ) {

      this.isDraggable = this.options.draggable ();

      if ( !this.isDraggable ) return;

      this._trigger ( 'beforestart' );

      this.motion = false;

      var transform_str = this.$draggable.css ( 'transform' ),
        matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0];

      this.initialXY = {
        X: parseInt ( matrix[4], 10 ),
        Y: parseInt ( matrix[5], 10 )
      };

      this._trigger ( 'start', _.merge ( data, { initialXY: this.initialXY, draggable: this.draggable, $draggable: this.$draggable } ) );

    },

    _move: function ( event, data ) { //TODO: make it more performant

      if ( !this.isDraggable ) return;

      if ( this.motion === false ) {

        this.motion = true;

        if ( this.options.constrainer.$element ) {

          var constrainer_offset = this.options.constrainer.$element.offset (),
            draggable_offset = this.$draggable.offset ();

          this.translateX_min = constrainer_offset.left - ( draggable_offset.left - this.initialXY.X ) + ( this.options.constrainer.constrain_center ? - this.$draggable.width () / 2 : 0 );
          this.translateX_max = constrainer_offset.left + this.options.constrainer.$element.width () - ( ( draggable_offset.left - this.initialXY.X ) + this.$draggable.width () ) + ( this.options.constrainer.constrain_center ? this.$draggable.width () / 2 : 0 );

          this.translateY_min = constrainer_offset.top - ( draggable_offset.top - this.initialXY.Y ) + ( this.options.constrainer.constrain_center ? - this.$draggable.height () / 2 : 0 );
          this.translateY_max = constrainer_offset.top + this.options.constrainer.$element.height () - ( ( draggable_offset.top - this.initialXY.Y ) + this.$draggable.height () ) + ( this.options.constrainer.constrain_center ? this.$draggable.height () / 2 : 0 );

        } else if ( this.options.constrainer.coordinates ) {

          var draggable_offset = this.$draggable.offset ();

          if ( !_.isUndefined ( this.options.constrainer.coordinates.x1 ) ) {

            this.translateX_min = this.options.constrainer.coordinates.x1 - ( draggable_offset.left - this.initialXY.X ) + ( this.options.constrainer.constrain_center ? - this.$draggable.width () / 2 : 0 );

          }

          if ( !_.isUndefined ( this.options.constrainer.coordinates.x2 ) ) {

            this.translateX_max = this.options.constrainer.coordinates.x2 - ( ( draggable_offset.left - this.initialXY.X ) + this.$draggable.width () ) + ( this.options.constrainer.constrain_center ? this.$draggable.width () / 2 : 0 );

          }

          if ( !_.isUndefined ( this.options.constrainer.coordinates.y1 ) ) {

            this.translateY_min = this.options.constrainer.coordinates.y1 - ( draggable_offset.top - this.initialXY.Y ) + ( this.options.constrainer.constrain_center ? - this.$draggable.height () / 2 : 0 );

          }

          if ( !_.isUndefined ( this.options.constrainer.coordinates.y2 ) ) {

            this.translateY_max = this.options.constrainer.coordinates.y2 - ( ( draggable_offset.top - this.initialXY.Y ) + this.$draggable.height () ) + ( this.options.constrainer.constrain_center ? - this.$draggable.height () / 2 : 0 );

          }

        }

        $html.addClass ( 'dragging' );
        this.$draggable.addClass ( 'dragging' );

      }

      var translateX = this.initialXY.X + ( ( this.options.axis === 'y' ) ? 0 : data.deltaXY.X ),
        translateY = this.initialXY.Y + ( ( this.options.axis === 'x' ) ? 0 : data.deltaXY.Y );

      if ( this.options.constrainer.$element || this.options.constrainer.coordinates ) {

        if ( this.options.constrainer.axis !== 'y' ) {

          translateX = _.clamp ( _.isUndefined ( this.translateX_min ) ? undefined : this.translateX_min - this.options.constrainer.tollerance.x, translateX, _.isUndefined ( this.translateX_max ) ? undefined : this.translateX_max + this.options.constrainer.tollerance.x );

        }

        if ( this.options.constrainer.axis !== 'x' ) {

          translateY = _.clamp ( _.isUndefined ( this.translateY_min ) ? undefined : this.translateY_min - this.options.constrainer.tollerance.y, translateY, _.isUndefined ( this.translateY_max ) ? undefined : this.translateY_max + this.options.constrainer.tollerance.y );

        }

      }

      var modifiedXY = {
        X: this.options.modifiers.x ( translateX ),
        Y: this.options.modifiers.y ( translateY )
      };

      this.$draggable.css ( 'transform', 'translate3d(' + ( _.isBoolean ( modifiedXY.X ) ? ( modifiedXY.X ? translateX : this.initialXY.X ) : modifiedXY.X ) + 'px,' + ( _.isBoolean ( modifiedXY.Y ) ? ( modifiedXY.Y ? translateY : this.initialXY.Y ) : modifiedXY.Y ) + 'px,0)' );

      this._trigger ( 'move', _.merge ( data, { initialXY: this.initialXY, modifiedXY: modifiedXY, draggable: this.draggable, $draggable: this.$draggable } ) );

    },

    _end: function ( event, data ) {

      if ( !this.isDraggable ) return;

      if ( this.motion === true ) {

        $html.removeClass ( 'dragging' );
        this.$draggable.removeClass ( 'dragging' );

        if ( this.options.revertable ) {

          this.$draggable.css ( 'transform', 'translate3d(' + this.initialXY.X + 'px,' + this.initialXY.Y + 'px,0)' ); //TODO: animate it

        }

      }

      this._trigger ( 'end', _.merge ( data, { initialXY: this.initialXY, draggable: this.draggable, $draggable: this.$draggable, dragged: this.motion } ) );

    }

  });

  /* READY */

  $(function () {

    $('.draggable').draggable ();

  });

}( jQuery, _, window, document ));
