
/* NOTY */

;(function ( $, window, document, undefined ) {

    // VARIABLES

    var $queue,
        timers = [];

    // INIT

    $(function () {

        $body.append ( '<div id="noty_queue"></div>' );

        $queue = $('#noty_queue');

    });

    // FUNCTIONS

    var get_html = function ( options ) {

        return '<div id="noty_wrp_' + options.id + '" class="noty_wrp hidden"><div id="noty_' + options.id + '" class="noty ' + options.type + ' ' + ( options.ttl === 'forever' ? 'forever' : '' ) + ' ' + options.color + ' transparentize">' + get_img_html ( options.img ) + '<div class="noty_content">' + get_title_html ( options.title ) + get_body_html ( options.body ) + get_buttons_html ( options.buttons ) + '</div></div>';

    };

    var get_img_html = function ( img ) {

        return img ? '<div class="noty_img"><img src="' + img + '" class="smooth" /></div>' : '';

    };

    var get_title_html = function ( title ) {

        return title ? '<div class="noty_title">' + title + '</div>' : '';

    };

    var get_body_html = function ( body ) {

        return body ? '<div class="noty_body">' + body + '</div>' : '';

    };

    var get_buttons_html = function ( buttons ) {

        if ( !buttons ) return '';

        var buttons_html = '';

        _.each ( buttons, function ( button ) {

            buttons_html += get_button_html ( button );

        });

        return '<div class="noty_buttons multiple">' + buttons_html + '</div>';

    };

    var get_button_html = function ( button ) {

        return button ? '<div class="button actionable ' + ( button.color || 'white' ) + ' ' + ( button.size || 'tiny' ) + ' ' + '">' + ( button.text || '' ) + '</div>' : '';

    };

    var remove = function ( del_id ) {

        var $noty_wrp = $('#noty_wrp_' + del_id);

        $noty_wrp.removeClass ( 'active' );

        $.defer ( function () {

            $noty_wrp.remove ();

        }, 200 );

    };

    // PLUGIN

    $.noty = function ( custom_options ) {

        // OPTIONS

        var options = {
            id: _.uniqueId (),

            title: false,
            body: false,
            img: false,
            buttons: false,
            /*
                   : [{
                color: 'white',
                size: 'tiny',
                text: '',
                onClick: $.noop
            }],
            */

            type: 'alert',
            color: 'black',

            ttl: 3500,

            onOpen: $.noop,
            onClose: $.noop
        };

        // EXTEND

        if ( _.isString ( custom_options ) ) {

            options.body = custom_options;

        } else if ( _.isDictionary ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        if ( options.buttons ) options.type = 'action';

        // WRITE

        $queue.prepend ( get_html ( options ) );

        // VARIABLES

        var $new_noty_wrp = $('#noty_wrp_' + options.id),
            $new_noty = $('#noty_' + options.id),
            noty_timer;

        // BUTTONS

        if ( options.buttons ) {

            var $buttons = $new_noty.find ( '.button' );

            _.each ( options.buttons, function ( button, index ) {

                var $button = $buttons.eq ( index );

                $button.on ( 'click', function ( event ) {

                    if ( button.onClick ) button.onClick.call ( this, event );

                    if ( noty_timer ) {

                        _.pull ( timers, noty_timer );

                        noty_timer.stop ();

                    }

                    remove ( options.id );

                    options.onClose.call ( $new_noty_wrp.get ( 0 ) );

                });

            });

        }

        // TIMER

        if ( !options.buttons && options.ttl !== 'forever' ) {

            // FUNCTIONS

            var close = function () {

                console.log("close timer called");

                _.pull ( timers, noty_timer );

                noty_timer.stop ();

                remove ( options.id );

                options.onClose.call ( $new_noty_wrp.get ( 0 ) );

            };

            // START

            noty_timer = $.timer ( close, options.ttl, true );

            timers.push ( noty_timer );

            // CLOSE ON CLICK

            $new_noty.on ( 'click', close );

        }

        // PAUSE TIMERS ON HOVER

        $new_noty.hover ( function () {

            _.each ( timers, function ( timer ) {

                timer.pause ();

            });

        }, function () {

            _.each ( timers, function ( timer ) {

                timer.remaining ( Math.max ( 1000, timer.remaining () || 0 ) );

                timer.play ();

            });

        });

        // SHOW

        $new_noty_wrp.removeClass ( 'hidden' );

        $.defer ( function () {

            $new_noty_wrp.addClass ( 'active' );

        });

        options.onOpen.call ( $new_noty_wrp.get ( 0 ) );

    }

}( lQuery, window, document ));
