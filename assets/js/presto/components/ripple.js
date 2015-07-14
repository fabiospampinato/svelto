
/* RIPPLE */

//TODO: disable multiple ripples, maybe... sure? Check the specs!

;(function ( $, window, document, undefined ) {

    'use strict';

    /* RIPPLE */

    var Ripple = {

        show: function ( event, $element ) {

            var $ripple = $( '<div class="waves-ripple"></div>' ).appendTo ( $element ),
                offset = $element.offset (),
                eventXY = $.eventXY ( event ),
                now = _.now ();

            $ripple.css ({
                top: eventXY.Y - offset.top,
                left: eventXY.X - offset.left,
                transform: 'scale(' + ( offset.width / 100 * 3 ) + ')'
            }).addClass ( 'waves-showing' );

            $element.on ( 'mouseup mouseleave', function () {

                Ripple.hide ( $ripple, now );

            });

        },

        hide: function ( $ripple, before ) {

            var delay = Math.max ( 0, 350 + before - _.now () );

            setTimeout ( function () {

                $ripple.addClass ('waves-hiding');

                setTimeout ( function () {

                    $ripple.remove ();

                }, 750 );

            }, delay );

        }
    };

    /* READY */

    $('.waves-effect').on ( 'mousedown', function ( event ) { //TODO: delagate instead, or new added triggers will not work, also it will be more efficient

        if ( event.button === 2 ) return; //INFO: Disable the right click

        Ripple.show ( event, $(this) );

    });

}( lQuery, window, document ));
