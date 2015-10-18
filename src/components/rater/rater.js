
/* =========================================================================
 * Svelto - Rater
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Support the use of the rater as an input, basically don't perform any ajax operation but instead update an input field

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SELECT */

  $.factory ( 'svelto.rater', {

    /* TEMPLATES */

    templates: {
      base: '<div class="rater">' +
              '{% include ( "svelto.rater.stars", o ); %}' +
            '</div>',
      stars: '{% for ( var i = 1; i <= o.amount; i++ ) { %}' +
               '<div class="rater-star {%=( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) )%}"></div>' +
             '{% } %}'
    },

    /* OPTIONS */

    options: {
      value: 0,
      amount: 5,
      url: false,
      selectors: {
        star: '.rater-star'
      },
      callbacks: {
        change: _.noop
      }
    },

    /* SPECIAL */

    _widgetize: function ( $root ) {

      $root.find ( '.rater' ).each ( function () {

        var $rater = $(this);

        $rater.rater ({
          value: Number($rater.data ( 'value' ) || 0),
          amount: Number($rater.data ( 'amount' ) || 5),
          url: Number($rater.data ( 'url' ) || false)
        });

      });

    },

    _variables: function () {

      this.$rater = this.$element;

      this.alreadyRated = false;
      this.doingAjax = false;

    },

    _events: function () {

      /* TAP */

      this._on ( Pointer.tap, this.options.selectors.star, this.__tap );

    },

    /* TAP */

    __tap: function ( event, star ) {

      if ( !this.alreadyRated && !this.doingAjax && this.options.url ) {

        var rating = this.$stars.index ( star ) + 1,
            self = this;

        $.ajax ({

          data: { rating: rating },
          type: 'POST',
          url: this.options.url,

          beforeSend: function () {

            self.doingAjax = true;

          },

          success: function ( res ) {

            //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed

            res = JSON.parse ( res );

            _.merge ( this.options, res );

            self.$rater.html ( self._tmpl ( 'stars', self.options ) );

            self.alreadyRated = true;

            self._trigger ( 'change', {
              value: self.options.value,
              amount: self.options.amount
            });

          },

          error: function ( res ) {

            throw 'RatingError';

          },

          complete: function () {

            self.doingAjax = false;

          }

        });

      }

    },

    /* API */

    get: function () {

      return {
        value: this.options.value,
        amount: this.options.amount
      };

    }

  });

}( jQuery, _, window, document ));
