
/* MODAL */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* MODAL */

    $.widget ( 'presto.modal', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$modal = this.$element;
            this.$closers = this.$modal.find ( '.modal-closer' );

        },

        _events: function () {

            this._on ( this.$closers, 'click', this.close );

        },

        /* PRIVATE */

        _handler_esc_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.ESCAPE ) {

                this.close ();

            }

        },

        /* PUBLIC */

        open: function () {

            this.$modal.addClass ( 'active' );

            this._on ( $document, 'keydown', this._handler_esc_keydown );

            this._trigger ( 'open' );

        },

        close: function () {

            this.$modal.removeClass ( 'active' );

            $document.off ( 'keydown', this._handler_esc_keydown );

            this._trigger ( 'close' );

        }

    });

    /* READY */

    $(function () {

        $('.modal').modal ();

        $('[data-modal-trigger]').on ( 'click', function () { //TODO: maybe so something like this for the other triggable widgets... so that we don't care if a trigger changes or is added dynamically

            $('#' + $(this).data ( 'modal-trigger' )).modal ( 'instance' ).open ();

        });

    });

}( lQuery, window, document ));
