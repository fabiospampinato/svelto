
/* LOADING */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* LOADING */

    $.fn.loading = function ( force, custom_options ) {

        // OPTIONS

        var options = {
            color: {
                wrapper: 'inherit',
                spinner: 'secondary'
            }
        };

        $.extend ( options, custom_options );

        // LOADING

        this.addClass ( 'spinner-overlay-activable' );

        if ( _.isUndefined ( force ) ) {

            force = !this.hasClass ( 'spinner-overlay-active' );

        }

        var $overlay = this.children ( '.spinner-overlay' );

        if ( $overlay.length === 0 ) {

            this.prepend (
                '<div class="spinner-overlay ' + options.color.wrapper + '">' +
                    '<div class="spinner-wrp">' +
                        '<div class="spinner ' + options.color.spinner + '">' +
                            '<div class="circle-wrp left">' +
                                '<div class="circle"></div>' +
                            '</div>' +
                            '<div class="circle-wrp right">' +
                                '<div class="circle"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );

        } else {

            if ( force ) {

                $overlay.attr ( 'class', 'spinner-overlay ' + options.color.wrapper );
                $overlay.find ( '.spinner' ).attr ( 'class', 'spinner ' + options.color.spinner );

            }

        }

        $.reflow (); //FIXME: is it needed?

        this.toggleClass ( 'spinner-overlay-active', force );

        return this;

    };

}( jQuery, _, window, document ));
