
/* CHECKBOX */

//TODO: add better support for disabled checkboxes

;(function ( $, window, document, undefined ) {

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

        _create: function () {

            this.$input = this.$element.find ( 'input' );

            if ( this.$input.prop ( 'checked' ) ) {

                this.$element.addClass ( 'checked' );

            } else if ( this.$element.hasClass ( 'checked' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

            this._bind_click ();

            this._bind_change ();

        },

        /* CLICK */

        _bind_click: function () {

            this._on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( event.target !== this.$input.get ( 0 ) ) this.toggle ();

        },

        /* CHANGE */

        _bind_change: function () {

            this._on ( true, 'change', this._handler_change );

        },

        _handler_change: function () {

            var checked = this.$input.prop ( 'checked' );

            this.$element.toggleClass ( 'checked', checked );

            this._trigger ( checked ? 'checked' : 'unchecked' );

        },

        /* PUBLIC */

        toggle: function () {

            this.$input.prop ( 'checked', !this.$input.prop ( 'checked' ) ).trigger ( 'change' );

        }

    });

    /* READY */

    $(function () {

        $('.checkbox').checkbox ();

    });

}( lQuery, window, document ));
