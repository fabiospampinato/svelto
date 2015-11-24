
/* =========================================================================
 * Svelto - Ripple
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'ripple',
    templates: {
      circle: '<div class="ripple-circle"></div>'
    },
    options: {
      classes: {
        circle: {
          show: 'ripple-circle-show',
          hide: 'ripple-circle-hide'
        }
      },
      animations: {
        show: 350,
        hide: 400
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

    _widgetize ( $root ) {

      $root.find ( '.ripple' ).ripple ();
      $root.filter ( '.ripple' ).ripple ();

    }

    _variables () {

      this.$ripple = this.$element;

      this.circles = [];

    }

    _events () {

      /* DOWN */

      this._on ( Pointer.down, this.__down );

      /* UP / CANCEL */

      this._on ( Pointer.up + ' ' + Pointer.cancel, this.__upCancel );

    }

    /* DOWN */

    __down ( event ) {

      if ( event.button && event.button !== Svelto.mouseButton.LEFT ) return;

      this._show ( event );

    }

    /* UP CANCEL */

    __upCancel ( event ) {

      for ( let [$circle, before] of this.circles ) {

        this._hide ( $circle, before );

      }

      this.circles = [];

    }

    /* SHOW */

    _show ( event ) {

      let $circle = $(this._tmpl ( 'circle' )).prependTo ( this.$ripple ),
          offset = this.$ripple.offset (),
          eventXY = $.eventXY ( event ),
          now = _.now ();

      $circle.css ({
        top: eventXY.Y - offset.top,
        left: eventXY.X - offset.left
      }).addClass ( this.options.classes.circle.show );

      this.circles.push ( [$circle, now] );

      this._trigger ( 'show' );

    }

    /* HIDE */

    _hide ( $circle, before ) {

      let delay = Math.max ( 0, this.options.animations.show + before - _.now () );

      this._delay ( function () {

        $circle.addClass ( this.options.classes.circle.hide );

        this._delay ( function () {

          $circle.remove ();

          this._trigger ( 'hide' );

        }, this.options.animations.hide );

      }, delay );

    }

  }

  /* BINDING */

  Svelto.Ripple = Ripple;
  Svelto.Ripple.config = config;

  /* FACTORY */

  $.factory ( Svelto.Ripple );

}( Svelto.$, Svelto._, window, document ));
