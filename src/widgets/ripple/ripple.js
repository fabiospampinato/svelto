
/* =========================================================================
 * Svelto - Widgets - Ripple
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/browser/browser.js
 * @require core/mouse/mouse.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Mouse, Animations ) {

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
          show: 'show',
          hide: 'hide'
        },
        center: 'ripple-center'
      },
      animations: {
        show: Animations.xslow,
        hide: Animations.xslow,
        overlap: Animations.xslow / 100 * 58 // Used for triggering the hide animation while still opening, for a better visual effect
      },
      callbacks: {
        show: _.noop,
        hide: _.noop
      }
    }
  };

  /* RIPPLE */

  class Ripple extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$ripple = this.$element;

      this.circles = [];

    }

    _events () {

      this.___downTap ();

    }

    /* DOWN / TAP */

    ___downTap () {

      // Touch devices triggers a `Pointer.down` event, but maybe they will just scroll the page, more appropriate to bind on `Pointer.tap`

      this._on ( Browser.is.touchDevice ? Pointer.tap : Pointer.down, this.__downTap );

    }

    __downTap ( event ) {

      if ( this.$ripple.hasClass ( this.options.classes.center ) ) {

        let offset = this.$ripple.offset ();

        this._show ({
          x: offset.left + ( this.$ripple.outerWidth () / 2 ),
          y: offset.top + ( this.$ripple.outerHeight () / 2 )
        });

      } else {

        this._show ( $.eventXY ( event ) );

      }

      this._one ( true, this.$document, Pointer.up, this.__up );

    }

    /* UP */

    __up () {

      for ( let [$circle, timestamp] of this.circles ) {

        this._hide ( $circle, timestamp );

      }

      this.circles = [];

    }

    /* SHOW */

    _show ( XY ) {

      let $circle = $(this._tmpl ( 'circle' ));

      /* SIZE */

      let offset = this.$ripple.offset (),
          insetX = XY.x - offset.left,
          insetY = XY.y - offset.top,
          sideX = Math.max ( insetX, this.$ripple.outerWidth () - insetX ),
          sideY = Math.max ( insetY, this.$ripple.outerHeight () - insetY ),
          radius = Math.sqrt ( Math.pow ( sideX, 2 ) + Math.pow ( sideY, 2 ) ), // Basically the max the distances from the point to the corners
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

  Factory.init ( Ripple, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Mouse, Svelto.Animations ));
