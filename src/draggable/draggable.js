
/* =========================================================================
 * Svelto - Draggable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Animate `revert`
//TODO: Maybe return less datas to triggered events and callbacks

//FIXME: Reposition the draggable properly when autoscrolling inside a container (not document/html)
//FIXME: Don't trigger the move events if we are not doing it more than a threashold, but just on touch devices, there is very difficult to do an extremelly precise tap without moving the finger
//FIXME: On iOS, if the draggable is too close to the left edge of the screen dragging it will cause a `scroll to go back` event/animation on safari

(function ( $, _, Svelto, Widgets, Factory, Pointer, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'draggable',
    plugin: true,
    selector: '.draggable',
    options: {
      draggable: _.true, //INFO: Checks if we can drag it or not
      onlyHandlers: false, //INFO: Only an handler can drag it around
      revert: false, //INFO: On dragend take it back to the starting position
      axis: false, //INFO: Limit the movements to this axis
      $helper: false, //INFO: An element to drag around instead of the draggable, can be `false` (in case the draggable will be dragged), a jQuery object or a function yiedling a jQuery object
      proxy: {
        $element: false, //INFO: Drag the element also when we are triggering a drag from this element
        noMotion: true //INFO: If enabled even if there's no motion the proxied draggable will get positionated to the dragend point event (e.g. just a tap)
      },
      constrainer: { //INFO: Constrain the drag inside the $element
        $element: false, //INFO: If we want to keep the draggable inside this $element
        center: false, //INFO: Set the constrain type, it will constrain the whole shape, or the center
        tolerance: { //INFO: The amount of pixel flexibility that a constrainer has
          x: 0,
          y: 0
        }
      },
      modifiers: { //INFO: It can modify the setted X and Y transforms values
        x: _.true,
        y: _.true
      },
      scroll: { //INFO: Autoscroll the window when near the border
        active: false, //INFO: Active it or not
        speed: 20, //INFO: The amount of autoscroll
        sensitivity: 50 //INFO: How close it should be to tbe borders
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

  class Draggable extends Widgets.Widget {

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

      if ( this.options.proxy.$element ) {

        this._on ( this.options.proxy.$element, Pointer.down, this.__down );

      }

    }

    /* ACTIONS */

    _centerToPoint ( point, suppressClasses ) {

      let movableOffset = this.$movable.offset (),
          deltaXY = {
            X: point.X - ( movableOffset.left + ( this.$movable.outerWidth () / 2 ) ),
            Y: point.Y - ( movableOffset.top + ( this.$movable.outerHeight () / 2 ) )
          };

      return this._actionMove ( deltaXY, suppressClasses );

    }

    _actionMove ( deltaXY, suppressClasses ) {

      /* BASE */

      let baseXY = {
        X: this.proxyXY ? this.proxyXY.X : this.initialXY.X,
        Y: this.proxyXY ? this.proxyXY.Y : this.initialXY.Y
      };

      /* INIT */

      if ( !this.inited ) {

        this.inited = true;

        /* CLAMPING VALUES */

        if ( this.options.constrainer.$element ) {

          let constrainerOffset = this.options.constrainer.$element.offset (),
              movableOffset = this.$movable.offset ();

          if ( this.options.axis !== 'y' ) {

            let halfWidth = this.options.constrainer.center ? this.$movable.outerWidth () / 2 : 0;

            this.translateX_min = constrainerOffset.left - ( movableOffset.left - baseXY.X ) - halfWidth;
            this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth () - ( ( movableOffset.left - baseXY.X ) + this.$movable.outerWidth () ) + halfWidth;

          }

          if ( this.options.axis !== 'x' ) {

            let halfHeight = this.options.constrainer.center ? this.$movable.outerHeight () / 2 : 0;

            this.translateY_min = constrainerOffset.top - ( movableOffset.top - baseXY.Y ) - halfHeight;
            this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight () - ( ( movableOffset.top - baseXY.Y ) + this.$movable.outerHeight () ) + halfHeight;

          }

        }

        /* CLASSES */

        if ( !suppressClasses ) {

          this._addClasses ();

        }

      }

      /* CLAMPING */

      let translateX = baseXY.X,
          translateY = baseXY.Y;

      if ( this.options.axis !== 'y' ) {

        translateX += deltaXY.X;

        if ( this.options.constrainer.$element ) {

          translateX = _.clamp ( this.translateX_min - this.options.constrainer.tolerance.x, translateX, this.translateX_max + this.options.constrainer.tolerance.x );

        }

      }

      if ( this.options.axis !== 'x' ) {

        translateY += deltaXY.Y;

        if ( this.options.constrainer.$element ) {

          translateY = _.clamp ( this.translateY_min - this.options.constrainer.tolerance.y, translateY, this.translateY_max + this.options.constrainer.tolerance.y );

        }

      }

      /* MODIFYING */

      let modifiedXY = {
            X: this.options.modifiers.x ( translateX ),
            Y: this.options.modifiers.y ( translateY )
          };

      if ( modifiedXY.X === false && modifiedXY.Y === false ) { //INFO: Aborted

        return baseXY;

      } else {

        /* SETTING */

        let endXY = {
          X: _.isBoolean ( modifiedXY.X ) ? ( modifiedXY.X ? translateX : baseXY.X ) : modifiedXY.X,
          Y: _.isBoolean ( modifiedXY.Y ) ? ( modifiedXY.Y ? translateY : baseXY.Y ) : modifiedXY.Y
        };

        this.$movable.translate ( endXY.X, endXY.Y );

        /* MOTION */

        this.motion = true;

        /* RETURNING */

        return endXY;

      }

    }

    /* CLASSES */

    _toggleClasses ( force ) {

      $html.toggleClass ( this.options.classes.dragging, force );
      this.$movable.toggleClass ( this.options.classes.dragging, force );

    }

    _addClasses () {

      this._toggleClasses ( true );

    }

    _removeClasses () {

      this._toggleClasses ( false );

    }

    /* HELPER */

    _getHelper () {

      return _.isFunction ( this.options.$helper )
               ? this.options.$helper ()
               : this.options.$helper instanceof $ && this.options.$helper.length
                 ? this.options.$helper
                 : false;

    }

    _initHelper () {

      this.$helper.appendTo ( $body );

    }

    _destroyHelper () {

      this.$helper.remove ();

    }

    /* AUTOSCROLL */

    _autoscroll ( pointXY ) {

      if ( !this.options.scroll.active ) return;

      if ( !this.scrollInited ) {

        this.$scrollParent = this.$movable.scrollParent ();
        this.scrollParent = this.$scrollParent[0];

        this.scrollParentIsDocument = ( this.scrollParent === document || this.scrollParent.tagName === 'HTML' );

        this.scrollInited = true;

      }

      //INFO: Logic taken from jQuery UI

  		if ( this.scrollParentIsDocument ) {

  			if ( this.options.axis !== 'x' ) {

          let scrollTop = $document.scrollTop ();

  				if ( pointXY.Y - scrollTop <= this.options.scroll.sensitivity ) {

          	$document.scrollTop ( scrollTop - this.options.scroll.speed );

          } else if ( $window.height () - ( pointXY.Y - scrollTop ) <= this.options.scroll.sensitivity ) {

          	$document.scrollTop ( scrollTop + this.options.scroll.speed );

          }

  			}

  			if ( this.options.axis !== 'y' ) {

          let scrollLeft = $document.scrollLeft ();

  				if ( pointXY.X - scrollLeft <= this.options.scroll.sensitivity ) {

          	$document.scrollLeft ( scrollLeft - this.options.scroll.speed );

          } else if ( $window.width () - ( pointXY.X - scrollLeft ) <= this.options.scroll.sensitivity ) {

          	$document.scrollLeft ( scrollLeft + this.options.scroll.speed );

          }

  			}

  		} else {

        let parentOffset = this.$scrollParent.offset ();

  			if ( this.options.axis !== 'x' ) {

  				if ( ( parentOffset.top + this.scrollParent.offsetHeight ) - pointXY.Y <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollTop += this.options.scroll.speed;

  				} else if ( pointXY.Y - parentOffset.top <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollTop -= this.options.scroll.speed;

  				}

  			}

  			if ( this.options.axis !== 'y' ) {

  				if ( ( parentOffset.left + this.scrollParent.offsetWidth ) - pointXY.X <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollLeft += this.options.scroll.speed;

  				} else if ( pointXY.X - parentOffset.left <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollLeft -= this.options.scroll.speed;

  				}

  			}

  		}

    }

    /* HANDLERS */

    __down ( event ) {

      if ( this.options.draggable () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.inited = false;
        this.motion = false;
        this.scrollInited = false;

        this.$helper = this._getHelper ();
        this.helper = this.$helper ? this.$helper[0] : false;

        this.$movable = ( this.$helper || this.$draggable );

        this.startEvent = event;
        this.startXY = $.eventXY ( event );

        if ( this.$helper ) {

          this._initHelper ();
          this.initialXY = this.$movable.translate ();
          this.initialXY = this._centerToPoint ( this.startXY );

        } else {

          this.initialXY = this.$movable.translate ();

        }

        this.isProxyed = ( this.options.proxy.$element && event.currentTarget === this.options.proxy.$element[0] );

        this.proxyXY = false;

        this._trigger ( 'start', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY } );

        this._on ( $document, Pointer.move, this.__move );
        this._one ( $document, Pointer.up, this.__up );
        this._one ( $document, Pointer.cancel, this.__cancel );

      }

    }

    __move ( event ) {

      let moveXY = $.eventXY ( event ),
          dragXY;

      if ( !this.inited && this.isProxyed ) {

        this._centerToPoint ( moveXY );

        this.proxyXY = this.$movable.translate ();

        dragXY = this.proxyXY;

      } else {

        let deltaXY = {
              X: moveXY.X - this.startXY.X,
              Y: moveXY.Y - this.startXY.Y
            };

        dragXY = this._actionMove ( deltaXY );

      }

      this._autoscroll ( moveXY );

      this._trigger ( 'move', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, moveEvent: event, moveXY: moveXY, dragXY: dragXY } );

    }

    __up ( event ) {

      let endXY = $.eventXY ( event ),
          dragXY = this.initialXY;

      if ( this.inited ) {

        this._removeClasses ();

      }

      if ( this.$helper ) {

        this._destroyHelper ();

      }

      if ( this.motion ) {

        if ( this.options.revert ) {

          this.$movable.translate ( this.initialXY.X, this.initialXY.Y );

        } else {

          dragXY = this.$movable.translate ();

        }

      } else if ( this.isProxyed ) {

        if ( this.options.proxy.noMotion && ( !event.button || event.button === Mouse.buttons.LEFT ) ) {

          dragXY = this._centerToPoint ( endXY, true );

        }

      }

      this._off ( $document, Pointer.move, this.__move );
      this._off ( $document, Pointer.cancel, this.__cancel );

      this._trigger ( 'end', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion } );

    }

    __cancel ( event ) {

      let endXY = $.eventXY ( event ),
          dragXY = this.$movable.translate ();

      if ( this.inited ) {

        this._removeClasses ();

      }

      if ( this.$helper ) {

        this._destroyHelper ();

      }

      if ( this.motion ) {

        if ( this.options.revert ) {

          this.$movable.translate ( this.initialXY.X, this.initialXY.Y );

          dragXY = this.initialXY;

        }

      }

      this._off ( $document, Pointer.move, this.__move );
      this._off ( $document, Pointer.up, this.__up );

      this._trigger ( 'end', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion } );

    }

  }

  /* FACTORY */

  Factory.init ( Draggable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Mouse ));
