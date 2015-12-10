
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

      this.$form = this.$element;
      this.form = this.element;

    }

    _events () {

      /* SUBMIT */

      this._on ( true, 'submit', this.__submit );

    }

    /* PRIVATE */

    __submit ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      if ( !this.$form.formValidate ( 'isValid' ) ) {

        return $.noty ( 'The form has some errors, fix them before submitting it' );

      }

      $.ajax ({

        cache: false,
        contentType: false,
        data: new FormData ( this.form ),
        processData: false, //FIXME: Does it work?
        type: this.$form.attr ( 'method' ) || 'POST',
        url: this.$form.attr ( 'action' ),

        beforeSend: () => {

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'show' );

          }

          this._trigger ( 'beforesend' );

        },

        error ( res ) {

          res = _.attempt ( JSON.parse, res );

          $.noty ( _.isError ( res ) || !( 'msg' in res ) ? 'An error occurred, please try again later' : res.msg );

          this._trigger ( 'error' );

        },

        success ( res ) {

          res = _.attempt ( JSON.parse, res );

          if ( _.isError ( res ) ) {

            $.noty ( 'Done! A page refresh may be needed' );

          } else {

            if ( 'msg' in res ) {

              $.noty ( res.msg );

            } else if ( res.refresh || res.url === window.location.href || res.url === window.location.pathname ) {

              $.noty ( 'Done! Refreshing the page...' );

              location.reload ();

            } else if ( res.url ) {

              $.noty ( 'Done! Redirecting...' );

              location.assign ( res.url );

            } else {

              $.noty ( 'Done! A page refresh may be needed' );

            }

          }

          this._trigger ( 'success' );

        },

        complete: () => {

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'hide' );

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
