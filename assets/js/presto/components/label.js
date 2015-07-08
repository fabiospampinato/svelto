
/* LABEL */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* LABEL */

    $.widget ( 'presto.badge', {

        /* OPTIONS */

        options: {
            title: false,
            type: false,
            style: false
        },

        /* SPECIAL */

        _create: function () {

            this.$badge_wrp = this.$element.find ( '.badge_wrp' ),
            this.$badge = this.$badge_wrp.find ( '.badge' ),

            this.options.title = this.options.title || $ele.data ( 'badge' ),
            this.options.type = this.options.type || $ele.data ( 'badge-type' ) || 'floating',
            this.options.style = this.options.style || $ele.data ( 'badge-style' ) || ''; // all_colors, squared

            if ( !this.options.title || this.options.title === 0 || this.options.title === '0' ) this.options.title = '';

            if ( !this.options.type && this.options.type !== 'inline' && this.options.type !== 'floating' ) this.options.type = 'inline';

            if ( this.$badge.length === 0 ) {

                this.$element.append ( '<div class="badge_wrp ' + this.options.type + '"><div class="badge_subwrp"><div class="badge ' + this.options.style + '"></div></div></div>' );

                this.options.$badge_wrp = this.$element.find ( '.badge_wrp' );
                this.options.$badge = this.$badge_wrp.find ( '.badge' );

            }

            if ( !this.$badge_wrp.hasClass ( this.options.type ) ) {

                this.$badge_wrp.toggleClass ( 'inline floating' );

            }

            if ( this.options.style ) {

                this.$badge.addClass ( this.options.style );

            }

            if ( this.options.title ) {

                this.$badge.html ( this.options.title );

            }

            var opening = ( this.options.title !== '' );

            if ( opening ) {

                this.$badge_wrp.removeClass ( 'hidden' );

                this.$badge_wrp.defer ( function () {

                    this.addClass ( 'active' );

                });

            } else {

                this.$badge_wrp.removeClass ( 'active' );

                this.$badge_wrp.defer ( function () {

                    this.addClass ( 'hidden' );

                }, 150 );

            }

        },

        _init: function ( title ) { //FIXME

            if ( typeof title === 'string' ) {

                this.options.title = title;

            }

        }

    });

    /* READY */

    $(function () {

        $('[data-badge]').badge ();

    });

}( lQuery, window, document ));
