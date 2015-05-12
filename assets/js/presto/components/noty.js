
/* NOTY */

;(function ( $, window, document, undefined ) {

    'use strict';

    // VARIABLES

    var timers = [];

    // INIT

    $(function () {

        $body.append ( '<div class="noty_queue top-left"></div><div class="noty_queue top-right"></div><div class="noty_queue bottom-left"></div><div class="noty_queue bottom-right"></div>' );

    });

    // FUNCTIONS

    var get_html = function ( options ) {

        return '<div id="noty_wrp_' + options.id + '" class="noty_wrp hidden"><div id="noty_' + options.id + '" class="noty container ' + options.type + ' ' + options.color + ' transparentize"><div class="header-wrp transparent">' + get_img_html ( options.img ) + '<div class="header-center">' + get_title_html ( options.title ) + get_body_html ( options.body ) + '</div>' + get_single_button_html ( options.buttons ) + '</div>' + get_buttons_html ( options.buttons ) + '</div></div>';

    };

    var get_img_html = function ( img ) {

        return img ? '<div class="noty_img header-left"><img src="' + img + '" class="smooth" /></div>' : '';

    };

    var get_title_html = function ( title ) {

        return title ? '<p class="header-title large">' + title + '</p>' : '';

    };

    var get_body_html = function ( body ) {

        return body || '';

    };

    var get_buttons_html = function ( buttons ) {

        if ( buttons.length > 1 ) {

            var buttons_html = '';

            _.each ( buttons, function ( button ) {

                buttons_html += get_button_html ( button );

            });

            return '<div class="noty_buttons multiple centered">' + buttons_html + '</div>';

        }

        return '';

    };

    var get_single_button_html = function ( buttons ) {

        if ( buttons.length === 1 ) {

            return '<div class="header-right">' + get_button_html ( buttons[0] ) + '</div>';

        }

        return '';

    };

    var get_button_html = function ( button ) {

        return button ? '<div class="button actionable ' + ( button.color || 'white' ) + ' ' + ( button.size || 'tiny' ) + ' ' + '">' + ( button.text || '' ) + '</div>' : '';

    };

    var remove = function ( del_id ) {

        var $noty_wrp = $('#noty_wrp_' + del_id);

        $noty_wrp.removeClass ( 'active' );

        setTimeout ( function () {

            //TODO: do we need a $.reflow () here? If not, why?

            $noty_wrp.remove ();

        }, 200 );

    };

    // PLUGIN

    $.noty = function ( custom_options ) {

        // OPTIONS

        var options = {
            id: _.uniqueId (),

            anchor: 'bottom-left',

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

        } else if ( _.isPlainObject ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        if ( options.buttons ) options.type = 'action';

        // WRITE

        $('.noty_queue.' + options.anchor).append ( get_html ( options ) );

        // VARIABLES

        var $new_noty_wrp = $('#noty_wrp_' + options.id),
            $new_noty = $('#noty_' + options.id),
            noty_timer = false;

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

        // CLOSE FUNCTION

        var close = function () {

            if ( noty_timer ) {

                _.pull ( timers, noty_timer );

                noty_timer.stop ();

            }

            remove ( options.id );

            options.onClose.call ( $new_noty_wrp.get ( 0 ) );

        };

        // TIMER

        if ( !options.buttons && options.ttl !== 'forever' ) {

            noty_timer = $.timer ( close, options.ttl, true );

            timers.push ( noty_timer );

        }

        // CLOSE ON CLICK

        if ( !options.buttons ) {

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

        $.reflow ();

        $new_noty_wrp.addClass ( 'active' );

        options.onOpen.call ( $new_noty_wrp.get ( 0 ) );

    }

}( lQuery, window, document ));
