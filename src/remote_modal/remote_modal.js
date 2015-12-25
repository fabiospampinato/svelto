
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

  /* UTILITIES */

  let destroyModal = function ( $modal ) {

    $modal.modal ( 'close' );

    setTimeout ( function () {

      $modal.remove ();

    }, Svelto.Modal.config.options.animations.close );

  };

  /* REMOTE MODAL */

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

    let $tempModal = $('<div class="modal remote-modal-placeholder card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg></div></div>');

    /* VARIABLES */

    let isAborted = false;

    /* AJAX */

    $.ajax ({

      cache: false,
      data: _.omit ( data, 'url' ),
      timeout: 31000, //INFO: 1 second more than the default value of PHP's `max_execution_time` setting
      type: _.size ( data ) > 1 ? 'POST' : 'GET',
      url: data.url,

      beforeSend () {

        $tempModal.appendTo ( $body )
                  .modal ({
                    callbacks: {
                      close () {
                        isAborted = true;
                        destroyModal ( $tempModal );
                      }
                    }
                  })
                  .modal ( 'open' );

      },

      error ( res ) {

        if ( isAborted ) return;

        let resj = _.attempt ( JSON.parse, res );

        $.noty ( _.isError ( resj ) || !( 'msg' in resj ) ? 'An error occurred, please try again later' : resj.msg );

        destroyModal ( $tempModal );

      },

      success ( res ) {

        if ( isAborted ) return;

        let resj = _.attempt ( JSON.parse, res );

        if ( _.isError ( resj ) || !( 'modal' in resj ) ) {

          this.error ( res );

        } else {

          let prevRect = $tempModal.getRect (),
              $remoteModal = $(resj.modal),
              attributes = Array.from ( $remoteModal.prop ( 'attributes' ) );

          for ( let attribute of attributes ) {

            if ( attribute.name !== 'class' ) {

              $tempModal.attr ( attribute.name, attribute.value );

            }

          }

          $tempModal.addClass ( $remoteModal.attr ( 'class' ) );

          $.frame ( function () {

            $tempModal.addClass ( 'loaded' );

            $tempModal.html ( $remoteModal.html () );

            let newRect = $tempModal.getRect ();

            $tempModal.css ({
              width: prevRect.width,
              height: prevRect.height
            });

            $.frame ( function () {

              $tempModal.addClass ( 'animating' );

              $tempModal.animate ({
                width: newRect.width,
                height: newRect.height
              }, Svelto.animation.normal, function () {

                $tempModal.css ({
                  width: '',
                  height: ''
                }).removeClass ( 'remote-modal-placeholder loaded animating' );

              });

              $tempModal.widgetize ();

            });

          });

        }

      }

    });

  };

}( Svelto.$, Svelto._, window, document ));
