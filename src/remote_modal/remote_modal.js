
/* =========================================================================
 * Svelto - Remote Modal
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../modal/modal.js
 * @requires ../noty/noty.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* REMOTE MODAL */

  //TODO: Abort the request if the tempModal is closed before we get a result
  //TODO: Animate the dimensions of the temp modal transitioning to the new modal
  //TODO: Make it work with JSON responses instead of plain html

  $.remoteModal = function ( url, data ) {

    /* DATA */

    if ( !data ) {

      if ( _.isPlainObject ( url ) ) {

        data = url;

      } else {

        data = { url: url };

      }

    } else {

      data.url = url;

    }

    /* TEMPORARY MODAL */

    /*
      <div class="modal remote-modal-placeholder card">
        <div class="card-block">
          <svg class="spinner">
            <circle cx="1.625em" cy="1.625em" r="1.25em" />
          </svg>
        </div>
      </div>
    */

    let $tempModal = $('<div class="modal remote-modal-placeholder card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em" /></svg></div></div>').appendTo ( $body ).modal ();

    /* AJAX */

    $.ajax ({

      cache: false,
      data: data,
      processData: false,
      type: 'GET',
      url: data.url,

      beforeSend () { //FIXME: Check it, expecially the `this` context

        $tempModal.modal ( 'open' );

      },

      error ( res ) {

        $tempModal.modal ( 'close' );

        setTimeout ( function () {

          $tempModal.remove ();

        }, Svelto.Modal.config.options.animations.close );

        $.noty ( 'An error occurred, please try again later' );

      },

      success ( res ) {

        res = JSON.parse ( res );

        let $remoteModal = $(res.modal);

        $remoteModal.modal ({
          callbacks: {
            close: function () {
              setTimeout ( function () {
                $tempModal.remove ();
              }, Svelto.Modal.config.options.animations.close );
            }
          }
        });

        $remoteModal.modal ( 'open' );

        $tempModal.replaceWidth ( $remoteModal );

      }

    });

  };

}( Svelto.$, Svelto._, window, document ));
