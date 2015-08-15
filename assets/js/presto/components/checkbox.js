
/* CHECKBOX */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* CHECKBOX */

    $.widget ( 'presto.checkbox', {

        /* OPTIONS */

        options: {
            callbacks: {
                checked: $.noop,
                unchecked: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$checkbox = this.$element;
            this.$input = this.$checkbox.find ( 'input' );

        },

        _init: function () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

            var hasClass = this.$checkbox.hasClass ( 'checked' );

            if ( this.get () ) {

                if ( !hasClass ) {

                    this.$checkbox.addClass ( 'checked' );

                }

            } else if ( hasClass ) {

                this.$checkbox.removeClass ( 'checked' );

            }

        },

        _events: function () {

            this._on ( 'click', function () {

                this.toggle ();

            });

            this._on ( true, 'change', this._handler_change );

        },

        /* CHANGE */

        _handler_change: function () {

            var isChecked = this.get ();

            this.$checkbox.toggleClass ( 'checked', isChecked );

            this._trigger ( isChecked ? 'checked' : 'unchecked' );

        },

        /* PUBLIC */

        get: function () {

            return this.$input.prop ( 'checked' );

        },

        toggle: function ( force ) {

            var isChecked = this.get ();

            if ( _.isUndefined ( force ) ) {

                force = !isChecked;

            }

            if ( force !== isChecked ) {

                this.$input.prop ( 'checked', force ).trigger ( 'change' );

            }

        },

        check: function () {

            this.toggle ( true );

        },

        uncheck: function () {

            this.toggle ( false );

        }

    });

    /* READY */

    $(function () {

        $('.checkbox').checkbox ();

    });

}( jQuery, _, window, document ));
