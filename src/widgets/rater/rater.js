
/* =========================================================================
 * Svelto - Widgets - Rater
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Crappy, not working ATM, maybe should get removed
//TODO: Support the use of the rater as an input, basically don't perform any ajax operation but instead update an input field

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'rater',
    plugin: true,
    selector: '.rater',
    templates: {
      base: '<div class="rater">' +
              '<% print ( self.stars ( o ) ) %>' +
            '</div>',
      stars: '<% for ( var i = 1; i <= o.amount; i++ ) { %>' +
               '<div class="rater-star <%= ( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) ) %>"></div>' +
             '<% } %>'
    },
    options: {
      value: 0,
      amount: 5,
      url: false,
      rated: false,
      datas: {
        value: 'value',
        amount: 'amount',
        url: 'url'
      },
      classes: {
        rated: 'rated'
      },
      selectors: {
        star: '.rater-star'
      },
      callbacks: {
        change: _.noop
      }
    },
  };

  /* RATER */

  class Rater extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$rater = this.$element;

      this.doingAjax = false;

    }

    _init () {

      this.options.value = Number ( this.$rater.data ( this.options.datas.value ) ) || this.options.value;
      this.options.amount = Number ( this.$rater.data ( this.options.datas.amount ) ) || this.options.amount;
      this.options.url = Number ( this.$rater.data ( this.options.datas.url ) ) || this.options.url;
      this.options.rated = this.$rater.hasClass ( this.options.classes.rated );

    }

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      if ( !this.options.rated ) {

        /* TAP */

        this._on ( Pointer.tap, this.options.selectors.star, this.__tap );

      }

    }

    __tap ( event ) {

      if ( !this.options.rated && !this.doingAjax && this.options.url ) {

        let rating = this.$stars.index ( event.currentTarget ) + 1;

        $.ajax ({

          data: { rating: rating },
          type: 'POST',
          url: this.options.url,

          beforeSend: () => {

            this.doingAjax = true;

          },

          error: ( res ) => {

            let message = $.ajaxResponseGet ( res, 'message' ) || this.options.messages.error;

            $.toast ( message );

          },

          success: ( res ) => {

            //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed
            //TODO: Make it work like formAjax's

            let resj = $.ajaxParseResponse ( res );

            if ( resj ) {

              _.merge ( this.options, resj );

              this.$rater.html ( this._template ( 'stars', this.options ) );

              this.options.rated = true;

              this._trigger ( 'change' );

            }

          },

          complete: () => {

            this.doingAjax = false;

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

  /* FACTORY */

  Factory.make ( Rater, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
