
/* =========================================================================
 * Svelto - Form Ajax
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../spinner_overlay/spinnerOverlay.js
 * @requires ../noty/noty.js
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

      $.ajax ({

        cache: false,
        contentType: 'multipart/form-data',
        data: new FormData ( this.form ),
        processData: false,
        type: $form.attr ( 'method' ) || 'POST',
        url: $form.attr ( 'action' ),

        beforeSend: () => { //FIXME: Check it, expecially the `this` context

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'show' );

          }

          this._trigger ( 'beforesend' );

        },

        error ( res ) {

          if ( _.isString ( res ) ) {

            if ( res[0] === '<' ) { //INFO: Is HTML

              $.noty ( 'There was an error, please try again later' );

              $body.append ( res );

            } else {

              $.noty ( res );

            }

          } else {

            $.noty ( 'There was an error, please try again later' );

          }

        },

        success ( res ) {

          if ( _.isString ( res ) ) {

            if ( res === 'refresh' ) {

              $.noty ( 'Done! Refreshing the page...' );

              location.reload ();

            } else if ( /^((\S*)?:\/\/)?\/?\S*$/.test ( res ) ) { //INFO: Is an url, either absolute or relative

              if ( res === window.location.href || res === window.location.pathname ) {

                $.noty ( 'Done! Refreshing the page...' );

                location.reload ();

              } else {

                $.noty ( 'Done! Redirecting...' );

                location.assign ( res );

              }

            } else if ( res[0] === '<' ) { //INFO: Is HTML

              $.noty ( 'Done! A page refresh may be needed' );

              $body.append ( res );

            } else {

              $.noty ( res );

            }

          } else {

            $.noty ( 'Done! A page refresh may be needed' );

          }

        },

        complete: () => { //FIXME: Check it, expecially the `this` context

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

}( jQuery, _, window, document ));
