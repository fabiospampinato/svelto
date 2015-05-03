
/* MODAL */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.factory ( 'presto.modal', {

        /* SPECIAL */

        _ready: function () {

            $('.modal_trigger').modal ();

        },

        _create: function () {

            this.modal_id = this.$element.data ( 'modal' );
            this.$modal = $('#' + this.modal_id);
            this.$closing = this.$modal.find ( '.closing' );

            this.$element.on ( 'click', this.open );
            this.$closing.on ( 'click', this.close );

        },

        /* PRIVATE */

        _handler_esc_keydown: function ( event ) {

            if ( event.keyCode === 27 ) { // esc

                this.close ();

            }

        },

        /* PUBLIC */

        open: function () {

            this.$modal.addClass ( 'show' );

            this.$modal.defer ( function () {

                this.addClass ( 'active' );

            });

            $document.on ( 'keydown', this._handler_esc_keydown );

        },

        close: function () {

            this.$modal.removeClass ( 'active' );

            this.$modal.defer ( function () {

                this.removeClass ( 'show' );

            }, 200 );

            $document.off ( 'keydown', this._handler_esc_keydown );

        }

    });

}( lQuery, window, document ));
