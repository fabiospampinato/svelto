
/* RIPPLE */

//TODO: disable multiple ripples, sure? Check the specs!

;(function ( $, window, document, undefined ) {

    'use strict';

    /* RIPPLE */

    $.fn.ripple = function () {












    };

    /* READY */

    $(function () {

        $('.waves-effect').ripple ();

    });

}( lQuery, window, document ));









var Effect = {

    show: function ( event, $element ) {

        $ripple = $( '<div class="waves-ripple waves-rippling"></div>' ).data ( 'date', Date.now () ).appendTo ( $element );

        var offset = $element.offset (),
            eventXY = $.eventXY ( event );

        // var scale     = 'scale(' + ((element.clientWidth / 100) * 3) + ')'; //FIXME

        $ripple.css ({
            top: eventXY.Y - offset.top,
            left: eventXY.X - offset.left
        }).addClass ( 'waves-showing' );

    },

    hide: function ( event ) {

        var $ripples = $(this).find ( '.waves-rippling' );

        for ( var i = 0, l = $ripples.length; i < l; i++ ) {

            removeRipple ( event, $ripples.eq ( i ) );

        }

    }
};

function removeRipple ( event, $ripple ) {

    $ripple.removeClass ( 'waves-rippling' );

    var delay = Math.max ( 0, 350 - ( Date.now () - Number($ripple.data ( 'date' )) ) );

    setTimeout ( function () {

        $ripple.addClass ('waves-hiding');

        setTimeout ( function () {

            $ripple.remove ();

        }, 750 );

    }, delay );
}

function showEffect ( event ) {

    // Disable right click
    if ( event.button === 2 ) {
        return false;
    }

    var $element = $(event.target);

    if ( !$element.is ( '.waves-effect' ) ) {
        $element = $element.parent ( '.waves-effect' );
    }

    element = $element.get ( 0 );




    Effect.show ( event, $element );

    $element.on ( 'mouseup mouseleave', Effect.hide );

}

$(function(){
    $('.waves-effect').on ( 'mousedown', showEffect ); //TODO: delagate instead, or new added triggers will not work, also it will be more efficient
});

