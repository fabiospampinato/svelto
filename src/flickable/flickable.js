
/* =========================================================================
 * Svelto - Flickable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flickable',
    plugin: true,
    selector: '.flickable',
    options: {
      duration: 150, //INFO: Maximum duration of the flick gesture
      threshold: 5, //INFO: Minimum moving treshold of the flick gesture
      callbacks: {
        flick: _.noop
      }
    }
  };

  /* FLICKABLE */

  class Flickable extends Widgets.Widget {

    /* SPECIAL */

    _events () {

      this.___down ();

    }

    /* DOWN */

    ___down () {

      this._on ( Pointer.down, this.__down );

    }

    __down ( event ) {

      this._startXY = $.eventXY ( event );
      this._startTimestamp = event.timeStamp || Date.now ();

      this._motion = false;

      this.___move ();
      this.___up ();
      this.___cancel ();

    }

    /* MOVE */

    ___move () {

      this._one ( true, $document, Pointer.move, this.__move );

    }

    __move () {

      this._motion = true;

    }

    /* UP */

    ___up () {

      this._one ( true, $document, Pointer.up, this.__up );

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

    /* CANCEL */

    ___cancel () {

      this._one ( true, $document, Pointer.cancel, this.__cancel );

    }

    __cancel () {

      if ( !this._motion ) {

        this._off ( $document, Pointer.move, this.__move );

      }

      this._off ( $document, Pointer.up, this.__up );

    }

  }

  /* FACTORY */

  Factory.init ( Flickable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
