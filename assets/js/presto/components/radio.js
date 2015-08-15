
/* RADIO */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* RADIO */

    $.widget ( 'presto.radio', {

        /* OPTIONS */

        options: {
            callbacks: {
                checked: $.noop,
                unchecked: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$radio = this.$element;
            this.$input = this.$radio.find ( 'input' );

            this.name = this.$input.attr ( 'name' );

            this.$container = this.$radio.parents ( 'form' ).first ();

            if ( this.$container.length === 0 ) {

                this.$container = $document;

            }

            this.$other_radios = this.$container.find ( 'input[name="' + this.name + '"]' ).parent ( '.radio' ).not ( this.$radio );

        },

        _init: function () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

            var hasClass = this.$radio.hasClass ( 'checked' );

            if ( this.get () ) {

                if ( !hasClass ) {

                    this.$radio.addClass ( 'checked' );

                }

            } else if ( hasClass ) {

                this.$radio.removeClass ( 'checked' );

            }

        },

        _events: function () {

            this._on ( 'click', function () {

                this.check ();

            });

            this._on ( true, 'change', this._handler_change );

        },

        /* CHANGE */

        _handler_change: function () {

            var isChecked = this.get ();

            if ( isChecked ) {

                this.$other_radios.removeClass ( 'checked' );

            }

            this.$radio.toggleClass ( 'checked', isChecked );

            this._trigger ( isChecked ? 'checked' : 'unchecked' );

        },

        /* PUBLIC */

        get: function () {

            return this.$input.prop ( 'checked' );

        },

        check: function () {

            if ( !this.get () ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

        }

    });

    /* READY */

    $(function () {

        $('.radio').radio ();

    });

}( jQuery, _, window, document ));
