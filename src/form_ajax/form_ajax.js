
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

//FIXME: `formValidate` is listed as a requirement just because it need to be executed before `formAjax`

//TODO: Check if it works, also for file uploading

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formAjax',
    selector: 'form.ajax',
    options: {
      spinnerOverlay: true,
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
        processData: false, //FIXME: Does it work?
        type: this.$form.attr ( 'method' ) || 'POST',
        url: this.$form.attr ( 'action' ),

        beforeSend: () => {

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'open' );

          }

          this._trigger ( 'beforesend' );

        },

        error: ( res ) => {

          res = _.attempt ( JSON.parse, res );

          $.noty ( _.isError ( res ) || !( 'msg' in res ) ? 'An error occurred, please try again later' : res.msg );

          this._trigger ( 'error' );

        },

        success: ( res ) => {

          res = _.attempt ( JSON.parse, res );

          let msg = 'Done! A page refresh may be needed';

          if ( !_.isError ( res ) ) {

            if ( res.refresh || res.url === window.location.href || _.trim ( res.url, '/' ) === _.trim ( window.location.pathname, '/' ) ) {

              msg = 'Done! Refreshing the page...';

              location.reload ();

            } else if ( res.url ) {

              //INFO: In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

              msg = 'Done! Redirecting...';

              location.assign ( res.url );

            }

            if ( 'msg' in res ) {

              msg = res.msg;

            }

          }

          $.noty ( msg );

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

  /* BINDING */

  Svelto.FormAjax = FormAjax;
  Svelto.FormAjax.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormAjax );

}( Svelto.$, Svelto._, window, document ));
