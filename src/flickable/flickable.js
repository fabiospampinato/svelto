
/* =========================================================================
 * Svelto - Flickable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flickable',
    options: {
      duration: 150, //INFO: Maximum duration of the flick gesture
      threshold: 5, //INFO: Minimum moving treshold of the flick gesture
      callbacks: {
        flick () {}
      }
    }
  };

  /* FLICKABLE */

  class Flickable extends Svelto.Widget {

    /* SPECIAL */

    _events () {

      /* DOWN */

      this._on ( Pointer.down, this.__down );

    }

    /* HANDLERS */

    __down ( event ) {

      this._startXY = $.eventXY ( event );
      this._startTimestamp = event.timeStamp || Date.now ();

      this._motion = false;

      this._one ( true, $document, Pointer.move, this.__move );
      this._one ( true, $document, Pointer.up, this.__up );
      this._one ( true, $document, Pointer.cancel, this.__cancel );

    }

    __move () {

      this._motion = true;

    }

    __up ( event ) {

      this._endTimestamp = event.timeStamp || Date.now ();

      if ( this._motion && ( this._endTimestamp - this._startTimestamp <= this.options.duration ) ) {

        let endXY = $.eventXY ( event ),
            deltaXY = {
              X: endXY.X - this._startXY.X,
              Y: endXY.Y - this._startXY.Y
            },
            absDeltaXY = {
              X: Math.abs ( deltaXY.X ),
              Y: Math.abs ( deltaXY.Y )
            };

        if ( absDeltaXY.X >= this.options.threshold || absDeltaXY.Y >= this.options.threshold ) {

          let orientation,
              direction;

          if ( absDeltaXY.X > absDeltaXY.Y ) {

            orientation = 'horizontal';
            direction = ( deltaXY.X > 0 ) ? 'right' : 'left';

          } else {

            orientation = 'vertical';
            direction = ( deltaXY.Y > 0 ) ? 'bottom' : 'top';

          }

          this._trigger ( 'flick', {
            orientation: orientation,
            direction: direction,
            startEvent: this._startEvent,
            startXY: this._startXY,
            endEvent: event,
            endXY: endXY
          });

        }

      }

      if ( !this._motion ) {

        this._off ( $document, Pointer.move, this.__move );

      }

      this._off ( $document, Pointer.cancel, this.__cancel );

    }

    __cancel () {

      if ( !this._motion ) {

        this._off ( $document, Pointer.move, this.__move );

      }

      this._off ( $document, Pointer.up, this.__up );

    }

  }

  /* BINDING */

  Svelto.Flickable = Flickable;
  Svelto.Flickable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Flickable );

}( Svelto.$, Svelto._, window, document ));
