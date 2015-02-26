
/* NOTY */

//TODO: pause all noty timers when overing one of them

var $noty_queue = false;

var noty_init = function () {

    $noty_queue = $('#noty_queue');

    if ( $noty_queue.size () === 0 ) {

        $body.append ( '<div id="noty_queue"></div>' );

        $noty_queue = $('#noty_queue');

    }

};

var noty = function ( msg, type, style, buttons, custom_content, ttl ) {

    noty_add ( $.get_uuid (), msg, type, style, buttons, custom_content, ttl );

};

var noty_add = function ( id, msg, type, style, buttons, custom_content, ttl ) {

    $noty_queue.prepend ( noty_get_html ( id, msg, type, style, buttons, custom_content ) );

    var $new_noty_wrp = $('#noty_wrp_' + id),
        $new_noty = $('#noty_' + id);

    // add buttons

    if ( buttons ) {

        $new_noty.append ( '<div class="multiple"></div>');

        var $buttons = $new_noty.find ( '.multiple' ).last ();

        _.forEach ( buttons, function ( button ) {

            $buttons.append ( noty_get_button_html ( button ) );

            var $button = $buttons.find ( '.button' ).last ();

            $button.on ( 'click', function ( event ) {

                if ( button.callback ) button.callback ( event );

                noty_delete ( id );

            });

        });

    }

    if ( !buttons && ttl !== 'forever' ) {

        // ttl timer

        var clear_timer = timer ( function () {

            noty_delete ( id );
            clear_timer.stop ();

        }, ttl || 3500 );

        clear_timer.play ();

        // pause timer on hover

        $new_noty.on ( 'mouseenter', function () {

            clear_timer.pause ();

        }).on ( 'mouseleave', function () {

            clear_timer.play ();

        });

        // close on click

        $new_noty.on ( 'click', function () {

            noty_delete ( id );
            clear_timer.stop ();

        });

    }

    // classes

    $new_noty_wrp.removeClass ( 'hidden' );

    $.defer ( function () {

        $new_noty_wrp.addClass ( 'active' );

    });

};

var noty_get_html = function ( id, msg, type, style, buttons, custom_content ) {

    type = ( type === 'alert' || type === 'success' || type === 'error' || type === 'action' ) ? type : 'alert';

    style = style || 'black transparentize';

    custom_content = custom_content ? '<div class="custom_content">' + custom_content + '</div>' : '';

    return '<div id="noty_wrp_' + id + '" class="noty_wrp hidden"><div id="noty_' + id + '" class="noty ' + type + ' ' + ( buttons ? 'has_buttons' : 'no_buttons' ) + ' ' + style + '"><div class="msg">' + msg + '</div>' + custom_content + '</div></div>';

};

var noty_get_button_html = function ( button ) {

    return '<div class="button actionable white tiny ' + ( button.classes || '' ) + '">' + button.title + '</div>';

};

var noty_delete = function ( del_id ) {

    var $noty_wrp = $('#noty_wrp_' + del_id);

    $noty_wrp.removeClass ( 'active' );

    $.defer ( function () {

        $noty_wrp.remove ();

    }, 200 );

};

/* READY */

$.dom_ready ( function () {

    noty_init ();

});
