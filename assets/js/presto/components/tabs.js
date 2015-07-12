
/* TABS */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TABS */

    $.widget ( 'presto.tabs', {

        /* SPECIAL */

        _variables: function () {

            this.$buttons_bar = this.$element.find ( '.tabs-buttons' );
            this.$buttons = this.$element.find ( '.tabs-button' ); //FIXME: Should only search on the children, or nested tabs will not work
            this.$contents = this.$element.find ( '.tabs-content' );
            this.$indicator = this.$element.find ( '.tabs-indicator' );

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
                total_width = this.$buttons_bar.width ();

            this._delay ( function () {

                this.$indicator.css ( 'left', position.left + 1 );

            }, this.current_index > this.prev_index ? 50 : 0 );

            this._delay ( function () {

                this.$indicator.css ( 'right', total_width - position.left - $active.width () + 1 );

            }, this.current_index > this.prev_index ? 0 : 50 );

        },

        /* PUBLIC */

        select: function ( index, force ) {

            if ( this.current_index !== index || force ) {

                this.$buttons.removeClass ( 'active' ).eq ( index ).addClass ( 'active' );
                this.$contents.removeClass ( 'active' ).eq ( index ).addClass ( 'active' );

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

        $('.tabs_wrp').tabs ();

    });

}( lQuery, window, document ));
