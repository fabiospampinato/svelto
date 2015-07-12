
/* RADIO */

//TODO: add better support for disabled checkboxes
//TODO: api for selecting and unselecting (with events)

;(function ( $, window, document, undefined ) {

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

            this.$input = this.$element.find ( 'input' );
            this.name = this.$input.attr ( 'name' );
            this.$form = this.$element.parent ( 'form' );
            this.$other_inputs = this.$form.find ( 'input[name="' + this.name + '"]' );
            this.$other_radios = this.$other_inputs.parent ();

        },

        _init: function () {

            this.$element.toggleClass ( 'checked', this.$input.prop ( 'checked' ) );

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

                this.$element.addClass ( 'checked' );

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

}( lQuery, window, document ));
