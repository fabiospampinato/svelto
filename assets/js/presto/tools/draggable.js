
/* DRAGGABLE */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* DRAGGABLE */

    $.fn.draggable = function ( custom_options ) {

        /* OPTIONS */

        var options = {
            start: $.noop,
            move: $.noop,
            end: $.noop,
            delegate: undefined,
            context: undefined,
            events: {
                start: 'mousedown touchstart',
                move: 'mousemove touchmove',
                end: 'mouseup touchend'
            }
        };

        options = _.extend ( options, custom_options );

        /* VARIABLES */

        var $trigger,
            XYs,
            dragged;

        /* FUNCTIONS */

        var start = function ( event ) {

            $trigger = $(this);

            XYs = {
                start: {},
                move: {},
                end: {},
                delta: {}
            };

            dragged = false;

            XYs.start = $.eventXY ( event );

            options.start.bind ( options.context || this )( event, this, XYs );

            $document.on ( options.events.move, move );
            $document.on ( options.events.end, end );

        };

        var move = function ( event ) {

            XYs.move = $.eventXY ( event );
            XYs.delta = {
                X: XYs.move.X - XYs.start.X,
                Y: XYs.move.Y - XYs.start.Y
            };

            options.move.bind ( options.context || this )( event, this, XYs );

            if ( dragged === false ) {

                dragged = true;

                $html.addClass ( 'dragging' );
                $trigger.addClass ( 'dragging' );

            }

        };

        var end = function ( event ) {

            XYs.end = $.eventXY ( event );

            options.end.bind ( options.context || this )( event, this, XYs );

            if ( dragged === true ) {

                $html.removeClass ( 'dragging' );
                $trigger.removeClass ( 'dragging' );

            }

            $document.off ( options.events.move, move );
            $document.off ( options.events.end, end );

        };

        /* START DRAGGING */

        this.on ( options.events.start, options.delegate, start );

    };

}( jQuery, _, window, document ));
