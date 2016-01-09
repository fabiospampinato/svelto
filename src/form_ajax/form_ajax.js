
/* =========================================================================
 * Svelto - Form Ajax
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../spinner_overlay/spinner_overlay.js
 * @requires ../noty/noty.js
 * @requires ../form_validate/form_validate.js
 * ========================================================================= */

//TODO: Add a way to abort it, maybe hovering the spinner a clickable X will be displayed and abort the request if tapped (or something more intuitive and easier to implement...)
//TODO: Test it with `input[type="file"]`

//FIXME: `formValidate` is listed as a requirement just because it need to be executed before `formAjax`

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formAjax',
    plugin: true,
    selector: 'form.ajax',
    options: {
      spinnerOverlay: true,
      timeout: 31000, //INFO: 1 second more than the default value of PHP's `max_execution_time` setting
      messages: {
        error: 'An error occurred, please try again later',
        done: 'Done! A page refresh may be needed',
        refresh: 'Done! Refreshing the page...',
        redirect: 'Done! Redirecting...'
      },
      callbacks: {
        beforesend () {},
        error () {},
        success () {},
        complete () {}
      }
    }
  };

  /* FORM AJAX */

  class FormAjax extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.form = this.element;
      this.$form = this.$element;

    }

    _events () {

      /* SUBMIT */

      this._on ( true, 'submit', this.__submit );

    }

    /* PRIVATE */

    __submit ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      $.ajax ({

        cache: false,
        contentType: false,
        data: new FormData ( this.form ),
        processData: false,
        timeout: this.options.timeout,
        type: this.$form.attr ( 'method' ) || 'POST',
        url: this.$form.attr ( 'action' ),

        beforeSend: () => {

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'open' );

          }

          this._trigger ( 'beforesend' );

        },

        error: ( res ) => {

          let resj = _.attempt ( JSON.parse, res );

          if ( !_.isError ( resj ) ) {

            $.noty ( resj.msg || this.options.messages.error );

          } else {

            $.noty ( this.options.messages.error );

          }

          this._trigger ( 'error' );

        },

        success: ( res ) => {

          let resj = _.attempt ( JSON.parse, res );

          if ( !_.isError ( resj ) ) {

            if ( resj.refresh || resj.url === window.location.href || _.trim ( resj.url, '/' ) === _.trim ( window.location.pathname, '/' ) ) {

              $.noty ( resj.msg || this.options.messages.refresh );

              location.reload ();

            } else if ( resj.url ) {

              //INFO: In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

              $.noty ( resj.msg || this.options.messages.redirect );

              location.assign ( resj.url );

            } else {

              $.noty ( resj.msg || this.options.messages.success );

            }

          } else {

            $.noty ( this.options.messages.success );

          }

          this._trigger ( 'success' );

        },

        complete: () => {

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'close' );

          }

          this._trigger ( 'complete' );

        }

      });

    }

  }

  /* FACTORY */

  $.factory ( FormAjax, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
