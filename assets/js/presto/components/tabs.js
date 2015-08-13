
/* TABS */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* TABS */

    $.widget ( 'presto.tabs', {

        /* SPECIAL */

        _variables: function () {

            this.$tabs = this.$element;
            this.$tabs_buttons = this.$tabs.find ( '.tabs-buttons' );
            this.$buttons = this.$tabs.find ( '.button-wrp' ); //FIXME: Should only search on the children, or nested tabs will not work
            this.$containers = this.$tabs.find ( '.container' );
            this.$indicator = this.$tabs.find ( '.tabs-indicator' );

            var $current_button = this.$buttons.filter ( '.active' ).first ();

            $current_button = $current_button.length > 0 ? $current_button : this.$buttons.first ();

            this.prev_index = 0;
            this.current_index = this.$buttons.index ( $current_button );

        },

        _init: function () {

            this.select ( this.current_index, true );

        },

        _events: function () {

            this._on ( this.$buttons, 'click', function ( event, node ) {

                var new_index = this.$buttons.index ( $(node) );

                this.select ( new_index );

            });

            this._on ( $window, 'resize', this._positionate_indicator );

        },

        /* PRIVATE */

        _positionate_indicator: function () {

            var $active = this.$buttons.filter ( '.active' ),
                position = $active.position (),
                total_width = this.$tabs_buttons.width ();

            this._delay ( function () {

                this.$indicator.css ( 'left', position.left + ( this.$buttons.index ( $active ) === 0 ? 1 : 0 ) ); //FIXME: it's hacky

            }, this.current_index > this.prev_index ? 40 : 0 );

            this._delay ( function () {

                this.$indicator.css ( 'right', total_width - position.left - $active.width () + ( this.$buttons.index ( $active ) === this.$buttons.length - 1 ? 1 : 0 ) ); //FIXME: it's hacky

            }, this.current_index > this.prev_index ? 0 : 40 );

        },

        /* PUBLIC */

        select: function ( index, force ) {

            if ( this.current_index !== index || force ) {

                this.$buttons.removeClass ( 'active' ).eq ( index ).addClass ( 'active' );
                this.$containers.removeClass ( 'active' ).eq ( index ).addClass ( 'active' );

                if ( this.current_index !== index ) {

                    this.prev_index = this.current_index;
                    this.current_index = index;

                }

                this._positionate_indicator ();

            }

        }

    });

    /* READY */

    $(function () {

        $('.tabs').tabs ();

    });

}( jQuery, _, window, document ));
