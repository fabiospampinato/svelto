
/* CHECKBOXES */

;(function ( $, window, document, undefined ) {

    $.factory ( 'checkbox', {

        /* SPECIAL */

        init: function () {

            this.$input = this.$node.find ( 'input' );

            if ( this.$input.prop ( 'checked' ) ) {

                this.$node.addClass ( 'selected' );

            } else if ( this.$node.hasClass ( 'selected' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

            this._bind_click ();

            this._bind_change ();

        },

        ready: function () {

            $('.checkbox').checkbox ();

        },

        /* CLICK */

        _bind_click: function () {

            this.$node.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( event.target !== this.$input.get ( 0 ) ) this.toggle ();

        },

        /* CHANGE */

        _bind_change: function () {

            this.$node.on ( 'change', this.update () );

        },

        /* PUBLIC */

        update: function () {

            var active = this.$input.prop ( 'checked' );

            this.$node.toggleClass ( 'selected', active );

        },

        toggle: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            var active = this.$input.prop ( 'checked' );

            this.$input.prop ( 'checked', !active ).trigger ( 'change' );

        }

    });

}( lQuery, window, document ));
