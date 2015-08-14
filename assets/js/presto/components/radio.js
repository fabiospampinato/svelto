
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

            this.$container = this.$radio.parent ( 'form' );

            if ( this.$container.length === 0 ) {

                this.$container = $document;

            }

            this.$other_inputs = this.$container.find ( 'input[name="' + this.name + '"]' );
            this.$other_radios = this.$other_inputs.parent ( '.radio' );

        },

        _init: function () {

            this.$radio.toggleClass ( 'checked', this.$input.prop ( 'checked' ) );

        },

        _events: function () {

            this._on ( 'click', this.select );

            this._on ( true, this.$input, 'change', this._update );

        },

        /* PRIVATE */

        _update: function () {

            var checked = this.$input.prop ( 'checked' );

            if ( checked ) { //INFO: We do the update when we reach the checked one

                this.$other_radios.removeClass ( 'checked' );

                this.$radio.addClass ( 'checked' );

            }

            this._trigger ( checked ? 'checked' : 'unchecked' );

        },

        /* PUBLIC */

        select: function () {

            if ( !this.$input.prop ( 'checked' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

        }

    });

    /* READY */

    $(function () {

        $('.radio').radio ();

    });

}( jQuery, _, window, document ));
