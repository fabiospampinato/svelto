
/* RADIOS */

;(function ( $, window, document, undefined ) {

    $.factory ( 'radio', {

        /* UTILITIES */

        /* SPECIAL */

        init: function () {

            this.$input = this.$node.find ( 'input' ),
            this.name = this.$input.attr ( 'name' ),
            this.$form = this.$node.parent ( 'form' ),
            this.$radios = this.$form.find ( 'input[name="' + this.name + '"]' ),
            this.$btns = this.$radios.parent ( '.radio' );

            if ( this.$input.checked () ) {

                this.$node.addClass ( 'selected' );

            } else if ( this.$node.hasClass ( 'selected' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

            this.$node.on ( 'click', this.select );

            this.$input.on ( 'change', this._update );

        },

        ready: function () {

            $('.radio').radio ();

        },

        /* PRIVATE */

        _update: function () {

            var active = this.$input.prop ( 'checked' );

            if ( active ) {

                this.$btns.removeClass ( 'selected' );

                this.$node.addClass ( 'selected' );

            }

        },

        /* PUBLIC */

        select: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.$input.prop ( 'checked', true ).trigger ( 'change' );

        }

    });

}( lQuery, window, document ));
