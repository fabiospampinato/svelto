
// @priority 500
// @require core/animations/animations.js
// @require core/widget/widget.js

(function ( $, _, Svelto, Factory, Pointer, Animations ) {

  /* CONFIG */

  let config = {
    name: 'ripple',
    plugin: true,
    selector: '.ripple',
    templates: {
      circle: _.template ( '<div class="ripple-circle"></div>' )
    },
    options: {
      classes: {
        center: 'ripple-center'
      },
      animations: {
        show: Animations.slow
      },
      callbacks: {
        show: _.noop,
        hide: _.noop
      }
    }
  };

  /* RIPPLE */

  class Ripple extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$ripple = this.$element;

    }

    _events () {

      this.___up ();

    }

    /* UP */

    ___up () {

      this._on ( `${Pointer.up}`, this.__up );

    }

    __up ( event ) {

      if ( this.$ripple.hasClass ( this.options.classes.center ) ) {

        let offset = this.$ripple.offset ();

        this._show ({
          x: offset.left + ( this.$ripple.outerWidth () / 2 ),
          y: offset.top + ( this.$ripple.outerHeight () / 2 )
        });

      } else {

        this._show ( $.eventXY ( event ) );

      }

    }

    /* SHOW */

    _show ( XY ) {

      let $circle = $(this._template ( 'circle' ));

      /* SIZE */

      let offset = this.$ripple.offset (),
          insetX = XY.x - offset.left,
          insetY = XY.y - offset.top,
          sideX = Math.max ( insetX, this.$ripple.outerWidth () - insetX ),
          sideY = Math.max ( insetY, this.$ripple.outerHeight () - insetY ),
          radius = Math.sqrt ( Math.pow ( sideX, 2 ) + Math.pow ( sideY, 2 ) ), // Basically the max the distances from the point to the corners
          diameter = radius * 2;

      /* SHOW */

      $circle.css ({
        width: diameter,
        height: diameter,
        top: insetY,
        left: insetX,
      }).prependTo ( this.$ripple );

      this._trigger ( 'show' );

      /* HIDE */

      $circle.one ( 'animationend', () => {

        $circle.remove ();

        this._trigger ( 'hide' );

      }, this.options.animations.show );

    }

  }

  /* FACTORY */

  Factory.make ( Ripple, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));
