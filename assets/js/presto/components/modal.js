
/* MODAL */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* MODAL */

    $.widget ( 'presto.modal', {

        /* OPTIONS */

        options: {
            selectors: {
                closer: '.modal-closer'
            },
            callbacks: {
                open: _.noop,
                close: _.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$modal = this.$element;

        },

        _events: function () {

            this._on ( 'click', this.options.selectors.closer, this.close );

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

            this._off ( $document, 'keydown', this._handler_esc_keydown );

            this._trigger ( 'close' );

        }

    });

    /* READY */

    $(function () {

        $('.modal').modal ();

        $('[data-modal-trigger]').on ( 'click', function () { //TODO: maybe do something like this for the other triggable widgets... so that we don't care if a trigger changes or is added dynamically //TODO: use delegation

            $('#' + $(this).data ( 'modal-trigger' )).modal ( 'instance' ).open ();

        });

    });

}( jQuery, _, window, document ));
