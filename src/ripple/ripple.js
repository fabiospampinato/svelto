
/* =========================================================================
 * Svelto - Ripple
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'ripple',
    plugin: true,
    selector: '.ripple',
    templates: {
      circle: '<div class="ripple-circle"></div>'
    },
    options: {
      classes: {
        circle: {
          show: 'ripple-circle-show',
          hide: 'ripple-circle-hide'
        },
        centered: 'ripple-centered'
      },
      animations: {
        show: Svelto.animation.xslow,
        hide: Svelto.animation.xslow,
        overlap: Svelto.animation.xslow / 100 * 58
      },
      callbacks: {
        show () {},
        hide () {}
      }
    }
  };

  /* RIPPLE */

  class Ripple extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$ripple = this.$element;

      this.circles = [];

    }

    _events () {

      /* DOWN / TAP */

      this._on ( $.browser.is.touchDevice ? Pointer.tap : Pointer.down, this.__downTap );

    }

    /* DOWN / TAP */

    __downTap ( event ) {

      if ( event.button && event.button !== Svelto.mouseButton.LEFT ) return;

      if ( this.$ripple.hasClass ( this.options.classes.centered ) ) {

        let offset = this.$ripple.offset ();

        this._show ({
          X: offset.left + ( this.$ripple.outerWidth () / 2 ),
          Y: offset.top + ( this.$ripple.outerHeight () / 2 )
        });

      } else {

        this._show ( $.eventXY ( event ) );

      }

      this._one ( true, $document, Pointer.up, this.__up );

    }

    /* UP */

    __up () {

      for ( let [$circle, timestamp] of this.circles ) {

        this._hide ( $circle, timestamp );

      }

      this.circles = [];

    }

    /* SHOW */

    _show ( point ) {

      let $circle = $(this._tmpl ( 'circle' ));

      /* SIZE */

      let offset = this.$ripple.offset (),
          insetX = point.X - offset.left,
          insetY = point.Y - offset.top,
          sideX = Math.max ( insetX, this.$ripple.outerWidth () - insetX ),
          sideY = Math.max ( insetY, this.$ripple.outerHeight () - insetY ),
          radius = Math.sqrt ( Math.pow ( sideX, 2 ) + Math.pow ( sideY, 2 ) ), //INFO: Basically the max the distances from the point to the corners
          diameter = radius * 2;

      /* ADDING */

      this.circles.push ( [$circle, _.now ()] );

      /* SHOW */

      this._frame ( function () {

        /* PREPEND */

        $circle.css ({
          width: diameter,
          height: diameter,
          top: insetY,
          left: insetX,
        }).prependTo ( this.$ripple );

        /* SHOW */

        this._frame ( function () {

          $circle.addClass ( this.options.classes.circle.show );

          this._trigger ( 'show' );

        });

      });

    }

    /* HIDE */

    _hide ( $circle, timestamp ) {

      let remaining = Math.max ( 0, this.options.animations.show - this.options.animations.overlap + timestamp - _.now () );

      this._delay ( function () {

        $circle.addClass ( this.options.classes.circle.hide );

        this._delay ( function () {

          $circle.remove ();

          this._trigger ( 'hide' );

        }, this.options.animations.hide );

      }, remaining );

    }

  }

  /* FACTORY */

  $.factory ( Ripple, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
