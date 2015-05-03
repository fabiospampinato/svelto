
/* RADIOS */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.factory ( 'presto.radio', {

        /* SPECIAL */

        _ready: function () {

            $('.radio').radio ();

        },

        _create: function () {

            this.$input = this.$element.find ( 'input' ),
            this.name = this.$input.attr ( 'name' ),
            this.$form = this.$element.parent ( 'form' ),
            this.$radios = this.$form.find ( 'input[name="' + this.name + '"]' ),
            this.$btns = this.$radios.parent ( '.radio' );

            if ( this.$input.checked () ) {

                this.$element.addClass ( 'selected' );

            } else if ( this.$element.hasClass ( 'selected' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

            this.$element.on ( 'click', this.select );

            this.$input.on ( 'change', this._update );

        },

        /* PRIVATE */

        _update: function () {

            var active = this.$input.prop ( 'checked' );

            if ( active ) {

                this.$btns.removeClass ( 'selected' );

                this.$element.addClass ( 'selected' );

            }

        },

        /* PUBLIC */

        select: function () {

            if ( this.$element.hasClass ( 'inactive' ) ) return;

            this.$input.prop ( 'checked', true ).trigger ( 'change' );

        }

    });

}( lQuery, window, document ));
