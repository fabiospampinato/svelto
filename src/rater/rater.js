
/* =========================================================================
 * Svelto - Rater
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Support the use of the rater as an input, basically don't perform any ajax operation but instead update an input field

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'rater',
    templates: {
      base: '<div class="rater">' +
              '{% include ( "rater.stars", o ); %}' +
            '</div>',
      stars: '{% for ( var i = 1; i <= o.amount; i++ ) { %}' +
               '<div class="rater-star {%=( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) )%}"></div>' +
             '{% } %}'
    },
    options: {
      value: 0,
      amount: 5,
      url: false,
      selectors: {
        star: '.rater-star'
      },
      callbacks: {
        change () {}
      }
    },
  };

  /* SELECT */

  class Rater extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.rater' ).each ( function () {

        var $rater = $(this);

        $rater.rater ({
          value: Number($rater.data ( 'value' ) || 0),
          amount: Number($rater.data ( 'amount' ) || 5),
          url: Number($rater.data ( 'url' ) || false)
        });

      });

      //TODO: Add support for rater

    }

    _variables () {

      this.$rater = this.$element;

      this.alreadyRated = false;
      this.doingAjax = false;

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.options.selectors.star, this.__tap );

    }

    /* TAP */

    __tap ( event ) {

      if ( !this.alreadyRated && !this.doingAjax && this.options.url ) {

        var rating = this.$stars.index ( event.currentTarget ) + 1;

        $.ajax ({

          data: { rating: rating },
          type: 'POST',
          url: this.options.url,

          beforeSend () {

            self.doingAjax = true;

          },

          success: ( res ) => {

            //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed

            res = JSON.parse ( res );

            _.merge ( this.options, res );

            this.$rater.html ( this._tmpl ( 'stars', this.options ) );

            this.alreadyRated = true;

            this._trigger ( 'change', {
              value: this.options.value,
              amount: this.options.amount
            });s

          },

          error ( res ) {

            $.noty ( 'An error occurred, please try again later' );

          },

          complete () {

            self.doingAjax = false;

          }

        });

      }

    }

    /* API */

    get () {

      return {
        value: this.options.value,
        amount: this.options.amount
      };

    }

  }

  /* BINDING */

  Svelto.Rater = Rater;
  Svelto.Rater.config = config;

  /* FACTORY */

  $.factory ( Svelto.Rater );

}( jQuery, _, window, document ));
