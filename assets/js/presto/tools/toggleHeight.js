
/* TOGGLE HEIGHT  */

//FIXME: support triggered twice before the first one has ended

;(function ( $, window, document, undefined ) {

    'use strict';

    /* UTILITIES */

    var get_actual_height = function ( $ele ) {

        var old_style = $ele.attr ( 'style' ) || '';

        $ele.css ( 'css-text', old_style + 'display:block;position:absolute;top:-99999px;height:auto;' );

        var actual_height = $ele.height ();

        $ele.css ( 'css-text', old_style );

        return actual_height;

    };

    /* TOGGLE HEIGHT */

    $.fn.toggleHeight = function ( force, duration, easing, complete, delay ) {

        if ( !_.isBoolean ( force ) ) {

            delay = complete;
            complete = easing;
            easing = duration;
            duration = force;
            force = undefined;

        }

        duration = duration || 400;
        easing = easing || 'easeOutQuad';
        complete = $.noop;
        delay = delay || 0;

        if ( _.isUndefined ( force ) ) {

            force = ( this.height () === 0 ? true : false );

        }

        // VERSION WITHOUT WRAPPING
/*
        for ( var i = 0, l = this.length; i < l; i++ ) {

            var ele = this.nodes[i],
                $ele = $(ele);

            if ( force ) {

                var prev_values = $.data ( ele, 'toggleHeight' );

                $ele.animate ( _.extend ( {}, prev_values, { height: get_actual_height ( $ele ) + parseInt ( prev_values['padding-top'] || 0 ) + parseInt ( prev_values['padding-bottom'] || 0 ) + parseInt ( prev_values['border-top-width'] || 0 ) + parseInt ( prev_values['border-bottom-width'] || 0 ) + parseInt ( prev_values['margin-top'] || 0 ) + parseInt ( prev_values['margin-bottom'] || 0 ) } ), duration, easing, function () {
                    $ele.removeClass ( 'overflow-hidden' );
                    complete ();
                }, delay );

            } else {

                $.data ( ele, 'toggleHeight', {
                    'border-top-width': $ele.css ( 'border-top-width' ),
                    'border-bottom-width': $ele.css ( 'border-bottom-width' ),
                    'margin-top': $ele.css ( 'margin-top' ),
                    'margin-bottom': $ele.css ( 'margin-bottom' ),
                    'padding-top': $ele.css ( 'padding-top' ),
                    'padding-bottom': $ele.css ( 'padding-bottom' )
                });

                $ele.addClass ( 'overflow-hidden' ).animate({
                    'border-top-width': 0,
                    'border-bottom-width': 0,
                    'margin-top': 0,
                    'margin-bottom': 0,
                    'padding-top': 0,
                    'padding-bottom': 0,
                    'height': 0
                }, duration, easing, complete, delay );

            }

        }
*/
        // VERSION WITH WRAPPING

        //FIXME: wrapping might be a problem

        var $instance = this,
            $parent = this.wrap ( '<div class="overflow-hidden"></div>' ).parent ();

        if ( force ) {

            $parent.height ( 0 );

            $instance.removeClass ( 'hidden' );

            $parent.animate ({
                height: get_actual_height ( $parent )
            }, duration, easing, function () {
                $instance.unwrap ();
                complete ();
            }, delay );

        } else {

            $parent.animate ({
                height: 0
            }, duration, easing, function () {
                $instance.addClass ( 'hidden' ).unwrap ();
                complete ();
            }, delay );

        }

        return this;

    };

}( lQuery, window, document ));
