
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

            this.$closers = this.$element.find ( '.modal-closer' );

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

            this.$element.addClass ( 'show' );

            $.reflow ();

            this.$element.addClass ( 'active' );

            this._on ( $document, 'keydown', this._handler_esc_keydown );

            this._trigger ( 'open' );

        },

        close: function () {

            this.$element.removeClass ( 'active' );

            $.reflow ();

            this._delay ( function () {

                this.$element.removeClass ( 'show' );

            }, 200 );

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
