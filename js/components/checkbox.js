
/* CHECKBOXES */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.factory ( 'presto.checkbox', {

        /* SPECIAL */

        _ready: function () {

            $('.checkbox').checkbox ();

        },

        _create: function () {

            this.$input = this.$element.find ( 'input' );

            if ( this.$input.prop ( 'checked' ) ) {

                this.$element.addClass ( 'selected' );

            } else if ( this.$element.hasClass ( 'selected' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

            this._bind_click ();

            this._bind_change ();

        },

        /* CLICK */

        _bind_click: function () {

            this.$element.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( event.target !== this.$input.get ( 0 ) ) this.toggle ();

        },

        /* CHANGE */

        _bind_change: function () {

            this.$element.on ( 'change', this.update () );

        },

        /* PUBLIC */

        update: function () {

            var active = this.$input.prop ( 'checked' );

            this.$element.toggleClass ( 'selected', active );

        },

        toggle: function () {

            if ( this.$element.hasClass ( 'inactive' ) ) return;

            var active = this.$input.prop ( 'checked' );

            this.$input.prop ( 'checked', !active ).trigger ( 'change' );

        }

    });

}( lQuery, window, document ));
