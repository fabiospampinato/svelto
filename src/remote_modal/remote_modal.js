
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

  //TODO: Animate the dimensions of the temp modal transitioning to the new modal

  $.remoteModal = function ( url, data ) {

    /* DATA */

    if ( !data ) {

      data = _.isPlainObject ( url ) ? url : { url: url };

    } else {

      data.url = url;

    }

    /* TEMPORARY MODAL */

    /*
      <div class="modal remote-modal-placeholder card">
        <div class="card-block">
          <svg class="spinner">
            <circle cx="1.625em" cy="1.625em" r="1.25em">
          </svg>
        </div>
      </div>
    */

    let $tempModal = $('<div class="modal remote-modal-placeholder card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg></div></div>').appendTo ( $body );

    /* VARIABLES */

    let isAborted = false;

    /* AJAX */

    $.ajax ({

      cache: false,
      data: _.omit ( data, 'url' ),
      type: _.size ( data ) > 1 ? 'POST' : 'GET',
      url: data.url,

      beforeSend () {

        $tempModal.modal ({
          callbacks: {
            close () {
              isAborted = true;
            }
          }
        }).modal ( 'open' );

      },

      error ( res ) {

        if ( isAborted ) return;

        res = _.attempt ( JSON.parse, res );

        $.noty ( _.isError ( res ) || !( 'msg' in res ) ? 'An error occurred, please try again later' : res.msg );

        $tempModal.modal ( 'remove' );

      },

      success ( res ) {

        if ( isAborted ) return;

        res = _.attempt ( JSON.parse, res );

        if ( _.isError ( res ) || !( 'modal' in res ) ) {

          $.noty ( 'An error occurred, please try again later' );

          $tempModal.modal ( 'remove' );

        } else {

          let $remoteModal = $(res.modal);

          $remoteModal.modal ({
            callbacks: {
              close: function () {
                setTimeout ( function () {
                  $remoteModal.remove ();
                }, Svelto.Modal.config.options.animations.close );
              }
            }
          });

          $remoteModal.addClass ( Svelto.Modal.config.options.classes.show ).addClass ( Svelto.Modal.config.options.classes.open ).modal ( 'open' ); //FIXME: This is hacky

          $tempModal.replaceWith ( $remoteModal );

        }

      }

    });

  };

}( Svelto.$, Svelto._, window, document ));
