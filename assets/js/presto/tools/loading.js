
/* LOADING */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* LOADING */

    $.fn.loading = function ( force ) {

        this.addClass ( 'spinner-overlay-activable' );

        if ( _.isUndefined ( force ) ) {

            force = !this.hasClass ( 'spinner-overlay-active' );

        }

        var $overlay = this.children ( '.spinner-overlay' );

        if ( $overlay.length === 0 ) {

            this.append (
                '<div class="spinner-overlay">' +
                    '<div class="spinner-wrp">' +
                        '<div class="spinner secondary">' +
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

        }

        $.reflow (); //FIXME: is it needed?

        this.toggleClass ( 'spinner-overlay-active', force );

        return this;

    };

}( lQuery, window, document ));
