
/* =========================================================================
 * Svelto - Form Ajax v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../spinner_overlay/spinnerOverlay.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: check if it works, also for upload

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FORM AJAX */

  $.fn.formAjax = function () {

    this.on ( 'submit', function ( event ) {

      var $form = $(this);

      event.preventDefault (); //FIXME: Does it work?

      $.ajax ({

        cache: false,
        contentType: 'multipart/form-data',
        data: new FormData ( this ),
        processData: false,
        type: $form.attr ( 'method' ) || 'POST',
        url: $form.attr ( 'action' ),

        beforeSend: function () {

          $form.loading ( true );

        },

        error: function ( res ) {

          if ( _.isString ( res ) ) {

            if ( res[0] === '<' ) { //INFO: Is HTML

              $.noty ( 'There was an error, please try again or report the problem' );

              $body.append ( res );

            } else {

              $.noty ( res );

            }

          } else {

            $.noty ( 'There was an error, please try again or report the problem' );

          }

        },

        success: function ( res ) {

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

              $.noty ( 'Done! A page refresh may be needed to see the changes' );

              $body.append ( res );

            } else {

              $.noty ( res );

            }

          } else {

            $.noty ( 'Done! A page refresh may be needed to see the changes' );

          }

        },

        complete: function () {

          $form.loading ( false );

        }

      });

    });

  };

  /* READY */

  $(function () {

    $('form.ajax').formAjax ();

  });

}( jQuery, _, window, document ));
