
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

//TODO: Check if it works, also for upload

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formAjax',
    options: {
      spinnerOverlay: true,
      callbacks: {
        beforesend () {},
        complete () {}
      }
    }
  };

  /* FORM AJAX */

  class FormAjax extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( 'form.ajax' ).formAjax ();
      $root.filter ( 'form.ajax' ).formAjax ();

    }

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

      if ( this.$form.formValidate ( 'isValid' ) ) {

        $.ajax ({

          cache: false,
          contentType: false,
          data: new FormData ( this.form ),
          dataType: 'JSON',
          processData: false,
          type: this.$form.attr ( 'method' ) || 'POST',
          url: this.$form.attr ( 'action' ),

          beforeSend: () => {

            if ( this.options.spinnerOverlay ) {

              this.$form.spinnerOverlay ( 'show' );

            }

            this._trigger ( 'beforesend' );

          },

          error ( res ) {

            $.noty ( 'An error occurred, please try again later' );

          },

          success ( res ) {

            if ( res.refresh || res.url === window.location.href || res.url === window.location.pathname ) {

              $.noty ( 'Done! Refreshing the page...' );

              location.reload ();

            } else if ( res.url ) {

              $.noty ( 'Done! Redirecting...' );

              location.assign ( res.url );

            } else {

              $.noty ( res.msg || 'Done! A page refresh may be needed' );

            }

          },

          complete: () => {

            if ( this.options.spinnerOverlay ) {

              this.$form.spinnerOverlay ( 'hide' );

            }

            this._trigger ( 'complete' );

          }

        });

      } else {

        $.noty ( 'The form has some errors, fix them before sending it' );

      }

    }

  }

  /* BINDING */

  Svelto.FormAjax = FormAjax;
  Svelto.FormAjax.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormAjax );

}( Svelto.$, Svelto._, window, document ));
